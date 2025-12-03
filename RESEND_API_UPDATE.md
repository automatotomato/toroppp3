# Resend API Key Update Instructions

## New API Key
```
re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq
```

## Quick Setup Steps

### Option 1: Supabase Dashboard (Recommended)

1. **Go to your Supabase project:**
   https://supabase.com/dashboard/project/dxzvetuowgvdjoukneot

2. **Navigate to Edge Functions Secrets:**
   - Click **Settings** in the sidebar
   - Click **Edge Functions** 
   - Click **Manage secrets**
   - Or go directly to: https://supabase.com/dashboard/project/dxzvetuowgvdjoukneot/settings/functions

3. **Add/Update the secret:**
   - If `RESEND_API_KEY` exists, click **Edit**
   - If it doesn't exist, click **Add new secret**
   - Name: `RESEND_API_KEY`
   - Value: `re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq`
   - Click **Save**

### Option 2: Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase secrets set RESEND_API_KEY=re_7pJ3WCnA_5HWYF4PEASkny6M7rdcML5hq --project-ref dxzvetuowgvdjoukneot
```

## What This Fixes

The Resend API key is used by the `send-welcome-email` edge function to send welcome emails to new users.

### Email Configuration
- **Sender:** Advancement Academy <info@3-peakavanza.com>
- **Purpose:** Welcome emails when new users sign up

### Important Notes

1. **Domain Verification Required**
   - Log into https://resend.com with the account that owns this API key
   - Verify that `3-peakavanza.com` is added and verified
   - Without domain verification, emails will fail to send

2. **Password Reset Emails**
   - Password reset emails now use Supabase's native email system
   - They do NOT require the Resend API key
   - They work automatically through Supabase

## Testing

After updating the API key:

1. **Test Welcome Emails:**
   - Create a new test user account
   - Check if they receive a welcome email from `info@3-peakavanza.com`
   - Check spam folder if not in inbox

2. **Check Edge Function Logs:**
   - Go to: https://supabase.com/dashboard/project/dxzvetuowgvdjoukneot/functions/send-welcome-email/logs
   - Look for any errors related to Resend API
   - Successful sends should show "Email sent successfully"

## Edge Functions Status

| Function | Status | Requires Resend? |
|----------|--------|------------------|
| send-welcome-email | Active | ✅ Yes |
| send-password-reset | Not Used | ❌ No (uses Supabase native) |

---

**Last Updated:** December 3, 2025
