import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

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

interface PasswordResetPayload {
  email: string;
  emails?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload: PasswordResetPayload = await req.json();
    const emailsToProcess = payload.emails || (payload.email ? [payload.email] : []);

    if (emailsToProcess.length === 0) {
      return new Response(
        JSON.stringify({ error: "Email or emails array is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = [];

    for (const email of emailsToProcess) {
      try {
        const { data: user, error: userError } = await supabase.auth.admin.listUsers();
        const foundUser = user?.users?.find((u) => u.email === email);

        if (!foundUser) {
          results.push({ email, success: false, message: 'User not found' });
          continue;
        }

        const siteUrl = Deno.env.get('SITE_URL') || 'https://www.3-peakavanza.com';
        const redirectUrl = `${siteUrl}/reset-password`;

        console.log(`Generating password reset link for ${email} with redirect to: ${redirectUrl}`);

        const { data: tokenData, error: tokenError } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: email,
          options: {
            redirectTo: redirectUrl,
          },
        });

        if (tokenData) {
          console.log(`Generated action link: ${tokenData.properties.action_link}`);
        }

        if (tokenError || !tokenData) {
          results.push({ email, success: false, error: tokenError?.message });
          continue;
        }

        const resetUrl = tokenData.properties.action_link;

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Your Password</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 20px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; line-height: 1.3;">Advancement<br/>Academy</h1>
                          <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 14px;">Delivered by Peak Performance Partners</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="color: #dc2626; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">Set Up Your Password</h2>
                          <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0; font-size: 16px;">
                            Welcome to Advancement Academy! Your account has been created and you're ready to begin your journey to excellence.
                          </p>
                          <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                            Click the button below to set your password and access your dashboard:
                          </p>
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Set Your Password</a>
                          </div>
                          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 25px 0; border-radius: 4px;">
                            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
                              <strong>⚠️ Security Note:</strong> This link will expire in 1 hour. After setting your password, you'll have full access to all 12 workshops, town halls, podcasts, and resources.
                            </p>
                          </div>
                          <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                            If the button doesn't work, copy and paste this link into your browser:
                          </p>
                          <p style="color: #0284c7; word-break: break-all; margin: 5px 0 0 0; font-size: 12px;">
                            ${resetUrl}
                          </p>
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
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
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
Set Up Your Password - Advancement Academy

Welcome to Advancement Academy! Your account has been created and you're ready to begin your journey to excellence.

Click this link to set your password and access your dashboard:
${resetUrl}

This link will expire in 1 hour. After setting your password, you'll have full access to all 12 workshops, town halls, podcasts, and resources.

Need Help?
Email: info@3-peakavanza.com
Phone: (915) 490-1889
Website: www.3-peakavanza.com

© ${new Date().getFullYear()} Peak Performance Partners | Advancement Academy
All Rights Reserved
        `.trim();

        console.log(`Sending password setup email to: ${email}`);

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [email],
            subject: 'Set Up Your Password - Advancement Academy',
            html: emailHtml,
            text: emailText,
          }),
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          console.error('Resend API error:', resendData);
          results.push({ email, success: false, error: JSON.stringify(resendData) });
        } else {
          console.log('Password setup email sent successfully via Resend:', resendData);
          results.push({ email, success: true, resendId: resendData.id });
        }
      } catch (error) {
        console.error(`Error processing ${email}:`, error);
        results.push({ email, success: false, error: error.message });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({
        success: failed === 0,
        message: `Processed ${emailsToProcess.length} email(s)`,
        summary: { total: emailsToProcess.length, successful, failed },
        results,
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
    console.error('Error in send-password-reset:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
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
