/*
  # Fix week_number constraint in tips_of_week table

  1. Changes
    - Make week_number column nullable since we're using week_start_date instead
    - Add default value of 0 for backward compatibility
    
  2. Rationale
    - The week_number field is legacy and being phased out in favor of week_start_date
    - Making it nullable allows new tips to be created without specifying week_number
*/

ALTER TABLE tips_of_week 
  ALTER COLUMN week_number DROP NOT NULL,
  ALTER COLUMN week_number SET DEFAULT 0;