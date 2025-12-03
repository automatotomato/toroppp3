import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface User {
  name: string;
  email: string;
}

const registeredUsers: User[] = [
  { name: 'Alberto Velez', email: 'torotaxesrgv@gmail.com' },
  { name: 'Ana V Naranjo', email: 'avela@anavipagos.com' },
  { name: 'Andrea Ruiz', email: 'foecita63@hotmail.com' },
  { name: 'Miriam Abad', email: 'miriam@torotaxes.com' },
  { name: 'Vanessa Marquez', email: 'vrsas24@gmail.com' },
  { name: 'Lolimar Kawa', email: 'lolivene@gmail.com' },
  { name: 'Laura Quiroz', email: 'quirozlegalservices@gmail.com' },
  { name: 'Maritssa Ibarra', email: 'yezzibarraortega@gmail.com' },
  { name: 'Alexi Vasquez', email: 'alexiv0278@gmail.com' },
  { name: 'Alex Perez', email: 'alex@automateplanet.com' },
  { name: 'Ricky', email: 'ricky@3-peak.com' },
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

    for (const user of registeredUsers) {
      try {
        console.log(`Setting up ${user.name} (${user.email})...`);

        const tempPassword = crypto.randomUUID() + 'Aa1!';

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: user.name,
          },
        });

        if (authError) {
          if (authError.message.includes('already registered')) {
            const { data: existingUsers } = await supabase.auth.admin.listUsers();
            const existingUser = existingUsers.users.find((u) => u.email === user.email);

            if (existingUser) {
              await supabase
                .from('profiles')
                .upsert({
                  id: existingUser.id,
                  email: user.email,
                  full_name: user.name,
                  subscription_status: 'active',
                  subscription_expires_at: new Date(
                    Date.now() + 365 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                });

              await supabase
                .from('payments')
                .upsert(
                  {
                    user_id: existingUser.id,
                    email: user.email,
                    amount: 999,
                    status: 'succeeded',
                    payment_type: 'subscription',
                  },
                  {
                    onConflict: 'user_id',
                  }
                );

              await supabase.auth.admin.inviteUserByEmail(user.email);

              results.push({
                email: user.email,
                success: true,
                message: 'Updated existing user',
              });
            }
          } else {
            throw authError;
          }
        } else {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'active',
              subscription_expires_at: new Date(
                Date.now() + 365 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq('id', authData.user.id);

          await supabase.from('payments').insert({
            user_id: authData.user.id,
            email: user.email,
            amount: 999,
            status: 'succeeded',
            payment_type: 'subscription',
          });

          await supabase.auth.admin.inviteUserByEmail(user.email);

          results.push({
            email: user.email,
            success: true,
            message: 'Created new user',
          });
        }
      } catch (error) {
        console.error(`Error setting up ${user.email}:`, error);
        results.push({
          email: user.email,
          success: false,
          error: error.message,
        });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({
        message: 'User setup complete',
        summary: {
          total: registeredUsers.length,
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
    console.error('Error in setup-academy-users:', error);
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
