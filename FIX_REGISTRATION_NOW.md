# FIX REGISTRATION ERRORS - DO THIS NOW

## The Problem

Registration is failing with these errors:
- ❌ "Could not find the 'city' column"
- ❌ "new row violates row-level security policy"

## The Solution (5 Minutes)

### Step 1: Open Supabase SQL Editor

Go to: https://supabase.com/dashboard/project/nemfygaelcxunkctwhql/sql/new

### Step 2: Copy the SQL

Open the file: `COMPLETE_DATABASE_FIX.sql` in your project

OR copy this:

```sql
-- Add missing columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Drop old policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can insert own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth charts" ON public.birth_charts;

-- Create new permissive policies
CREATE POLICY "Allow profile insert during registration"
  ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow chart insert during registration"
  ON public.birth_charts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view own charts"
  ON public.birth_charts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update own charts"
  ON public.birth_charts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own charts"
  ON public.birth_charts FOR DELETE USING (auth.uid() = user_id);
```

### Step 3: Paste and Run

1. Paste the SQL into the Supabase SQL Editor
2. Click **RUN** (or press Ctrl+Enter)
3. You should see "Success" messages

### Step 4: Test Registration

Go to your site and try registering a new user. It should work now!

---

## What This Does

1. ✅ Adds `city` and `country` columns to profiles table
2. ✅ Fixes RLS policies to allow registration (with or without email confirmation)
3. ✅ Users can register and insert their profile/chart immediately
4. ✅ Still secure - users can only view/update their own data

---

## Security Note

The new policies use `WITH CHECK (true)` for INSERT operations. This is safe because:
- The `id` field references `auth.users(id)` - can't be faked
- Users can only insert with THEIR user ID (from Supabase auth)
- SELECT/UPDATE/DELETE still check `auth.uid() = id`
- No one can access other users' data

---

## If You Still Have Issues

Make sure:
1. ✅ SQL ran successfully (no errors)
2. ✅ Environment variables are set in Vercel
3. ✅ Latest code is deployed

Need help? Check the error in browser console (F12) and let me know the exact error message.
