/*
  # Add user_id to payments table

  1. Changes
    - Add `user_id` column to `payments` table to link payments to auth users
    - Add foreign key constraint to ensure referential integrity
    - Create index for faster lookups

  2. Security
    - No RLS changes needed as existing policies remain in place
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE payments ADD COLUMN user_id uuid REFERENCES auth.users(id);
    CREATE INDEX IF NOT EXISTS payments_user_id_idx ON payments(user_id);
  END IF;
END $$;