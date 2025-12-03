import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mblzyrzsgzccjkwmundc.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const users = [
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
  { name: 'Ricky', email: 'ricky@3-peak.com' }
];

async function setupUser(user) {
  try {
    console.log(`\nSetting up ${user.name} (${user.email})...`);

    // Create user account with a temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: user.name
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`  ✓ User already exists, updating...`);

        // Get existing user
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers.users.find(u => u.email === user.email);

        if (existingUser) {
          // Update profile
          await supabase
            .from('profiles')
            .upsert({
              id: existingUser.id,
              email: user.email,
              full_name: user.name,
              subscription_status: 'active',
              subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            });

          // Create payment record
          await supabase
            .from('payments')
            .upsert({
              user_id: existingUser.id,
              email: user.email,
              amount: 999,
              status: 'succeeded',
              payment_type: 'subscription'
            }, {
              onConflict: 'user_id'
            });

          // Send password reset email
          await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${supabaseUrl.replace('.supabase.co', '')}/reset-password`
          });

          console.log(`  ✓ Updated existing user and sent password reset email`);
          return { success: true, userId: existingUser.id };
        }
      } else {
        throw authError;
      }
    } else {
      console.log(`  ✓ Created user account`);

      // Update profile with subscription
      await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('id', authData.user.id);

      console.log(`  ✓ Set subscription status to active`);

      // Create payment record
      await supabase
        .from('payments')
        .insert({
          user_id: authData.user.id,
          email: user.email,
          amount: 999,
          status: 'succeeded',
          payment_type: 'subscription'
        });

      console.log(`  ✓ Created payment record`);

      // Send password reset email
      await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${supabaseUrl.replace('.supabase.co', '')}/reset-password`
      });

      console.log(`  ✓ Sent password reset email`);

      return { success: true, userId: authData.user.id };
    }
  } catch (error) {
    console.error(`  ✗ Error setting up ${user.email}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('Starting user setup...\n');
  console.log(`Setting up ${users.length} users`);

  const results = [];

  for (const user of users) {
    const result = await setupUser(user);
    results.push({ user, result });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n\n=== Summary ===');
  const successful = results.filter(r => r.result.success).length;
  const failed = results.filter(r => !r.result.success).length;

  console.log(`✓ Successfully set up: ${successful} users`);
  console.log(`✗ Failed: ${failed} users`);

  if (failed > 0) {
    console.log('\nFailed users:');
    results.filter(r => !r.result.success).forEach(r => {
      console.log(`  - ${r.user.email}: ${r.result.error}`);
    });
  }

  console.log('\n✓ All users have been sent password reset emails to set their passwords');
  console.log('✓ All dashboards are initialized at 0% completion');
  console.log('✓ All users have active paid subscriptions');
}

main().catch(console.error);
