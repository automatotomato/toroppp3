# Quick Fix for Email Issues

## The Problem
Users aren't receiving emails because Supabase needs an email provider configured through the dashboard.

## ⚠️ IMPORTANT: Dashboard Access Required

**Supabase Project Reference:** `hzmqhrkrclabdgmryyzl`

**If you cannot access https://supabase.com/dashboard/project/hzmqhrkrclabdgmryyzl:**

You have 3 options:

### Option 1: Get Access to Existing Project
- Contact the person who set up the Supabase project
- Ask them to invite you to the project via email
- They can do this in: Dashboard → Project Settings → Team Settings → Invite

### Option 2: Ask Project Owner to Configure Emails
- Send them this guide
- They can follow the steps below to enable email delivery
- No code changes needed

### Option 3: Create Your Own Supabase Project
1. Go to https://supabase.com/dashboard
2. Create a new project
3. Get your new credentials:
   - Project URL (Settings → API)
   - Anon/Public Key (Settings → API)
4. Update `.env` file:
   ```bash
   VITE_SUPABASE_URL=your-new-project-url
   VITE_SUPABASE_ANON_KEY=your-new-anon-key
   ```
5. Re-run migrations or let them auto-create on first use

---

## Email Configuration Steps (For Project Owner)

### Quick Fix: Disable Email Confirmation (Testing Only)

1. Go to https://supabase.com/dashboard
2. Select project: `hzmqhrkrclabdgmryyzl`
3. Navigate to **Authentication** → **Providers** → **Email**
4. Scroll to **Email Confirmation**
5. **UNCHECK** "Enable email confirmations"
6. Click **Save**

✅ Users can now sign up immediately without email verification
⚠️ **NOT recommended for production** - skip email security checks

---

### Production Fix: Configure SMTP Email Provider

**Using Resend (Recommended - API key already in project):**

1. Go to https://supabase.com/dashboard
2. Select project: `hzmqhrkrclabdgmryyzl`
3. Navigate to **Project Settings** → **Auth**
4. Scroll to **SMTP Settings**
5. Click **Enable Custom SMTP Server**
6. Enter these settings:
   ```
   Sender name: Advancement Academy
   Sender email: info@3-peak.com
   Host: smtp.resend.com
   Port number: 587
   Username: resend
   Password: re_BHJm4wAU_PdpBhKUeRVyNsfuzNGFKgmFA
   ```
7. Click **Save**

**Configure Redirect URLs:**
1. Still in **Auth** settings, scroll to **URL Configuration**
2. Set **Site URL**: Your production domain (e.g., `https://yourdomain.com`)
3. Add **Redirect URLs** (one per line):
   ```
   https://yourdomain.com/reset-password
   https://yourdomain.com/dashboard
   http://localhost:5173/reset-password
   http://localhost:5173/dashboard
   ```
4. Click **Save**

**Verify Sender Email in Resend:**
1. Log into https://resend.com
2. Go to **Settings** → **Domains** (or **Email Addresses**)
3. Verify that `info@3-peak.com` is verified
4. If not, add and verify it following Resend's instructions

---

## Alternative: Use SendGrid (Free Tier)

If Resend doesn't work, try SendGrid:

1. Create account at https://sendgrid.com
2. Verify your email
3. Create API Key: Settings → API Keys → Create API Key
4. In Supabase SMTP settings:
   ```
   Sender name: Advancement Academy
   Sender email: noreply@yourdomain.com
   Host: smtp.sendgrid.net
   Port number: 587
   Username: apikey
   Password: [Your SendGrid API Key]
   ```
5. Verify sender in SendGrid: Settings → Sender Authentication

---

## Testing After Configuration

1. **Test Signup:**
   - Create new account on your app
   - Check email inbox (and spam folder)
   - Click confirmation link
   - Verify you can log in

2. **Test Password Reset:**
   - Click "Forgot Password"
   - Enter email address
   - Check inbox for reset email
   - Click link and set new password
   - Log in with new password

---

## Code Changes Already Made

✅ Updated signup to use Supabase native email confirmation
✅ Updated password reset to use Supabase built-in system
✅ Added proper redirect URLs for email links
✅ Improved error handling and user messaging
✅ Fixed database RLS policies for authentication

**No additional code changes needed** - just configure emails in dashboard!

---

## Troubleshooting

**Emails not arriving:**
- Check spam/junk folder
- Verify sender email is confirmed in email provider (Resend/SendGrid)
- Check Supabase Auth Logs: Dashboard → Logs → Auth Logs
- Try different email address

**Cannot access dashboard:**
- Verify you're logged into correct Supabase account
- Check if project is listed at https://supabase.com/dashboard
- Request access from project owner

**Emails going to spam:**
- Add SPF/DKIM records to your domain (required for production)
- Verify sender domain in email provider
- Warm up your sending reputation by starting with small volumes

---

## Summary

**The Issue:** Supabase requires email configuration through the dashboard, which cannot be done via code.

**The Solution:** Someone with dashboard access must configure SMTP settings OR disable email confirmation.

**Next Steps:**
1. Gain access to the Supabase dashboard
2. Follow one of the configuration options above
3. Test the email flow
4. Your authentication will work completely

For more details, see: `SUPABASE_EMAIL_SETUP.md`
