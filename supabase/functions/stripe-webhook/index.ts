import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    const body = await req.text();

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    return;
  }

  if (!('customer' in stripeData)) {
    return;
  }

  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
  } else {
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      await syncCustomerFromStripe(customerId);
    } else if (mode === 'payment' && payment_status === 'paid') {
      try {
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
          customer_details,
        } = stripeData as Stripe.Checkout.Session;

        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id,
          payment_intent_id: payment_intent,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed',
        });

        if (orderError) {
          console.error('Error inserting order:', orderError);
          return;
        }
        console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);

        if (customer_details?.email) {
          await supabase
            .from('payments')
            .update({
              payment_status: 'completed',
              paid_at: new Date().toISOString()
            })
            .eq('email', customer_details.email)
            .order('created_at', { ascending: false })
            .limit(1);

          await sendWelcomeEmail(customer_details.email, customer_details.name || undefined);
        }

        await sendAdminNotification(customer_details, amount_total, currency);
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function sendWelcomeEmail(email: string, name?: string) {
  try {
    console.log(`Sending welcome email to: ${email}`);
    const firstName = name?.split(' ')[0] || 'there';
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return;
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Advancement Academy</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #8B0000 0%, #600000 100%); padding: 40px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Advancement<br/>Academy</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #8B0000; margin: 0 0 20px 0; font-size: 24px;">Welcome to Advancement Academy, ${firstName}!</h2>
                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        Thank you for joining our community! Your payment has been successfully processed.
                      </p>
                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        You now have access to:
                      </p>
                      <ul style="color: #333333; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                        <li>All 12 workshop courses (24 hours of training)</li>
                        <li>12 Town Hall sessions</li>
                        <li>Complete video recordings library</li>
                        <li>Full podcast library (English & Spanish)</li>
                        <li>Weekly tips & best practices</li>
                        <li>Downloadable resources & templates</li>
                      </ul>
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${Deno.env.get('SITE_URL') || 'https://advancementacademy.netlify.app'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 25px; font-weight: bold; font-size: 16px;">Go to Dashboard</a>
                      </div>
                      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        Questions? Contact us at info@3-peak.com
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                        © ${new Date().getFullYear()} Advancement Academy. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Advancement Academy <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to Advancement Academy!',
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send welcome email:', errorText);
    } else {
      console.log('Welcome email sent successfully to:', email);
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

async function sendAdminNotification(customerDetails: any, amount: number | null, currency: string) {
  try {
    console.log('Sending admin notification to info@3-peak.com');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return;
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Payment Received</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Payment Received</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px;">
                      <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 20px;">Payment Details</h2>
                      <table width="100%" cellpadding="12" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px;">
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Customer Name:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${customerDetails?.name || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Email:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${customerDetails?.email || 'N/A'}</td>
                        </tr>
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Amount:</td>
                          <td style="color: #059669; font-size: 16px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">$${amount ? (amount / 100).toFixed(2) : '0.00'} ${currency.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">Date:</td>
                          <td style="color: #111827; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</td>
                        </tr>
                      </table>
                      <p style="color: #666666; font-size: 14px; margin: 20px 0 0 0;">
                        A welcome email has been sent to the customer.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0; font-size: 12px;">
                        Advancement Academy Payment System
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Advancement Academy <onboarding@resend.dev>',
        to: ['info@3-peak.com'],
        subject: 'New Payment Received - Advancement Academy',
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send admin notification:', errorText);
    } else {
      console.log('Admin notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }
    }

    const subscription = subscriptions.data[0];

    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}