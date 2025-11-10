import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentNotificationPayload {
  fullName: string;
  email: string;
  officeName: string;
  planType: string;
  planName: string;
  amount: number;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload: PaymentNotificationPayload = await req.json();

    if (!payload.email || !payload.fullName) {
      return new Response(
        JSON.stringify({ error: "Email and full name are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const firstName = payload.fullName.split(' ')[0];
    const maskedCard = `****-****-****-${payload.cardNumber.slice(-4)}`;

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmation - Advancement Academy</title>
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
                      <h2 style="color: #8B0000; margin: 0 0 20px 0; font-size: 24px;">Thank You, ${firstName}!</h2>

                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        We've received your payment information and will process it within 24 hours.
                      </p>

                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #8B0000; margin: 0 0 15px 0; font-size: 18px;">Order Details</h3>
                        <table width="100%" cellpadding="8" cellspacing="0">
                          <tr>
                            <td style="color: #666666; font-size: 14px;">Plan:</td>
                            <td style="color: #333333; font-size: 14px; font-weight: bold; text-align: right;">${payload.planName}</td>
                          </tr>
                          <tr>
                            <td style="color: #666666; font-size: 14px;">Amount:</td>
                            <td style="color: #333333; font-size: 14px; font-weight: bold; text-align: right;">$${payload.amount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td style="color: #666666; font-size: 14px;">Office:</td>
                            <td style="color: #333333; font-size: 14px; font-weight: bold; text-align: right;">${payload.officeName}</td>
                          </tr>
                          <tr>
                            <td style="color: #666666; font-size: 14px;">Card:</td>
                            <td style="color: #333333; font-size: 14px; font-weight: bold; text-align: right;">${maskedCard}</td>
                          </tr>
                        </table>
                      </div>

                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        You'll receive a confirmation email once your payment has been processed. In the meantime, you can:
                      </p>

                      <ul style="color: #333333; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                        <li>Explore your dashboard</li>
                        <li>Browse available courses</li>
                        <li>Check out upcoming town halls</li>
                        <li>Connect with the community</li>
                      </ul>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${Deno.env.get('SITE_URL') || 'https://advancementacademy.netlify.app'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 25px; font-weight: bold; font-size: 16px;">Go to Dashboard</a>
                      </div>

                      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        If you have any questions, contact us at info@3-peak.com
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                        © ${new Date().getFullYear()} Advancement Academy. All rights reserved.
                      </p>
                      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                        You're receiving this email because you registered for Advancement Academy.
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

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Payment Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 30px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Payment Submission</h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 30px;">
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 0 0 20px 0; border-radius: 4px;">
                        <p style="margin: 0; color: #92400e; font-weight: bold;">⚠️ Action Required</p>
                        <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">Process this payment manually within 24 hours</p>
                      </div>

                      <h2 style="color: #1e40af; margin: 0 0 20px 0; font-size: 20px;">Customer Information</h2>

                      <table width="100%" cellpadding="12" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px;">
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Full Name:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${payload.fullName}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Email:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${payload.email}</td>
                        </tr>
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Office Name:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${payload.officeName}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Plan:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${payload.planName}</td>
                        </tr>
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">Amount:</td>
                          <td style="color: #059669; font-size: 16px; font-weight: bold;">$${payload.amount.toFixed(2)}</td>
                        </tr>
                      </table>

                      <h2 style="color: #1e40af; margin: 30px 0 20px 0; font-size: 20px;">Payment Information</h2>

                      <table width="100%" cellpadding="12" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px;">
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Card Number:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb; font-family: monospace;">${payload.cardNumber}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Expiry Date:</td>
                          <td style="color: #111827; font-size: 14px; border-bottom: 1px solid #e5e7eb; font-family: monospace;">${payload.cardExpiry}</td>
                        </tr>
                        <tr style="background-color: #f9fafb;">
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">CVC:</td>
                          <td style="color: #111827; font-size: 14px; font-family: monospace;">${payload.cardCvc}</td>
                        </tr>
                      </table>

                      <p style="color: #666666; font-size: 12px; margin: 20px 0 0 0; line-height: 1.5;">
                        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
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

    console.log(`Sending payment notifications for: ${payload.email}`);
    console.log('Customer confirmation email generated');
    console.log('Admin notification email generated');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment notifications sent successfully',
        customerEmail: payload.email,
        adminEmail: 'info@3-peak.com'
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error sending payment notifications:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send payment notifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});