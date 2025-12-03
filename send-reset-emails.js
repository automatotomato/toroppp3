import { createClient } from '@supabase/supabase-js';

const RESEND_API_KEY = 're_Y5DtsUdn_5Hvv5LyiRjXsPw1Qr3cyesiA';
const FROM_EMAIL = 'Advancement Academy <info@3-peakavanza.com>';
const SITE_URL = 'https://www.3-peakavanza.com';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const emails = [
  'torotaxesrgv@gmail.com',
  'avela@anavipagos.com',
  'foecita63@hotmail.com',
  'miriam@torotaxes.com',
  'vrsas24@gmail.com',
  'lolivene@gmail.com',
  'quirozlegalservices@gmail.com',
  'yezzibarraortega@gmail.com',
  'alexiv0278@gmail.com',
  'alex@automateplanet.com',
  'ricky@3-peak.com'
];

async function sendPasswordResetEmail(email) {
  try {
    const { data: tokenData, error: tokenError } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${SITE_URL}/reset-password`,
      },
    });

    if (tokenError || !tokenData) {
      console.error(`Failed to generate reset link for ${email}:`, tokenError?.message);
      return { email, success: false, error: tokenError?.message };
    }

    const resetUrl = tokenData.properties.action_link;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Set Up Your Password</title>
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
                          <strong>⚠️ Important:</strong> This link will expire in 1 hour. After setting your password, you'll have full access to all 12 workshops, town halls, podcasts, and resources.
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

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Set Up Your Password - Advancement Academy 🎓',
        html: emailHtml,
        text: emailText,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error(`Resend API error for ${email}:`, resendData);
      return { email, success: false, error: JSON.stringify(resendData) };
    }

    console.log(`✓ Password setup email sent to ${email} (Resend ID: ${resendData.id})`);
    return { email, success: true, resendId: resendData.id };

  } catch (error) {
    console.error(`Error processing ${email}:`, error.message);
    return { email, success: false, error: error.message };
  }
}

async function main() {
  console.log('Starting to send password setup emails via Resend...\n');

  const results = [];
  for (const email of emails) {
    const result = await sendPasswordResetEmail(email);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY: ${successful} successful, ${failed} failed out of ${emails.length} total`);
  console.log(`${'='.repeat(60)}`);

  if (failed > 0) {
    console.log('\nFailed emails:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.email}: ${r.error}`);
    });
  }
}

main().catch(console.error);
