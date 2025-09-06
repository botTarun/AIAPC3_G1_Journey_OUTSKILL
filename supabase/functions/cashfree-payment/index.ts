import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface PaymentRequest {
  bookingId: string;
  amount: number;
  currency?: string;
  customerDetails: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  returnUrl: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID');
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY');
    const cashfreeApiUrl = Deno.env.get('CASHFREE_API_URL') || 'https://sandbox.cashfree.com/pg';

    if (!cashfreeAppId || !cashfreeSecretKey) {
      throw new Error('Cashfree credentials not configured');
    }

    const paymentData: PaymentRequest = await req.json();

    // Verify booking exists and get details
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', paymentData.bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error('Booking not found');
    }

    // Generate unique order ID
    const orderId = `JV_${booking.booking_reference}_${Date.now()}`;

    // Create Cashfree payment order
    const cashfreePayload = {
      order_id: orderId,
      order_amount: paymentData.amount,
      order_currency: paymentData.currency || 'INR',
      customer_details: {
        customer_id: paymentData.customerDetails.customerId,
        customer_name: paymentData.customerDetails.customerName,
        customer_email: paymentData.customerDetails.customerEmail,
        customer_phone: paymentData.customerDetails.customerPhone,
      },
      order_meta: {
        return_url: paymentData.returnUrl,
        notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/cashfree-webhook`,
      },
      order_note: `Payment for Journey Verse booking ${booking.booking_reference}`,
    };

    // Create authorization header for Cashfree
    const authString = `${cashfreeAppId}:${cashfreeSecretKey}`;
    const authHeader = `Basic ${btoa(authString)}`;

    const cashfreeResponse = await fetch(`${cashfreeApiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
      },
      body: JSON.stringify(cashfreePayload),
    });

    const cashfreeData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      throw new Error(`Cashfree API error: ${cashfreeData.message || 'Unknown error'}`);
    }

    // Store payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        booking_id: paymentData.bookingId,
        payment_gateway: 'cashfree',
        gateway_order_id: orderId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'INR',
        status: 'pending',
        gateway_response: cashfreeData,
      })
      .select()
      .single();

    if (paymentError) {
      throw new Error(`Failed to create payment record: ${paymentError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentId: payment.id,
        orderId: orderId,
        paymentSessionId: cashfreeData.payment_session_id,
        paymentUrl: cashfreeData.payment_links?.web,
        cashfreeResponse: cashfreeData,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Cashfree payment error:', error);
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