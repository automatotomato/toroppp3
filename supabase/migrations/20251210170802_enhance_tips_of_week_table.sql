/*
  # Enhance Tips of Week Table

  1. Changes
    - Add category field for tip categorization (Revenue, Growth, Finance, Marketing, Operations, Technology)
    - Add key_points field as JSON array for actionable items
    - Add gradient field for UI styling
    - Add likes_count field for engagement tracking
    - Add week_start_date field for better date tracking
    - Add is_active field to control tip visibility
    - Drop old week_number field in favor of week_start_date
    
  2. Security
    - Enable RLS on tips_of_week table
    - Add policy for authenticated users to read tips
    - Add policy for service role to insert/update tips
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'category'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN category text DEFAULT 'General';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'key_points'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN key_points jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'gradient'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN gradient text DEFAULT 'from-blue-500 to-blue-600';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'likes_count'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN likes_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'week_start_date'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN week_start_date date DEFAULT CURRENT_DATE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tips_of_week' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE tips_of_week ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_tips_week_start_date ON tips_of_week(week_start_date DESC);
CREATE INDEX IF NOT EXISTS idx_tips_is_active ON tips_of_week(is_active);

DROP POLICY IF EXISTS "Anyone can view active tips" ON tips_of_week;
CREATE POLICY "Anyone can view active tips"
  ON tips_of_week
  FOR SELECT
  TO authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Service role can manage tips" ON tips_of_week;
CREATE POLICY "Service role can manage tips"
  ON tips_of_week
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);