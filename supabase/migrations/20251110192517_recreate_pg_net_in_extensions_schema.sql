/*
  # Recreate pg_net Extension in Extensions Schema

  1. Changes
    - Drop pg_net extension from public schema
    - Create extensions schema if it doesn't exist
    - Recreate pg_net extension in extensions schema
    - Update function to use correct schema reference

  2. Security
    - Follows PostgreSQL and Supabase best practices
    - Keeps application schema (public) separate from extensions
    - Prevents potential conflicts and security issues

  3. Notes
    - pg_net doesn't support ALTER EXTENSION SET SCHEMA
    - Must drop and recreate in the correct schema
*/

-- Drop the existing extension from public schema
DROP EXTENSION IF EXISTS pg_net CASCADE;

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Grant usage on extensions schema
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Create pg_net extension in extensions schema
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Update the function to use the correct schema reference
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

  -- Make async HTTP request to edge function using extensions schema
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

-- Recreate the trigger if it was dropped
DROP TRIGGER IF EXISTS on_auth_user_created_send_welcome_email ON auth.users;
CREATE TRIGGER on_auth_user_created_send_welcome_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.send_welcome_email_on_signup();
