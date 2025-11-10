/*
  # Welcome Email Trigger Setup

  1. Overview
    - Creates a database trigger to automatically send welcome emails when users sign up
    - Uses Supabase Edge Function to handle email sending

  2. Changes
    - Creates a trigger function that calls the send-welcome-email edge function
    - Attaches trigger to auth.users table on INSERT
    - Extracts user email and metadata for personalized welcome emails

  3. Security
    - Uses pg_net extension for secure HTTP requests
    - Edge function handles email template and delivery
    - No sensitive data exposed in trigger
*/

-- Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send welcome email
CREATE OR REPLACE FUNCTION public.send_welcome_email_on_signup()
RETURNS TRIGGER AS $$
DECLARE
  request_id bigint;
  supabase_url text;
  function_url text;
  service_role_key text;
  user_name text;
BEGIN
  -- Get Supabase URL and service role key from environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- Construct edge function URL
  function_url := supabase_url || '/functions/v1/send-welcome-email';
  
  -- Extract user name from raw_user_meta_data if available
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );
  
  -- Make async HTTP request to edge function
  SELECT INTO request_id net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'email', NEW.email,
      'name', user_name
    )
  );
  
  -- Log the request
  RAISE LOG 'Welcome email request sent for user: % (request_id: %)', NEW.email, request_id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the signup
    RAISE WARNING 'Failed to send welcome email for user %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_send_welcome_email ON auth.users;

CREATE TRIGGER on_auth_user_created_send_welcome_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.send_welcome_email_on_signup();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA net TO postgres, anon, authenticated, service_role;