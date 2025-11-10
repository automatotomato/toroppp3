/*
  # Enable Leaked Password Protection

  1. Manual Configuration Required
    - Leaked password protection must be enabled in the Supabase Dashboard
    - This is a project-level auth setting that cannot be configured via SQL migrations
    
  2. Instructions
    To enable this security feature:
    
    a. Go to your Supabase Dashboard: https://supabase.com/dashboard
    b. Select your project
    c. Navigate to: Authentication → Settings (or Settings → Authentication)
    d. Scroll to "Password Protection" or "Security Settings"
    e. Enable "Check for breached passwords" or "Enable Have I Been Pwned (HIBP) integration"
    f. Save changes
    
  3. What This Does
    - Checks user passwords against the HaveIBeenPwned.org database
    - Prevents users from using passwords that have been exposed in data breaches
    - Significantly improves account security
    - Does not send actual passwords to HIBP (uses k-anonymity model)
    
  4. Security Benefits
    - Protects users from credential stuffing attacks
    - Reduces risk of account compromise
    - Industry best practice for password security
    - Zero trust approach to password validation

  Note: This migration serves as documentation. The actual feature must be
  enabled through the Supabase Dashboard UI as it's a project-level configuration.
*/

-- This is a documentation-only migration
-- The leaked password protection feature must be enabled via Supabase Dashboard
SELECT 'Leaked password protection must be enabled in Supabase Dashboard' as reminder;
