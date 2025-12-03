# Supabase Configuration Instructions

## Update Resend API Key

Your Resend API key needs to be configured in your Supabase project for email functionality to work.

### New Resend API Key
```
re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq
```

## Required Configuration Changes

### 1. Update Site URL in Supabase Auth Settings

**Navigation:**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/dxzvetuowgvdjoukneot
2. Navigate to: Authentication > URL Configuration

**Settings to Update:**
- **Site URL**: `https://www.3-peakavanza.com`
- **Redirect URLs**: Add `https://www.3-peakavanza.com/**`
- **Optional for local dev**: Add `http://localhost:5173/**`

### 2. Configure Edge Function Secrets

**Navigation:**
1. Go to: Project Settings > Edge Functions > Secrets
2. Or directly: https://supabase.com/dashboard/project/dxzvetuowgvdjoukneot/settings/functions

**Required Secrets:**
- `RESEND_API_KEY` = `re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq`

**Alternative: Using Supabase CLI**
```bash
supabase secrets set RESEND_API_KEY=re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq --project-ref dxzvetuowgvdjoukneot
```

Note: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` should already be auto-populated.

### 3. Verify Email Domain in Resend

Make sure your sender domain is verified:
1. Log into https://resend.com/domains
2. Verify that `3-peakavanza.com` is listed and verified
3. If not, add and verify the domain following Resend's instructions

### 4. Verify Configuration

After making these changes:

1. Test the password reset flow:
   - Go to: https://www.3-peakavanza.com/forgot-password
   - Enter a user email
   - Check your inbox for the password reset email
   - Verify the reset link points to `www.3-peakavanza.com`

2. Test welcome emails (if applicable):
   - Create a new user account
   - Check if they receive a welcome email from `info@3-peakavanza.com`

## Current Status

### Password Reset
✅ **WORKING** - Now uses Supabase's native email system
- No longer requires custom edge function
- No longer requires Resend API key
- Automatically sends emails through Supabase

### Welcome Emails
⚠️ **NEEDS RESEND API KEY** - The `send-welcome-email` edge function requires the Resend API key to be configured

## Edge Functions Using Resend

- `send-welcome-email` - **Active**, needs `RESEND_API_KEY`
- `send-password-reset` - **Not used** (switched to native Supabase auth)

## Sender Email Configuration

The edge functions send emails from:
```
Advancement Academy <info@3-peakavanza.com>
```

This email must be verified in your Resend account for emails to send successfully.
