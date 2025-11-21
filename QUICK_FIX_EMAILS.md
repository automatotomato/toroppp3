# Quick Fix for Email Issues

## The Problem
Users aren't receiving emails because Supabase needs an email provider configured.

## Quick Solution (5 minutes)

### Option A: Disable Email Confirmation (For Testing Only)
1. Go to https://supabase.com/dashboard/project/hzmqhrkrclabdgmryyzl
2. Click **Authentication** → **Providers** → **Email**
3. Scroll down and **UNCHECK** "Enable email confirmations"
4. Click **Save**
5. Users can now sign up without email verification

⚠️ **Warning**: This is NOT secure for production. Use only for testing.

---

### Option B: Configure Email Provider (Recommended - 10 minutes)

**Using Resend (Easiest - You already have an API key):**

1. Go to https://supabase.com/dashboard/project/hzmqhrkrclabdgmryyzl
2. Click **Project Settings** → **Auth** → **SMTP Settings**
3. Enable **"Enable Custom SMTP"**
4. Enter these settings:
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: re_BHJm4wAU_PdpBhKUeRVyNsfuzNGFKgmFA
   Sender email: info@3-peak.com
   Sender name: Advancement Academy
   ```
5. Click **Save**

6. Configure Redirect URLs:
   - Go to **Authentication** → **URL Configuration**
   - Set **Site URL** to your production URL
   - Add these **Redirect URLs**:
     - `https://yourdomain.com/reset-password`
     - `https://yourdomain.com/dashboard`
     - `http://localhost:5173/reset-password` (for local dev)
     - `http://localhost:5173/dashboard` (for local dev)

7. Test it:
   - Try signing up with a new email
   - Check your inbox for confirmation email
   - Try password reset

---

## What Changed in the Code

✅ **Updated signup flow** - Now uses Supabase's native email confirmation
✅ **Updated password reset** - Uses Supabase's built-in system instead of Edge Function
✅ **Better error handling** - Clearer messages for users
✅ **Proper redirects** - Users land on the right page after email confirmation

---

## Testing Checklist

After configuring emails:

- [ ] Sign up with a new email address
- [ ] Receive and click confirmation email
- [ ] Log in successfully
- [ ] Test "Forgot Password" flow
- [ ] Receive and use password reset email
- [ ] Successfully set new password

---

## Still Having Issues?

1. **Check spam folder** - First emails often go there
2. **Verify sender email** - Make sure info@3-peak.com is verified in Resend
3. **Check Supabase logs** - Dashboard → Logs → Auth Logs
4. **Test with different email** - Some providers are pickier than others

For detailed setup instructions, see: `SUPABASE_EMAIL_SETUP.md`
