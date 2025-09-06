import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const webhookData = await req.json();
    console.log('Cashfree webhook received:', webhookData);

    const { order_id, payment_status, cf_payment_id, order_amount } = webhookData.data || webhookData;

    if (!order_id) {
      throw new Error('Order ID not found in webhook data');
    }

    // Find the payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*, bookings(*)')
      .eq('gateway_order_id', order_id)
      .single();

    if (paymentError || !payment) {
      throw new Error(`Payment not found for order ID: ${order_id}`);
    }

    // Update payment status
    let newStatus = 'pending';
    let bookingStatus = 'pending';

    switch (payment_status) {
      case 'SUCCESS':
        newStatus = 'success';
        bookingStatus = 'confirmed';
        break;
      case 'FAILED':
      case 'CANCELLED':
        newStatus = 'failed';
        bookingStatus = 'cancelled';
        break;
      case 'PENDING':
        newStatus = 'pending';
        bookingStatus = 'pending';
        break;
      default:
        newStatus = 'pending';
    }

    // Update payment record
    const { error: updatePaymentError } = await supabase
      .from('payments')
      .update({
        status: newStatus,
        gateway_payment_id: cf_payment_id,
        gateway_response: webhookData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    if (updatePaymentError) {
      throw new Error(`Failed to update payment: ${updatePaymentError.message}`);
    }

    // Update booking status
    const { error: updateBookingError } = await supabase
      .from('bookings')
      .update({
        status: bookingStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payment.booking_id);

    if (updateBookingError) {
      throw new Error(`Failed to update booking: ${updateBookingError.message}`);
    }

    // Send confirmation email if payment successful
    if (newStatus === 'success') {
      // TODO: Implement email notification
      console.log(`Payment successful for booking ${payment.bookings.booking_reference}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
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