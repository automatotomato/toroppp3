/*
  # Add Unlock Date to Courses and Create Events Table

  1. Changes to `courses` table
    - Add `unlock_date` column to track when courses become available
    - Add `category` and `difficulty` columns for better organization
    - Add `lessons` column to track number of lessons

  2. New Table: `events`
    - `id` (uuid, primary key)
    - `title` (text) - Event title
    - `description` (text) - Event description
    - `event_date` (timestamptz) - When the event occurs
    - `event_time` (text) - Time display (e.g., "11 AM PST")
    - `event_type` (text) - "course" or "townhall"
    - `is_live` (boolean) - Whether recording is available
    - `thumbnail` (text) - Event thumbnail image
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  3. Security
    - Enable RLS on events table
    - Add policies for authenticated users to read events

  4. Initial Data
    - Populate courses with unlock dates
    - Insert upcoming events for Dec 2025 - Mar 2026
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'unlock_date'
  ) THEN
    ALTER TABLE courses ADD COLUMN unlock_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'category'
  ) THEN
    ALTER TABLE courses ADD COLUMN category text DEFAULT 'General';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE courses ADD COLUMN difficulty text DEFAULT 'Beginner';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'lessons'
  ) THEN
    ALTER TABLE courses ADD COLUMN lessons integer DEFAULT 1;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  event_time text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('course', 'townhall')),
  is_live boolean DEFAULT false,
  thumbnail text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'events' AND policyname = 'Authenticated users can view events'
  ) THEN
    CREATE POLICY "Authenticated users can view events"
      ON events FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_courses_unlock_date ON courses(unlock_date);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);

INSERT INTO courses (title, short_title, description, unlock_date, order_number, duration_minutes, category, difficulty, lessons, thumbnail_url)
VALUES
  ('Onboarding - Welcome to Advancement Academy', 'Onboarding Session', 'Get started with your journey to Achieve Success Faster. Learn about the program structure, resources, and how to maximize your experience.', '2025-12-16 19:00:00+00', 1, 120, 'Orientation', 'Beginner', 1, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Mastering Cashflow and Profitability', 'Cashflow Mastery', 'Learn the fundamentals of cash flow management and strategies to improve profitability in your franchise.', '2026-01-13 19:00:00+00', 2, 120, 'Financial', 'Intermediate', 1, 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Financial Literacy for Franchise Owners', 'Financial Literacy', 'Master financial statements, KPIs, and metrics critical to franchise success.', '2026-02-12 19:00:00+00', 3, 120, 'Financial', 'Intermediate', 1, 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Building High-Performance Sales Systems', 'Sales Systems', 'Develop sales strategies and systems that consistently drive revenue growth.', '2026-03-10 19:00:00+00', 4, 120, 'Growth', 'Advanced', 1, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Marketing Strategies That Work', 'Marketing Strategies', 'Discover proven marketing tactics to attract and retain high-value clients.', '2026-04-14 19:00:00+00', 5, 120, 'Growth', 'Intermediate', 1, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Client Retention Mastery', 'Client Retention', 'Build lasting relationships and create systems that keep clients coming back.', '2026-05-12 19:00:00+00', 6, 120, 'Growth', 'Intermediate', 1, 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Operational Excellence', 'Operations', 'Streamline operations with efficient processes and automation strategies.', '2026-06-09 19:00:00+00', 7, 120, 'Operations', 'Intermediate', 1, 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Team Building & Leadership', 'Leadership', 'Develop leadership skills and build high-performing teams.', '2026-07-14 19:00:00+00', 8, 120, 'Leadership', 'Advanced', 1, 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Tax Law Updates & Compliance', 'Tax Compliance', 'Stay current with tax law changes and ensure compliance.', '2026-08-11 19:00:00+00', 9, 120, 'Operations', 'Intermediate', 1, 'https://images.pexels.com/photos/7876050/pexels-photo-7876050.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Digital Marketing & Social Media', 'Digital Marketing', 'Leverage digital channels to expand reach and attract new clients.', '2026-09-08 19:00:00+00', 10, 120, 'Growth', 'Beginner', 1, 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Scaling Your Practice', 'Scaling', 'Strategies to scale your franchise from single to multiple locations.', '2026-10-13 19:00:00+00', 11, 120, 'Leadership', 'Advanced', 1, 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Year-Round Revenue Strategies', 'Revenue Strategies', 'Transform seasonal business into year-round revenue generation.', '2026-11-10 19:00:00+00', 12, 120, 'Financial', 'Advanced', 1, 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (title, description, event_date, event_time, event_type, is_live, thumbnail)
VALUES
  ('Onboarding - Welcome to Advancement Academy', 'Live Town Hall Q & A - Your journey to success begins here.', '2025-12-16 19:00:00+00', '11 AM PST', 'townhall', false, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Mastering Cashflow and Profitability', 'Workshop course on cash flow management and profitability strategies.', '2026-01-13 19:00:00+00', '11 AM PST', 'course', false, 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Live Town Hall Q & A', 'Monthly town hall session with leadership Q&A.', '2026-01-27 19:00:00+00', '11 AM PST', 'townhall', false, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Financial Literacy for Franchise Owners', 'Workshop course on financial literacy and metrics.', '2026-02-12 19:00:00+00', '11 AM PST', 'course', false, 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Live Town Hall Q & A', 'Monthly town hall session with leadership Q&A.', '2026-02-26 19:00:00+00', '11 AM PST', 'townhall', false, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Building High-Performance Sales Systems', 'Workshop course on building effective sales systems.', '2026-03-10 19:00:00+00', '11 AM PST', 'course', false, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'),
  ('Live Town Hall Q & A', 'Monthly town hall session with leadership Q&A.', '2026-03-24 19:00:00+00', '11 AM PST', 'townhall', false, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT (id) DO NOTHING;