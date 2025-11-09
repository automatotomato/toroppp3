/*
  # Create Video Library Schema

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `title_en` (text) - English title
      - `title_es` (text) - Spanish title
      - `description_en` (text) - English description
      - `description_es` (text) - Spanish description
      - `youtube_url` (text) - YouTube video URL
      - `category` (text) - Category: podcast, course, town_hall, tip
      - `duration_minutes` (integer) - Video duration
      - `order_position` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `videos` table
    - Add policy for authenticated users to read videos
*/

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_es text NOT NULL,
  description_en text NOT NULL,
  description_es text NOT NULL,
  youtube_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('podcast', 'course', 'town_hall', 'tip')),
  duration_minutes integer DEFAULT 0,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view videos"
  ON videos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage videos"
  ON videos
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
