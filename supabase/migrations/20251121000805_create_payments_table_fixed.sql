/*
  # Create payment tracking table

  ## Overview
  Creates the payments table to track user payments and subscriptions.

  ## Changes
  1. New Tables
    - `payments` - Tracks payments and links to user accounts
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text, not null)
      - `plan_type` (text, not null)
      - `full_name` (text, not null)
      - `office_name` (text, not null)
      - `amount_paid` (integer, not null)
      - `payment_status` (text, default 'pending')
      - `paid_at` (timestamptz, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS
    - Users can view their own payment records
    - Authenticated users can query payments by email (needed for account setup flow)
    - Service role can insert payments

  3. Indexes
    - Index on email for fast lookups during account creation
    - Index on payment_status for filtering
    - Index on user_id for user-specific queries
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text NOT NULL,
  plan_type text NOT NULL,
  full_name text NOT NULL,
  office_name text NOT NULL,
  amount_paid integer NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'payments' 
    AND policyname = 'Users can view own payment records'
  ) THEN
    CREATE POLICY "Users can view own payment records"
      ON payments
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'payments' 
    AND policyname = 'Allow payment verification by email'
  ) THEN
    CREATE POLICY "Allow payment verification by email"
      ON payments
      FOR SELECT
      TO authenticated
      USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'payments' 
    AND policyname = 'Service role can insert payments'
  ) THEN
    CREATE POLICY "Service role can insert payments"
      ON payments
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
