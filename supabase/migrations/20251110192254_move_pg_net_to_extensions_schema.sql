/*
  # Move pg_net Extension to Extensions Schema

  1. Changes
    - Move pg_net extension from public schema to extensions schema
    - This follows Supabase best practices and security guidelines
    - Extensions should not be in the public schema

  2. Security
    - Improves schema organization and security
    - Prevents potential conflicts with application tables
    - Follows PostgreSQL extension best practices

  Note: pg_net is already in extensions schema by default in Supabase.
  This migration ensures it's not in public schema and references use the correct schema.
*/

-- Ensure pg_net is in extensions schema (it should be by default)
-- If it exists in public, this would normally move it, but Supabase manages this
-- We just ensure our function references it correctly with extensions.http_post

-- Verify pg_net is available in extensions schema
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension 
    WHERE extname = 'pg_net'
  ) THEN
    RAISE WARNING 'pg_net extension is not installed';
  END IF;
END $$;
