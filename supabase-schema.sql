-- Supabase Database Schema for Vedic Astrology App

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  time_of_birth TIME,
  place_of_birth TEXT,
  city TEXT,
  country TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Birth Charts Table
CREATE TABLE IF NOT EXISTS public.birth_charts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  chart_name TEXT NOT NULL DEFAULT 'My Birth Chart',
  date_of_birth DATE NOT NULL,
  time_of_birth TIME NOT NULL,
  place_of_birth TEXT NOT NULL,
  city TEXT,
  country TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  timezone TEXT,
  ascendant JSONB,
  planets JSONB,
  houses JSONB,
  dasha JSONB,
  doshas JSONB,
  divisional_charts JSONB,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birth_charts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Birth Charts Policies
CREATE POLICY "Users can view own birth charts" ON public.birth_charts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own birth charts" ON public.birth_charts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own birth charts" ON public.birth_charts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own birth charts" ON public.birth_charts FOR DELETE USING (auth.uid() = user_id);
