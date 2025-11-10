/*
  # Create Payment Insert Function

  1. Changes
    - Create a database function to insert payment records
    - This bypasses PostgREST schema cache issues
    - Function will be callable via RPC

  2. Security
    - Function runs with invoker privileges
    - RLS policies still apply
*/

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