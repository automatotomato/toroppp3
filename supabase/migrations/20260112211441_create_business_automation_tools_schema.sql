/*
  # Create Business Automation Tools Schema
  
  ## Overview
  This migration creates the complete database schema for three high-value business automation tools:
  Receipt & Expense Scanner, Sales Call Analyzer, and Document Compliance Checker.
  
  ## 1. New Tables
  
  ### receipts
  Stores uploaded receipt information and extracted data
  - `id` (uuid, primary key) - Unique identifier for each receipt
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `image_url` (text) - Storage path to receipt image/PDF
  - `original_filename` (text) - Original name of uploaded file
  - `upload_date` (timestamptz) - When receipt was uploaded
  - `extracted_data` (jsonb) - Extracted information (amount, date, vendor, category, tax, payment method)
  - `manual_corrections` (jsonb) - User's manual edits to extracted data
  - `verification_status` (text) - Processing status: pending, processing, completed, failed
  - `notes` (text) - User's additional notes
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### sales_calls
  Stores sales call transcripts and AI analysis results
  - `id` (uuid, primary key) - Unique identifier for each call
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `call_title` (text) - User-provided title for the call
  - `transcript_text` (text) - Full transcript of the sales call
  - `upload_date` (timestamptz) - When transcript was uploaded
  - `analysis_results` (jsonb) - AI analysis results (opportunities, improvements, talk ratio, sentiment)
  - `overall_score` (integer) - Overall call quality score (0-100)
  - `tags` (text[]) - Categorization tags (service types, etc.)
  - `processing_status` (text) - Status: pending, processing, completed, failed
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### compliance_checks
  Stores tax document compliance check results
  - `id` (uuid, primary key) - Unique identifier for each check
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `document_url` (text) - Storage path to PDF document
  - `original_filename` (text) - Original name of uploaded file
  - `document_type` (text) - Type of tax form (1040, Schedule C, etc.)
  - `upload_date` (timestamptz) - When document was uploaded
  - `check_results` (jsonb) - Compliance check results (issues, severity, recommendations)
  - `compliance_score` (integer) - Overall compliance score (0-100)
  - `review_status` (text) - Status: pending, processing, completed, failed
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## 2. Storage Buckets
  Creates storage buckets for receipt images and tax documents
  
  ## 3. Security
  - Enable RLS on all new tables
  - Users can only access their own data
  - Create policies for SELECT, INSERT, UPDATE, DELETE operations
  - Set up storage bucket policies for secure file access
  
  ## 4. Indexes
  - Add indexes on user_id, upload_date, and other frequently queried columns for performance
  
  ## 5. Updated Constraints
  - Update ai_generated_content table to include new tool types
*/

-- Create receipts table
CREATE TABLE IF NOT EXISTS receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  original_filename text NOT NULL,
  upload_date timestamptz DEFAULT now() NOT NULL,
  extracted_data jsonb DEFAULT '{}'::jsonb,
  manual_corrections jsonb DEFAULT '{}'::jsonb,
  verification_status text DEFAULT 'pending' NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_verification_status CHECK (verification_status IN ('pending', 'processing', 'completed', 'failed'))
);

-- Create sales_calls table
CREATE TABLE IF NOT EXISTS sales_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  call_title text NOT NULL,
  transcript_text text NOT NULL,
  upload_date timestamptz DEFAULT now() NOT NULL,
  analysis_results jsonb DEFAULT '{}'::jsonb,
  overall_score integer DEFAULT 0,
  tags text[] DEFAULT ARRAY[]::text[],
  processing_status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_processing_status CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  CONSTRAINT valid_overall_score CHECK (overall_score >= 0 AND overall_score <= 100)
);

-- Create compliance_checks table
CREATE TABLE IF NOT EXISTS compliance_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_url text NOT NULL,
  original_filename text NOT NULL,
  document_type text NOT NULL,
  upload_date timestamptz DEFAULT now() NOT NULL,
  check_results jsonb DEFAULT '{}'::jsonb,
  compliance_score integer DEFAULT 0,
  review_status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_review_status CHECK (review_status IN ('pending', 'processing', 'completed', 'failed')),
  CONSTRAINT valid_compliance_score CHECK (compliance_score >= 0 AND compliance_score <= 100)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_receipts_user_id ON receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_receipts_upload_date ON receipts(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_receipts_verification_status ON receipts(verification_status);

CREATE INDEX IF NOT EXISTS idx_sales_calls_user_id ON sales_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_calls_upload_date ON sales_calls(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_calls_overall_score ON sales_calls(overall_score);
CREATE INDEX IF NOT EXISTS idx_sales_calls_processing_status ON sales_calls(processing_status);

CREATE INDEX IF NOT EXISTS idx_compliance_checks_user_id ON compliance_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_compliance_checks_upload_date ON compliance_checks(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_compliance_checks_document_type ON compliance_checks(document_type);
CREATE INDEX IF NOT EXISTS idx_compliance_checks_review_status ON compliance_checks(review_status);

-- Enable Row Level Security
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_checks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for receipts table
CREATE POLICY "Users can view own receipts"
  ON receipts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own receipts"
  ON receipts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receipts"
  ON receipts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own receipts"
  ON receipts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for sales_calls table
CREATE POLICY "Users can view own sales calls"
  ON sales_calls FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sales calls"
  ON sales_calls FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sales calls"
  ON sales_calls FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sales calls"
  ON sales_calls FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for compliance_checks table
CREATE POLICY "Users can view own compliance checks"
  ON compliance_checks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own compliance checks"
  ON compliance_checks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own compliance checks"
  ON compliance_checks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own compliance checks"
  ON compliance_checks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update ai_generated_content table constraint to include new tool types
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'ai_generated_content'
  ) THEN
    ALTER TABLE ai_generated_content 
    DROP CONSTRAINT IF EXISTS valid_tool_type;
    
    ALTER TABLE ai_generated_content
    ADD CONSTRAINT valid_tool_type 
    CHECK (tool_type IN ('email', 'social_media', 'proposal', 'receipt_scanner', 'call_analyzer', 'compliance_checker'));
  END IF;
END $$;

-- Create storage buckets (note: these are created via SQL for documentation, 
-- but actual bucket creation happens through Supabase Storage API)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('receipt-images', 'receipt-images', false, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('tax-documents', 'tax-documents', false, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for receipt-images bucket
CREATE POLICY "Users can upload own receipt images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'receipt-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own receipt images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'receipt-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own receipt images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'receipt-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policies for tax-documents bucket
CREATE POLICY "Users can upload own tax documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'tax-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own tax documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'tax-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own tax documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'tax-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );