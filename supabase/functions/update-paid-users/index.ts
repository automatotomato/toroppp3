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
        const { data: profile, error: profileLookupError } = await supabase
          .from('profiles')
          .select('id, email')
          .eq('email', userData.email)
          .maybeSingle();

        if (profileLookupError) {
          errors.push({
            email: userData.email,
            error: `Profile lookup failed: ${profileLookupError.message}`,
          });
          continue;
        }

        if (!profile) {
          errors.push({
            email: userData.email,
            error: 'Profile not found. User may not have been created.',
          });
          continue;
        }

        const userId = profile.id;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            full_name: userData.fullName,
            office_name: userData.officeName || '',
            role: 'owner',
            subscription_status: 'active',
            subscription_expires_at: expiresAt.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (profileUpdateError) {
          errors.push({
            email: userData.email,
            error: `Profile update failed: ${profileUpdateError.message}`,
          });
          continue;
        }

        const { data: existingPayment } = await supabase
          .from('payments')
          .select('id')
          .eq('user_id', userId)
          .maybeSingle();

        if (existingPayment) {
          const { error: paymentUpdateError } = await supabase
            .from('payments')
            .update({
              plan_type: userData.planType,
              full_name: userData.fullName,
              office_name: userData.officeName || '',
              amount_paid: userData.amountPaid,
              payment_status: 'completed',
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingPayment.id);

          if (paymentUpdateError) {
            errors.push({
              email: userData.email,
              error: `Payment update failed: ${paymentUpdateError.message}`,
            });
            continue;
          }
        } else {
          const { error: paymentInsertError } = await supabase
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

          if (paymentInsertError) {
            errors.push({
              email: userData.email,
              error: `Payment creation failed: ${paymentInsertError.message}`,
            });
            continue;
          }
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
          status: 'success',
          subscriptionExpires: expiresAt.toISOString(),
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
        message: 'Batch user update completed',
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
