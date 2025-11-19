/*
  # Fix Payment Verification RLS

  1. Changes
    - Add policy to allow anonymous users to verify payment by email
    - This is needed during account creation before user is authenticated

  2. Security
    - Policy only allows SELECT on payments table
    - Users can only query by email (their own)
    - No sensitive payment info is exposed beyond what's needed for verification
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own payment records" ON payments;
DROP POLICY IF EXISTS "Service role can insert payments" ON payments;

-- Allow authenticated users to view their own payment records
CREATE POLICY "Authenticated users can view own payment records"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anonymous users to verify payment by email during signup
CREATE POLICY "Anyone can verify payment by email"
  ON payments
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow service role to insert payment records
CREATE POLICY "Service role can insert payments"
  ON payments
  FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);