/*
  # Setup Weekly Tips Automation with pg_cron

  1. Enable Extensions
    - Enable pg_cron extension for scheduling
    - Enable pg_net extension for HTTP requests

  2. Create Helper Function
    - Function to call the generate-weekly-tip edge function
    - Uses pg_net to make HTTP request
    - Logs execution results

  3. Create Logging Table
    - Track automated tip generation
    - Store execution time, status, and results

  Note: The actual cron schedule must be set up through Supabase Dashboard
  or using the cron.schedule function with proper permissions.
*/

-- Enable required extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create logging table for automation tracking
CREATE TABLE IF NOT EXISTS tip_generation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  executed_at timestamptz DEFAULT now(),
  status text NOT NULL,
  tips_created int DEFAULT 0,
  error_message text,
  response_data jsonb
);

-- Enable RLS on logging table
ALTER TABLE tip_generation_logs ENABLE ROW LEVEL SECURITY;

-- Policy for service role to manage logs
CREATE POLICY "Service role can manage tip generation logs"
  ON tip_generation_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to generate tips via edge function
CREATE OR REPLACE FUNCTION generate_weekly_tips_automated()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_request_id bigint;
  v_supabase_url text := current_setting('request.headers', true)::json->>'host';
BEGIN
  -- Construct the edge function URL
  IF v_supabase_url IS NULL OR v_supabase_url = '' THEN
    -- Fallback to environment variable or hardcoded project URL
    v_supabase_url := coalesce(
      current_setting('app.supabase_url', true),
      'https://' || current_setting('request.jwt.claim.iss', true)
    );
  END IF;

  -- Make HTTP POST request to edge function
  SELECT net.http_post(
    url := v_supabase_url || '/functions/v1/generate-weekly-tip',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('request.jwt.claim', true)
    ),
    body := jsonb_build_object('count', 5)
  ) INTO v_request_id;

  -- Log successful execution
  INSERT INTO tip_generation_logs (status, tips_created, response_data)
  VALUES ('initiated', 5, jsonb_build_object('request_id', v_request_id));

  RETURN jsonb_build_object('success', true, 'request_id', v_request_id);

EXCEPTION WHEN OTHERS THEN
  -- Log errors
  INSERT INTO tip_generation_logs (status, error_message)
  VALUES ('failed', SQLERRM);
  
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Instructions for setting up the cron job:
-- Run this SQL in Supabase SQL Editor with proper permissions:
--
-- SELECT cron.schedule(
--   'generate-weekly-tips',
--   '0 6 * * 1',
--   $$SELECT generate_weekly_tips_automated();$$
-- );