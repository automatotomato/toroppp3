/*
  # Add Index for Foreign Key

  1. Index Creation
    - Create index on `payments.user_id` to cover the foreign key constraint
    - This improves query performance for:
      - JOIN operations between payments and auth.users
      - Foreign key constraint validation
      - Queries filtering by user_id
    - Prevents table scans when checking referential integrity

  2. Performance Impact
    - Faster lookups when querying payments by user
    - Improved performance for CASCADE operations
    - Better query optimization for JOIN operations
*/

CREATE INDEX IF NOT EXISTS payments_user_id_idx ON public.payments(user_id);