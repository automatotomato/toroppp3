/*
  # Fix Security Issues

  1. Index Optimization
    - Drop unused `payments_user_id_idx` index
    - The user_id column is rarely queried directly; email is the primary lookup field
    - This reduces index maintenance overhead

  2. Function Security
    - Fix `insert_payment` function to have immutable search_path
    - Add explicit schema qualification to prevent search_path manipulation attacks
    - Set search_path to empty string for security

  3. Password Protection
    - Note: Leaked password protection must be enabled in Supabase Dashboard
    - Navigate to: Authentication > Settings > Security
    - Enable "Check for compromised passwords" option
    - This cannot be enabled via SQL migration
*/

-- Drop unused index
DROP INDEX IF EXISTS public.payments_user_id_idx;

-- Recreate insert_payment function with secure search_path
DROP FUNCTION IF EXISTS public.insert_payment(uuid, text, text, text, text, integer);

CREATE OR REPLACE FUNCTION public.insert_payment(
  p_user_id uuid,
  p_email text,
  p_plan_type text,
  p_full_name text,
  p_office_name text,
  p_amount_paid integer
)
RETURNS uuid
SECURITY INVOKER
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_payment_id uuid;
BEGIN
  INSERT INTO public.payments (
    user_id,
    email,
    plan_type,
    full_name,
    office_name,
    amount_paid,
    payment_status
  ) VALUES (
    p_user_id,
    p_email,
    p_plan_type,
    p_full_name,
    p_office_name,
    p_amount_paid,
    'pending'
  )
  RETURNING id INTO v_payment_id;
  
  RETURN v_payment_id;
END;
$$;