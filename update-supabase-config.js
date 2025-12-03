/**
 * Script to update Supabase auth configuration
 * This updates the Site URL and Redirect URLs for password reset functionality
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1]] = match[2];
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;

if (!supabaseUrl) {
  console.error('❌ Missing VITE_SUPABASE_URL in .env file');
  process.exit(1);
}

const PROJECT_REF = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
console.log('🔧 Updating Supabase project configuration...');
console.log('   Project:', PROJECT_REF);
console.log('   URL:', supabaseUrl);

const siteUrl = 'https://www.3-peakavanza.com';
const redirectUrls = [
  'https://www.3-peakavanza.com/**',
  'http://localhost:5173/**', // For local development
];

console.log('\n📝 Configuration to apply:');
console.log('   Site URL:', siteUrl);
console.log('   Redirect URLs:', redirectUrls.join(', '));

// Note: The Supabase Management API requires a personal access token from your Supabase account
// This token is different from the service role key and must be created in your Supabase dashboard
// Go to: https://supabase.com/dashboard/account/tokens

console.log('\n⚠️  IMPORTANT: Automatic configuration update requires Supabase Management API access');
console.log('   This requires a personal access token from your Supabase account\n');
console.log('📋 Manual steps to complete the configuration:\n');
console.log('   1. Go to: https://supabase.com/dashboard/project/' + PROJECT_REF);
console.log('   2. Navigate to: Authentication → URL Configuration');
console.log('   3. Set Site URL to: ' + siteUrl);
console.log('   4. Add these Redirect URLs:');
redirectUrls.forEach(url => console.log('      - ' + url));
console.log('\n   5. Click "Save" to apply the changes\n');
console.log('✅ Once completed, your password reset emails will redirect to the correct domain!');
