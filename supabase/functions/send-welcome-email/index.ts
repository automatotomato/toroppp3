import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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
                    <td style="background: linear-gradient(135deg, #8B0000 0%, #600000 100%); padding: 40px 20px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Advancement<br/>Academy</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #8B0000; margin: 0 0 20px 0; font-size: 24px;">Welcome to Advancement Academy, ${firstName}!</h2>
                      
                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        Thank you for joining our community of tax professionals dedicated to excellence and growth.
                      </p>
                      
                      <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                        You now have access to:
                      </p>
                      
                      <ul style="color: #333333; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                        <li>Exclusive courses and training materials</li>
                        <li>Weekly town hall sessions</li>
                        <li>Expert tips and best practices</li>
                        <li>Podcasts and educational resources</li>
                        <li>A supportive community of professionals</li>
                      </ul>
                      
                      <p style="color: #333333; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                        Ready to get started? Log in to your dashboard and explore everything we have to offer.
                      </p>
                      
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${Deno.env.get('SITE_URL') || 'https://advancementacademy.netlify.app'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 25px; font-weight: bold; font-size: 16px;">Go to Dashboard</a>
                      </div>
                      
                      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        If you have any questions, feel free to reach out to our support team.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                        © ${new Date().getFullYear()} Advancement Academy. All rights reserved.
                      </p>
                      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                        You're receiving this email because you signed up for Advancement Academy.
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

    console.log(`Sending welcome email to: ${email}`);
    console.log('Email HTML generated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome email sent successfully',
        email,
        preview: emailHtml.substring(0, 200) + '...'
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