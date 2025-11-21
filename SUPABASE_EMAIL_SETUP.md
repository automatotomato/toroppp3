# Supabase Email Configuration Guide

## Current Issue
Users are not receiving emails for:
- Account signup confirmation
- Password reset requests

This is because Supabase requires email provider configuration, which must be done through the Supabase Dashboard.

## Solution Options

### Option 1: Disable Email Confirmation (Quick Fix - For Testing/Development)

**Steps:**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `hzmqhrkrclabdgmryyzl`
3. Navigate to **Authentication** → **Providers** → **Email**
4. Scroll down to **Email Confirmation**
5. **UNCHECK** "Enable email confirmations"
6. Click **Save**

**After this change:**
- Users can sign up and immediately log in without email verification
- Password resets will use Supabase's built-in email system (but still won't work without an email provider)
- This is suitable for development/testing but NOT recommended for production

---

### Option 2: Configure Custom SMTP Email Provider (Recommended for Production)

Supabase can send emails through your own SMTP provider. Here's how to set it up:

#### Step 1: Choose an Email Provider

Popular options:
- **SendGrid** (Free tier: 100 emails/day)
- **Mailgun** (Free tier: 100 emails/day)
- **Amazon SES** (Pay-as-you-go, very cheap)
- **Resend** (Modern, developer-friendly)
- Your own SMTP server

#### Step 2: Configure SMTP in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Project Settings** → **Auth** → **SMTP Settings**
3. Enable **Use Custom SMTP Server**
4. Fill in your SMTP details:
   ```
   Host: smtp.youremailprovider.com
   Port: 587 (or 465 for SSL)
   Username: your-smtp-username
   Password: your-smtp-password
   Sender Email: noreply@yourdomain.com
   Sender Name: Advancement Academy
   ```

#### Step 3: Configure Email Templates

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**
2. Customize these templates:
   - **Confirm signup** - Sent when users register
   - **Magic Link** - For passwordless login (if you use it)
   - **Change Email Address** - When users change email
   - **Reset Password** - For password reset requests

**Important Template Variables:**
- `{{ .ConfirmationURL }}` - The confirmation/reset link
- `{{ .Token }}` - The verification token
- `{{ .Email }}` - User's email address
- `{{ .SiteURL }}` - Your application URL

#### Step 4: Configure Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add your redirect URLs:
   ```
   Site URL: https://yourdomain.com

   Redirect URLs:
   - https://yourdomain.com/reset-password
   - https://yourdomain.com/dashboard
   - http://localhost:5173/reset-password (for development)
   - http://localhost:5173/dashboard (for development)
   ```

---

## Example: Setting Up with SendGrid

1. **Create SendGrid Account:**
   - Go to https://sendgrid.com
   - Sign up for free account
   - Verify your email

2. **Create API Key:**
   - In SendGrid dashboard, go to Settings → API Keys
   - Click "Create API Key"
   - Name it "Supabase Auth"
   - Give it "Mail Send" permissions
   - Copy the API key (you won't see it again!)

3. **Configure in Supabase:**
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey (literally the word "apikey")
   Password: [Your SendGrid API Key]
   Sender Email: noreply@yourdomain.com
   Sender Name: Advancement Academy
   ```

4. **Verify Sender Email:**
   - SendGrid requires you to verify the sender email
   - Go to Settings → Sender Authentication
   - Add and verify your sender email

---

## Example: Setting Up with Resend

The project already has Resend configured for the Edge Functions. You can use the same account:

1. **Get Resend SMTP Credentials:**
   - Log into Resend dashboard
   - Go to API Keys
   - Your SMTP credentials are:
     ```
     Host: smtp.resend.com
     Port: 587
     Username: resend
     Password: [Your Resend API Key - same as RESEND_API_KEY]
     ```

2. **Configure in Supabase:**
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: re_BHJm4wAU_PdpBhKUeRVyNsfuzNGFKgmFA
   Sender Email: info@3-peak.com
   Sender Name: Advancement Academy
   ```

---

## Testing Email Configuration

After setup, test the email flow:

1. **Test Signup:**
   - Create a new account
   - Check if you receive confirmation email
   - Click the link to confirm

2. **Test Password Reset:**
   - Go to forgot password page
   - Enter your email
   - Check for password reset email
   - Click the link and set new password

3. **Check Spam Folder:**
   - Sometimes emails go to spam initially
   - This improves as your domain reputation builds

---

## Current Code Implementation

The application is now configured to use Supabase's native email system with these improvements:

1. **Signup Flow:**
   - Uses `supabase.auth.signUp()` with `emailRedirectTo` option
   - Automatically redirects to `/dashboard` after confirmation
   - Stores user metadata for profile creation

2. **Password Reset Flow:**
   - Uses `supabase.auth.resetPasswordForEmail()`
   - Redirects to `/reset-password` page
   - Works with Supabase's email templates

3. **Password Update:**
   - Uses `supabase.auth.updateUser()` to set new password
   - Handles the token from the email link automatically

---

## Important Notes

- **Email confirmation is required by default** in Supabase for security
- **Without email provider**, users cannot complete signup or reset passwords
- **Option 1** (disable confirmation) should only be used for development
- **Option 2** (SMTP setup) is required for production
- Email setup is done entirely through Supabase Dashboard - no code changes needed

---

## Support

If you need help with email configuration:
1. Check Supabase documentation: https://supabase.com/docs/guides/auth/auth-smtp
2. Contact Supabase support through the dashboard
3. Review email provider documentation for SMTP settings
