-- Add missing columns to profiles table
-- Run this in Supabase SQL Editor

-- Add city and country columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND table_schema = 'public'
ORDER BY ordinal_position;
