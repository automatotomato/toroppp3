/*
  # Fix Function Search Path Security Issue

  1. Changes
    - Add explicit search_path to send_welcome_email_on_signup function
    - Set search_path to empty string to prevent search path manipulation attacks
    - This is a security best practice for SECURITY DEFINER functions

  2. Security
    - Prevents potential privilege escalation via search_path manipulation
    - Maintains existing functionality with explicit schema references
*/

CREATE OR REPLACE FUNCTION public.send_welcome_email_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
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
  SELECT INTO request_id extensions.http_post(
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
$function$;
