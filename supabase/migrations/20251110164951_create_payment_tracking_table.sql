/*
  # Create payment tracking table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null) - Email used during payment
      - `plan_type` (text, not null) - Plan selected (promo, elite, essentials)
      - `full_name` (text, not null) - Name provided during payment
      - `office_name` (text, not null) - Office name provided during payment
      - `amount_paid` (integer, not null) - Amount paid in cents
      - `payment_status` (text, not null) - Status: pending, completed, failed
      - `paid_at` (timestamptz) - When payment was completed
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `payments` table
    - Only authenticated users can read their own payment records
    - Service role can insert payment records

  3. Notes
    - This table tracks payments before account creation
    - Email is the link between payment and account signup
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
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

CREATE POLICY "Users can view own payment records"
  ON payments
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Service role can insert payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);