/*
  # Fix Profiles Table INSERT Policy

  ## Overview
  This migration adds a missing INSERT policy for the profiles table. Without this policy,
  users cannot create their profile records during signup, which blocks authentication.

  ## Changes
  1. Add INSERT policy for profiles table
     - Allows authenticated users to insert their own profile
     - Restricts users to only insert profiles with their own user ID
     - This is critical for the signup flow to work properly

  ## Security
  - Policy ensures users can only create profiles for themselves
  - Uses auth.uid() to validate user ownership
  - Maintains principle of least privilege
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'profiles' 
    AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;
