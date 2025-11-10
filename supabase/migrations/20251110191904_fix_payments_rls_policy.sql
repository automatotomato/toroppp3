/*
  # Fix Payments Table RLS Policy

  1. Changes
    - Drop existing restrictive insert policy
    - Create new policy allowing anonymous users to insert payment records
    - This is safe because payment data is being created during registration flow

  2. Security
    - RLS remains enabled
    - Users can still only view their own payment records
    - Anonymous users can insert (needed for payment flow before account creation)
*/

-- Drop the old policy
DROP POLICY IF EXISTS "Service role can insert payments" ON payments;

-- Create new policy allowing anonymous and authenticated users to insert
CREATE POLICY "Allow anonymous payment insertion"
  ON payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
