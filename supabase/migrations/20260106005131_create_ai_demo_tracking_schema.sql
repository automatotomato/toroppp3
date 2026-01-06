/*
  # AI Demo Tracking Schema

  1. New Tables
    - `ai_demo_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `session_id` (uuid) - Browser session identifier for grouping
      - `demo_type` (text) - Type of demo: receipt, invoice, or apar
      - `file_size` (integer) - Size of uploaded file in bytes
      - `processing_time_ms` (integer) - Time taken to process in milliseconds
      - `success` (boolean) - Whether processing succeeded
      - `created_at` (timestamptz) - When demo was run
      - `ip_address` (text) - For rate limiting (nullable)
      - `user_agent` (text) - Browser user agent (nullable)
    
    - `ai_demo_analytics`
      - `id` (uuid, primary key)
      - `date` (date) - Analytics date
      - `demo_type` (text) - Type of demo
      - `total_sessions` (integer) - Total number of sessions
      - `avg_processing_time_ms` (integer) - Average processing time
      - `success_rate` (decimal) - Success rate percentage
      - `unique_visitors` (integer) - Number of unique visitors
      - `created_at` (timestamptz) - When record was created

  2. Security
    - Enable RLS on both tables
    - Allow anonymous users to insert demo sessions (for tracking)
    - Allow anonymous users to read analytics (for display)
    - Restrict updates and deletes to service role only

  3. Indexes
    - Index on created_at for efficient time-based queries
    - Index on demo_type for analytics grouping
    - Index on ip_address for rate limiting checks
    - Composite index on date and demo_type for analytics
*/

-- Create ai_demo_sessions table
CREATE TABLE IF NOT EXISTS ai_demo_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  demo_type text NOT NULL CHECK (demo_type IN ('receipt', 'invoice', 'apar')),
  file_size integer,
  processing_time_ms integer,
  success boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Create ai_demo_analytics table
CREATE TABLE IF NOT EXISTS ai_demo_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  demo_type text NOT NULL CHECK (demo_type IN ('receipt', 'invoice', 'apar')),
  total_sessions integer DEFAULT 0,
  avg_processing_time_ms integer DEFAULT 0,
  success_rate decimal(5,2) DEFAULT 0.00,
  unique_visitors integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(date, demo_type)
);

-- Enable RLS
ALTER TABLE ai_demo_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_demo_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for ai_demo_sessions
CREATE POLICY "Anyone can insert demo sessions"
  ON ai_demo_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read demo sessions"
  ON ai_demo_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for ai_demo_analytics
CREATE POLICY "Anyone can read analytics"
  ON ai_demo_analytics
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_demo_sessions_created_at ON ai_demo_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_demo_sessions_demo_type ON ai_demo_sessions(demo_type);
CREATE INDEX IF NOT EXISTS idx_demo_sessions_ip_address ON ai_demo_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_demo_sessions_session_id ON ai_demo_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_demo_analytics_date_type ON ai_demo_analytics(date, demo_type);