# Supabase Dashboard Setup Guide for Password Reset Emails

This guide will walk you through configuring password reset emails in the Supabase Dashboard.

## Prerequisites

- Access to Supabase Dashboard: https://supabase.com/dashboard
- Project ID: dxzvetuowgvdjoukneot
- Resend API Key: `re_BHJm4wAU_PdpBhKUeRVyNsfuzNGFKgmFA`
- Verified sender email: info@3-peakavanza.com

---

## Step 1: Configure SMTP Settings

1. Navigate to https://supabase.com/dashboard
2. Select your project: **dxzvetuowgvdjoukneot**
3. Click the **Settings** icon (gear) in the left sidebar
4. Select **Authentication** from the settings menu
5. Scroll down to **SMTP Settings**
6. Click **Enable Custom SMTP Server**
7. Enter the following details:

   ```
   Sender name: Advancement Academy
   Sender email: info@3-peakavanza.com
   Host: smtp.resend.com
   Port number: 587
   Minimum interval between emails: 60
   Username: resend
   Password: re_BHJm4wAU_PdpBhKUeRVyNsfuzNGFKgmFA
   ```

8. Click **Save**

---

## Step 2: Verify Sender Email in Resend

Before emails will be delivered, you need to verify the sender email:

1. Log into Resend: https://resend.com/login
2. Navigate to **Domains** or **Email Addresses**
3. Verify that **info@3-peakavanza.com** is listed and verified
4. If not verified:
   - Add the email address or domain
   - Follow Resend's verification process (usually involves adding DNS records)
   - Wait for verification to complete (can take a few minutes to 24 hours)

---

## Step 3: Configure URL Settings

1. In Supabase Dashboard, stay in **Authentication** settings
2. Scroll to **URL Configuration** section
3. Set the following:

   **Site URL:**
   ```
   https://www.3-peakavanza.com
   ```

   **Redirect URLs** (add each one on a new line):
   ```
   https://www.3-peakavanza.com/reset-password
   https://www.3-peakavanza.com/dashboard
   http://localhost:5173/reset-password
   http://localhost:5173/dashboard
   ```

4. Click **Save**

---

## Step 4: Customize Password Reset Email Template

1. In the left sidebar, navigate to **Authentication** > **Email Templates**
2. Select **Reset Password** from the template list
3. You'll see two tabs: **HTML** and **Plain Text**

### HTML Template

1. Click the **HTML** tab
2. Delete the existing template
3. Copy the entire contents from `email-templates/password-reset-html.html`
4. Paste it into the HTML editor
5. Set the **Subject** to: `Reset Your Password - Advancement Academy`

### Plain Text Template

1. Click the **Plain Text** tab
2. Delete the existing template
3. Copy the entire contents from `email-templates/password-reset-plain.txt`
4. Paste it into the plain text editor

6. Click **Save** at the bottom of the page

---

## Step 5: Test the Configuration

### Option A: Use Supabase Dashboard Test Feature (if available)

1. Look for a **Send Test Email** button in the Email Templates section
2. Enter your personal email address
3. Click **Send**
4. Check your inbox (and spam folder)

### Option B: Test Through the Application

1. Navigate to your application: https://www.3-peakavanza.com
2. Go to the login page
3. Click **Forgot Password?**
4. Enter a valid user email address
5. Submit the form
6. Check the email inbox for the password reset email
7. Verify the email looks correct and branded
8. Click the reset link
9. Verify you're redirected to the reset password page
10. Enter a new password and confirm it works

---

## Step 6: Troubleshooting

### Emails Not Arriving

**Check Supabase Auth Logs:**
1. Go to **Authentication** > **Logs** in Supabase Dashboard
2. Look for any error messages related to email sending

**Verify Resend Setup:**
1. Log into Resend dashboard
2. Check **Logs** section for any failed email attempts
3. Verify sender email is verified
4. Check for any domain issues

**Check Spam Folder:**
- First emails may land in spam
- Mark as "Not Spam" to improve future delivery

### Reset Link Not Working

**Verify Redirect URLs:**
- Ensure all redirect URLs are added to URL Configuration
- URLs must match exactly (including https/http and trailing slashes)

**Check Link Expiration:**
- Reset links expire after 1 hour
- Request a new reset email if expired

### Email Formatting Issues

**Email Tracking:**
- Disable "click tracking" in Resend if enabled
- This can break reset links

**Email Client Compatibility:**
- Test with different email clients (Gmail, Outlook, Apple Mail)
- Some clients may not render gradients or advanced CSS

---

## Step 7: Monitor and Maintain

### Regular Checks

- Monitor email delivery rates in Resend dashboard
- Check Supabase Auth Logs for any errors
- Review user feedback about email delivery

### Rate Limits

Supabase imposes rate limits on password reset requests:
- Default: 2 emails per hour per user during testing
- With custom SMTP: Higher limits (configured in SMTP settings)
- This prevents abuse and protects user accounts

### Security Best Practices

- Never share SMTP credentials
- Regularly review Auth Logs for suspicious activity
- Keep sender email verification active
- Monitor for phishing attempts using similar domains

---

## Available Template Variables

When customizing templates, you can use these Supabase variables:

- `{{ .ConfirmationURL }}` - The password reset link
- `{{ .Email }}` - The user's email address
- `{{ .Token }}` - 6-digit OTP (not typically used for password reset)
- `{{ .SiteURL }}` - Your configured site URL
- `{{ .Data.Year }}` - Current year (custom metadata)

### Conditional Rendering Example

```html
{{ if eq .Email "admin@example.com" }}
  <p>Welcome back, admin!</p>
{{ end }}
```

---

## Support Contacts

If you encounter issues during setup:

- Supabase Support: https://supabase.com/dashboard/support
- Resend Support: https://resend.com/support
- Project Contact: info@3-peakavanza.com
- Phone: (915) 490-1889

---

## Summary

Once configured, your password reset flow will:

1. User clicks "Forgot Password" in your application
2. User enters their email address
3. Supabase sends branded email via Resend SMTP
4. User receives email with reset link
5. User clicks link and is redirected to reset password page
6. User enters new password
7. User can log in with new credentials

No code changes are required - the existing frontend already uses `supabase.auth.resetPasswordForEmail()` which will automatically use these configured templates.
