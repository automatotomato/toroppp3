/*
  # Create AI Tools Content Storage Schema

  ## New Tables
    - `ai_generated_content`
      - `id` (uuid, primary key) - Unique identifier for each generated content
      - `user_id` (uuid, foreign key) - References auth.users
      - `tool_type` (text) - Type of AI tool used (email, social_media, proposal)
      - `input_data` (jsonb) - Stores user input parameters
      - `generated_content` (text) - The AI-generated content
      - `is_favorited` (boolean) - Whether user has favorited this content
      - `is_archived` (boolean) - Whether content is archived
      - `created_at` (timestamptz) - When content was generated
      - `updated_at` (timestamptz) - When content was last modified

  ## Security
    - Enable RLS on `ai_generated_content` table
    - Add policies for authenticated users to manage their own content
*/

-- Create ai_generated_content table
CREATE TABLE IF NOT EXISTS ai_generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_type text NOT NULL CHECK (tool_type IN ('email', 'social_media', 'proposal')),
  input_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  generated_content text NOT NULL,
  is_favorited boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_content_user_id ON ai_generated_content(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_content_tool_type ON ai_generated_content(tool_type);
CREATE INDEX IF NOT EXISTS idx_ai_content_created_at ON ai_generated_content(created_at DESC);

-- Enable RLS
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users to read their own content
CREATE POLICY "Users can view own AI content"
  ON ai_generated_content
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for inserting content
CREATE POLICY "Users can create own AI content"
  ON ai_generated_content
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating content
CREATE POLICY "Users can update own AI content"
  ON ai_generated_content
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for deleting content
CREATE POLICY "Users can delete own AI content"
  ON ai_generated_content
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS ai_content_updated_at ON ai_generated_content;
CREATE TRIGGER ai_content_updated_at
  BEFORE UPDATE ON ai_generated_content
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_content_updated_at();
