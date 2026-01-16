-- COMPLETE DATABASE FIX - Run this ONCE in Supabase SQL Editor
-- This fixes ALL registration issues

-- Step 1: Add missing columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Step 2: Drop old restrictive RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can insert own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth charts" ON public.birth_charts;

-- Step 3: Create new permissive policies for PROFILES
-- Allow INSERT without auth check (needed for registration)
CREATE POLICY "Allow profile insert during registration"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- Allow SELECT for own profile
CREATE POLICY "Allow users to view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow UPDATE for own profile
CREATE POLICY "Allow users to update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Step 4: Create new permissive policies for BIRTH_CHARTS
-- Allow INSERT without auth check (needed for registration)
CREATE POLICY "Allow chart insert during registration"
  ON public.birth_charts FOR INSERT
  WITH CHECK (true);

-- Allow SELECT for own charts
CREATE POLICY "Allow users to view own charts"
  ON public.birth_charts FOR SELECT
  USING (auth.uid() = user_id);

-- Allow UPDATE for own charts
CREATE POLICY "Allow users to update own charts"
  ON public.birth_charts FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow DELETE for own charts
CREATE POLICY "Allow users to delete own charts"
  ON public.birth_charts FOR DELETE
  USING (auth.uid() = user_id);

-- Step 5: Verify everything is working
SELECT 'Columns added:' as status;
SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name IN ('city', 'country');

SELECT 'Policies created:' as status;
SELECT tablename, policyname FROM pg_policies
WHERE tablename IN ('profiles', 'birth_charts')
ORDER BY tablename, policyname;

SELECT 'Setup complete!' as status;
