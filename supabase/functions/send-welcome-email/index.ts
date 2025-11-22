import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not configured');
}
const FROM_EMAIL = 'Advancement Academy <info@3-peakavanza.com>';

interface WelcomeEmailPayload {
  email: string;
  name?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, name }: WelcomeEmailPayload = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const firstName = name?.split(' ')[0] || 'there';
    const dashboardUrl = Deno.env.get('SITE_URL') || 'https://advancementacademy.netlify.app';

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
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; line-height: 1.3;">Advancement<br/>Academy</h1>
                      <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 14px;">Delivered by Peak Performance Partners</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #dc2626; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">Welcome to Advancement Academy, ${firstName}!</h2>

                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        Thank you for joining our community of Toro Tax franchise owners dedicated to excellence and growth.
                      </p>

                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        You now have access to:
                      </p>

                      <ul style="color: #333333; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                        <li><strong>12 Power-Packed Workshops</strong> - Master cash flow, sales systems, marketing, and leadership</li>
                        <li><strong>Town Hall Sessions</strong> - Live Q&A and expert insights</li>
                        <li><strong>Podcast Library</strong> - Available in English and Spanish</li>
                        <li><strong>Weekly Tips</strong> - Best practices and strategies</li>
                        <li><strong>Resources & Tools</strong> - Downloadable templates, charts, and handouts</li>
                        <li><strong>Private Community</strong> - Connect with fellow franchise owners</li>
                      </ul>

                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 25px 0; border-radius: 4px;">
                        <p style="color: #92400e; margin: 0; font-size: 15px; line-height: 1.6;">
                          <strong>🎓 Get Started:</strong> Log in to your dashboard and begin your transformation journey today!
                        </p>
                      </div>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${dashboardUrl}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Access Your Dashboard</a>
                      </div>

                      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px;">Need Help?</h3>
                        <p style="color: #475569; margin: 0 0 8px 0; font-size: 14px;">
                          📧 Email: <a href="mailto:info@3-peakavanza.com" style="color: #dc2626; text-decoration: none;">info@3-peakavanza.com</a>
                        </p>
                        <p style="color: #475569; margin: 0 0 8px 0; font-size: 14px;">
                          📞 Phone: <a href="tel:9154901889" style="color: #dc2626; text-decoration: none;">(915) 490-1889</a>
                        </p>
                        <p style="color: #475569; margin: 0; font-size: 14px;">
                          🌐 Website: <a href="https://www.3-peakavanza.com" style="color: #dc2626; text-decoration: none;">www.3-peakavanza.com</a>
                        </p>
                      </div>

                      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        We're excited to support you on your journey to building a profitable, scalable, and sustainable business!
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <div style="margin-bottom: 15px;">
                        <img src="${dashboardUrl}/peak_performance (1).png" alt="Peak Performance Partners" style="height: 40px; margin: 0 10px;" />
                        <span style="color: #6b7280; font-size: 24px; vertical-align: middle;">×</span>
                        <img src="${dashboardUrl}/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" style="height: 24px; margin: 0 10px;" />
                      </div>
                      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                        © ${new Date().getFullYear()} Peak Performance Partners | Advancement Academy
                      </p>
                      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                        All Rights Reserved
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

    const emailText = `
Welcome to Advancement Academy, ${firstName}!

Thank you for joining our community of Toro Tax franchise owners dedicated to excellence and growth.

You now have access to:
- 12 Power-Packed Workshops - Master cash flow, sales systems, marketing, and leadership
- Town Hall Sessions - Live Q&A and expert insights
- Podcast Library - Available in English and Spanish
- Weekly Tips - Best practices and strategies
- Resources & Tools - Downloadable templates, charts, and handouts
- Private Community - Connect with fellow franchise owners

Get Started: Log in to your dashboard and begin your transformation journey today!
${dashboardUrl}/dashboard

Need Help?
Email: info@3-peakavanza.com
Phone: (915) 490-1889
Website: www.3-peakavanza.com

We're excited to support you on your journey to building a profitable, scalable, and sustainable business!

© ${new Date().getFullYear()} Peak Performance Partners | Advancement Academy
All Rights Reserved
    `.trim();

    console.log(`Sending welcome email to: ${email}`);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Welcome to Advancement Academy! 🎓',
        html: emailHtml,
        text: emailText,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData);
      throw new Error(`Resend API error: ${JSON.stringify(resendData)}`);
    }

    console.log('Welcome email sent successfully via Resend:', resendData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome email sent successfully',
        email,
        resendId: resendData.id,
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
    console.error('Error sending welcome email:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send welcome email',
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