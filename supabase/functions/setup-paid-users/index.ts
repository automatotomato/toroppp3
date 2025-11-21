import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface UserData {
  email: string;
  fullName: string;
  officeName?: string;
  planType: string;
  amountPaid: number;
}

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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { users } = await req.json() as { users: UserData[] };

    if (!users || !Array.isArray(users)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request. Expected array of users.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const results = [];
    const errors = [];

    for (const userData of users) {
      try {
        const tempPassword = `Temp${Math.random().toString(36).slice(2, 10)}!1`;

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: userData.fullName,
            office_name: userData.officeName || '',
          },
        });

        if (authError) {
          errors.push({
            email: userData.email,
            error: authError.message,
          });
          continue;
        }

        const userId = authData.user.id;

        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: userData.email,
            full_name: userData.fullName,
            office_name: userData.officeName || '',
            role: 'owner',
            subscription_status: 'active',
            subscription_expires_at: expiresAt.toISOString(),
          });

        if (profileError) {
          errors.push({
            email: userData.email,
            error: `Profile creation failed: ${profileError.message}`,
          });
          continue;
        }

        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            user_id: userId,
            email: userData.email,
            plan_type: userData.planType,
            full_name: userData.fullName,
            office_name: userData.officeName || '',
            amount_paid: userData.amountPaid,
            payment_status: 'completed',
            paid_at: new Date().toISOString(),
          });

        if (paymentError) {
          errors.push({
            email: userData.email,
            error: `Payment record failed: ${paymentError.message}`,
          });
          continue;
        }

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          userData.email,
          {
            redirectTo: `${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', '3-peakavanza.com')}/reset-password`,
          }
        );

        results.push({
          email: userData.email,
          userId: userId,
          tempPassword: tempPassword,
          status: 'success',
          passwordResetSent: !resetError,
          resetError: resetError?.message,
        });
      } catch (err) {
        errors.push({
          email: userData.email,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Batch user setup completed',
        successful: results.length,
        failed: errors.length,
        results,
        errors,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
