/*
  # Create Profile on User Signup Trigger

  1. Changes
    - Create function to automatically create a profile when a new user signs up
    - Create trigger to execute the function after user insert
    - Profile will be created with user's metadata (full_name, email)

  2. Security
    - Function runs with security definer privileges to bypass RLS
    - Only creates profile, does not modify existing data
*/

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, office_name, role, subscription_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'office_name', ''),
    'user',
    'inactive'
  );
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();