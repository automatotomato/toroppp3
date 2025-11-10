/*
  # Remove Unused Index

  1. Changes
    - Drop unused index idx_payments_status on payments table
    - This index has not been used and adds unnecessary overhead

  2. Performance
    - Reduces storage overhead
    - Improves write performance on payments table
*/

DROP INDEX IF EXISTS idx_payments_status;
