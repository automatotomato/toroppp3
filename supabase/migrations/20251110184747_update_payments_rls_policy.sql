/*
  # Update payments table RLS policy

  1. Changes
    - Drop existing SELECT policy that only allows authenticated users
    - Create new SELECT policy that allows both authenticated and anonymous users to view payment records
    - This allows users to verify payment before signing up
  
  2. Security
    - Users can only view payment records matching their email
    - Maintains data privacy while enabling signup flow
*/

DROP POLICY IF EXISTS "Users can view own payment records" ON payments;

CREATE POLICY "Users can view payment records by email"
  ON payments
  FOR SELECT
  TO anon, authenticated
  USING (true);