/*
  # Remove unique constraint from payments table email field

  1. Changes
    - Drop the unique constraint on the email field in payments table
    - This allows users to make multiple payment attempts with the same email
    - Keep the email field as NOT NULL

  2. Notes
    - Users may need to retry payments or purchase multiple plans
    - Each payment attempt should be tracked separately
*/

ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_email_key;
