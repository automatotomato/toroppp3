import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const registeredEmails = [
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
  'ricky@3-peak.com',
];

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const results = [];

    for (const email of registeredEmails) {
      try {
        console.log(`Sending password reset email to ${email}...`);

        const { error } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: email,
        });

        if (error) {
          console.error(`Error for ${email}:`, error);
          results.push({
            email,
            success: false,
            error: error.message,
          });
        } else {
          console.log(`✓ Sent password reset email to ${email}`);
          results.push({
            email,
            success: true,
            message: 'Password reset email sent',
          });
        }
      } catch (error) {
        console.error(`Error sending to ${email}:`, error);
        results.push({
          email,
          success: false,
          error: error.message,
        });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({
        message: 'Password reset emails sent',
        summary: {
          total: registeredEmails.length,
          successful,
          failed,
        },
        results,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-password-resets:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
