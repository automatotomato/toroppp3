/*
  # Create Progress Tracking System

  ## Overview
  This migration creates a comprehensive progress tracking system for user activities across different content types in the academy platform.

  ## New Tables
  
  ### `content_progress`
  Tracks individual user progress on courses, videos, podcasts, and other content
  - `id` (uuid, primary key) - Unique identifier for each progress record
  - `user_id` (uuid, foreign key) - References auth.users(id)
  - `content_type` (text) - Type of content: 'course', 'video', 'podcast', 'town_hall', 'resource', 'tip'
  - `content_id` (text) - Identifier for the specific content item
  - `content_title` (text) - Title of the content for easy reference
  - `progress_percentage` (integer) - Progress from 0-100
  - `completed` (boolean) - Whether the content has been completed
  - `last_accessed_at` (timestamptz) - When the user last accessed this content
  - `completed_at` (timestamptz, nullable) - When the content was completed
  - `created_at` (timestamptz) - When the progress record was created
  - `updated_at` (timestamptz) - When the progress record was last updated

  ### `section_progress`
  Tracks overall progress in major dashboard sections
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References auth.users(id)
  - `section_name` (text) - Name of the section: 'courses', 'town_halls', 'podcasts', 'tips', 'resources'
  - `total_items` (integer) - Total number of items in this section
  - `completed_items` (integer) - Number of completed items
  - `progress_percentage` (integer) - Calculated progress 0-100
  - `updated_at` (timestamptz) - When the section progress was last updated

  ## Security
  - Enable RLS on both tables
  - Users can only view and manage their own progress records
  - Policies enforce authentication and ownership checks

  ## Indexes
  - Index on user_id for fast user-specific queries
  - Composite index on (user_id, content_type, content_id) for efficient lookups
  - Index on (user_id, section_name) for section progress queries
*/

-- Create content_progress table
CREATE TABLE IF NOT EXISTS content_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('course', 'video', 'podcast', 'town_hall', 'resource', 'tip')),
  content_id text NOT NULL,
  content_title text NOT NULL,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed boolean DEFAULT false,
  last_accessed_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- Create section_progress table
CREATE TABLE IF NOT EXISTS section_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  section_name text NOT NULL CHECK (section_name IN ('courses', 'town_halls', 'podcasts', 'tips', 'resources')),
  total_items integer DEFAULT 0,
  completed_items integer DEFAULT 0,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, section_name)
);

-- Enable RLS
ALTER TABLE content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

-- Content Progress Policies
CREATE POLICY "Users can view own content progress"
  ON content_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content progress"
  ON content_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content progress"
  ON content_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own content progress"
  ON content_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Section Progress Policies
CREATE POLICY "Users can view own section progress"
  ON section_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own section progress"
  ON section_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own section progress"
  ON section_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own section progress"
  ON section_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_progress_user_id ON content_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_content_progress_lookup ON content_progress(user_id, content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_section_progress_user_id ON section_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_section_progress_lookup ON section_progress(user_id, section_name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_content_progress_updated_at
  BEFORE UPDATE ON content_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_progress_updated_at
  BEFORE UPDATE ON section_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize section progress for new users
CREATE OR REPLACE FUNCTION initialize_section_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO section_progress (user_id, section_name, total_items, completed_items, progress_percentage)
  VALUES
    (NEW.id, 'courses', 12, 0, 0),
    (NEW.id, 'town_halls', 0, 0, 0),
    (NEW.id, 'podcasts', 0, 0, 0),
    (NEW.id, 'tips', 0, 0, 0),
    (NEW.id, 'resources', 0, 0, 0)
  ON CONFLICT (user_id, section_name) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to initialize section progress when profile is created
CREATE TRIGGER init_section_progress_on_profile_creation
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_section_progress();