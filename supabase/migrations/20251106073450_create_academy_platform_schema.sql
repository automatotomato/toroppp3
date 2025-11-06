/*
  # Create Advancement Academy Platform Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, required)
      - `full_name` (text, required)
      - `office_name` (text)
      - `role` (text) - 'owner', 'manager', 'team_member'
      - `subscription_status` (text) - 'active', 'cancelled', 'expired'
      - `subscription_expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `short_title` (text)
      - `description` (text)
      - `objectives` (text)
      - `outcomes` (text)
      - `order_number` (integer)
      - `video_url` (text)
      - `duration_minutes` (integer)
      - `thumbnail_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `resources`
      - `id` (uuid, primary key)
      - `course_id` (uuid, references courses)
      - `title` (text, required)
      - `type` (text) - 'handout', 'chart', 'graph', 'tool', 'template'
      - `file_url` (text)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `course_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `course_id` (uuid, references courses)
      - `completed` (boolean)
      - `progress_percent` (integer)
      - `last_watched_position` (integer)
      - `completed_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `town_halls`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `date` (date)
      - `video_url` (text)
      - `description` (text)
      - `thumbnail_url` (text)
      - `created_at` (timestamptz)
    
    - `podcasts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `audio_url_english` (text)
      - `audio_url_spanish` (text)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `tips_of_week`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text)
      - `week_number` (integer)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `cba_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `file_url` (text)
      - `notes` (text)
      - `uploaded_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Profiles: Users can view and update their own profile
    - Courses: All authenticated users can view
    - Resources: All authenticated users can view
    - Course Progress: Users can view and update their own progress
    - Town Halls: All authenticated users can view
    - Podcasts: All authenticated users can view
    - Tips: All authenticated users can view
    - CBA Results: Users can only view and upload their own results
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  office_name text DEFAULT '',
  role text DEFAULT 'owner' NOT NULL,
  subscription_status text DEFAULT 'inactive' NOT NULL,
  subscription_expires_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_title text DEFAULT '',
  description text DEFAULT '',
  objectives text DEFAULT '',
  outcomes text DEFAULT '',
  order_number integer NOT NULL,
  video_url text DEFAULT '',
  duration_minutes integer DEFAULT 0,
  thumbnail_url text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text DEFAULT 'handout' NOT NULL,
  file_url text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view resources"
  ON resources FOR SELECT
  TO authenticated
  USING (true);

-- Course progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false NOT NULL,
  progress_percent integer DEFAULT 0 NOT NULL,
  last_watched_position integer DEFAULT 0 NOT NULL,
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, course_id)
);

ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON course_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON course_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON course_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Town halls table
CREATE TABLE IF NOT EXISTS town_halls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  video_url text DEFAULT '',
  description text DEFAULT '',
  thumbnail_url text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE town_halls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view town halls"
  ON town_halls FOR SELECT
  TO authenticated
  USING (true);

-- Podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  audio_url_english text DEFAULT '',
  audio_url_spanish text DEFAULT '',
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view podcasts"
  ON podcasts FOR SELECT
  TO authenticated
  USING (true);

-- Tips of the week table
CREATE TABLE IF NOT EXISTS tips_of_week (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  week_number integer NOT NULL,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE tips_of_week ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view tips"
  ON tips_of_week FOR SELECT
  TO authenticated
  USING (true);

-- CBA results table
CREATE TABLE IF NOT EXISTS cba_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_url text NOT NULL,
  notes text DEFAULT '',
  uploaded_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE cba_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own CBA results"
  ON cba_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CBA results"
  ON cba_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_order ON courses(order_number);
CREATE INDEX IF NOT EXISTS idx_resources_course ON resources(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course ON course_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_town_halls_date ON town_halls(date DESC);
CREATE INDEX IF NOT EXISTS idx_podcasts_published ON podcasts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_tips_week ON tips_of_week(week_number DESC);