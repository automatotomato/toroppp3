/*
  # Create Tip Bookmarks System

  1. New Tables
    - `user_bookmarked_tips`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `tip_id` (uuid, foreign key to tips_of_week)
      - `bookmarked_at` (timestamptz, when bookmark was created)
      - Unique constraint on (user_id, tip_id) to prevent duplicate bookmarks

  2. Security
    - Enable RLS on `user_bookmarked_tips` table
    - Add policy for users to view their own bookmarks
    - Add policy for users to create their own bookmarks
    - Add policy for users to delete their own bookmarks

  3. Indexes
    - Index on user_id for fast bookmark lookups by user
    - Index on tip_id for fast bookmark counts
    - Composite index on (user_id, tip_id) for quick bookmark checks

  4. Functions
    - Function to get bookmark status for a user and tip
    - Function to toggle bookmark (add if doesn't exist, remove if exists)
*/

-- Create user_bookmarked_tips table
CREATE TABLE IF NOT EXISTS user_bookmarked_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tip_id uuid NOT NULL REFERENCES tips_of_week(id) ON DELETE CASCADE,
  bookmarked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tip_id)
);

-- Enable RLS
ALTER TABLE user_bookmarked_tips ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own bookmarks"
  ON user_bookmarked_tips
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON user_bookmarked_tips
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON user_bookmarked_tips
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_bookmarked_tips_user_id ON user_bookmarked_tips(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarked_tips_tip_id ON user_bookmarked_tips(tip_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarked_tips_user_tip ON user_bookmarked_tips(user_id, tip_id);

-- Function to toggle bookmark
CREATE OR REPLACE FUNCTION toggle_tip_bookmark(p_tip_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_bookmark_id uuid;
  v_action text;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Check if bookmark exists
  SELECT id INTO v_bookmark_id
  FROM user_bookmarked_tips
  WHERE user_id = v_user_id AND tip_id = p_tip_id;

  IF v_bookmark_id IS NULL THEN
    -- Create bookmark
    INSERT INTO user_bookmarked_tips (user_id, tip_id)
    VALUES (v_user_id, p_tip_id)
    RETURNING id INTO v_bookmark_id;
    v_action := 'added';
  ELSE
    -- Remove bookmark
    DELETE FROM user_bookmarked_tips
    WHERE id = v_bookmark_id;
    v_action := 'removed';
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'action', v_action,
    'bookmarked', (v_action = 'added')
  );
END;
$$;