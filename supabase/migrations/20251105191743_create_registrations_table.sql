/*
  # Create registrations table for Toro Tax Training Program

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `full_name` (text, required) - Registrant's full name
      - `email` (text, required) - Registrant's email address
      - `phone_number` (text, required) - Registrant's phone number
      - `organization` (text, optional) - Registrant's organization/company
      - `created_at` (timestamptz) - Timestamp of registration submission
      - `status` (text) - Registration status (pending, confirmed, cancelled)
  
  2. Security
    - Enable RLS on `registrations` table
    - Add policy for anonymous users to insert registrations
    - Add policy for authenticated users to view all registrations (admin access)
  
  3. Indexes
    - Index on email for faster lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  organization text DEFAULT '',
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit registrations
CREATE POLICY "Anyone can submit registration"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admins) to view all registrations
CREATE POLICY "Authenticated users can view all registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);