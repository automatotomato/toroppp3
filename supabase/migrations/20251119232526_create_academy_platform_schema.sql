/*
  # Create Advancement Academy Platform Schema

  1. New Tables
    - `profiles` - User profile information
    - `courses` - Course catalog
    - `resources` - Course materials
    - `course_progress` - User progress tracking
    - `town_halls` - Town hall events
    - `podcasts` - Podcast library
    - `tips_of_week` - Weekly tips
    - `cba_results` - CBA results uploads

  2. Security
    - Enable RLS on all tables
    - Restrict access based on authentication and ownership
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