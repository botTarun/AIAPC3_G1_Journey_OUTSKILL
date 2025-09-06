import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface BookingRequest {
  items: Array<{
    type: string;
    name: string;
    description?: string;
    provider: string;
    externalId?: string;
    quantity: number;
    unitPrice: number;
    itemData?: any;
  }>;
  travelers: Array<{
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    passportNumber?: string;
    nationality?: string;
    travelerType: 'adult' | 'child' | 'infant';
  }>;
  contactEmail: string;
  contactPhone?: string;
  travelDate?: string;
  specialRequests?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    const bookingData: BookingRequest = await req.json();

    // Calculate total amount
    const totalAmount = bookingData.items.reduce((sum, item) => 
      sum + (item.unitPrice * item.quantity), 0
    );

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        contact_email: bookingData.contactEmail,
        contact_phone: bookingData.contactPhone,
        travel_date: bookingData.travelDate,
        special_requests: bookingData.specialRequests,
      })
      .select()
      .single();

    if (bookingError) {
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    // Create booking items
    const bookingItems = bookingData.items.map(item => ({
      booking_id: booking.id,
      item_type: item.type,
      item_name: item.name,
      item_description: item.description,
      provider: item.provider,
      external_id: item.externalId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
      item_data: item.itemData,
    }));

    const { error: itemsError } = await supabase
      .from('booking_items')
      .insert(bookingItems);

    if (itemsError) {
      throw new Error(`Failed to create booking items: ${itemsError.message}`);
    }

    // Create travelers
    const travelers = bookingData.travelers.map(traveler => ({
      booking_id: booking.id,
      first_name: traveler.firstName,
      last_name: traveler.lastName,
      email: traveler.email,
      phone: traveler.phone,
      date_of_birth: traveler.dateOfBirth,
      passport_number: traveler.passportNumber,
      nationality: traveler.nationality,
      traveler_type: traveler.travelerType,
    }));

    const { error: travelersError } = await supabase
      .from('booking_travelers')
      .insert(travelers);

    if (travelersError) {
      throw new Error(`Failed to create travelers: ${travelersError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking: {
          id: booking.id,
          reference: booking.booking_reference,
          totalAmount: booking.total_amount,
          status: booking.status,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Create booking error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});