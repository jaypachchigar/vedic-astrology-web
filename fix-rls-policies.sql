-- Fix RLS policies to allow registration without email confirmation
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can insert own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth charts" ON public.birth_charts;

-- Create new permissive policies for profiles
CREATE POLICY "Allow users to view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Allow users to insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (true);  -- Allow all inserts during registration

CREATE POLICY "Allow users to update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create new permissive policies for birth_charts
CREATE POLICY "Allow users to view own charts"
  ON public.birth_charts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own charts"
  ON public.birth_charts FOR INSERT
  WITH CHECK (true);  -- Allow all inserts during registration

CREATE POLICY "Allow users to update own charts"
  ON public.birth_charts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own charts"
  ON public.birth_charts FOR DELETE
  USING (auth.uid() = user_id);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('profiles', 'birth_charts')
ORDER BY tablename, policyname;
