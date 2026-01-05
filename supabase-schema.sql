-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  time_of_birth TIME,
  place_of_birth TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Birth charts table
CREATE TABLE IF NOT EXISTS birth_charts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME NOT NULL,
  place_of_birth TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  chart_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Numerology readings table
CREATE TABLE IF NOT EXISTS numerology_readings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  life_path_number INTEGER,
  expression_number INTEGER,
  soul_urge_number INTEGER,
  personality_number INTEGER,
  personal_year_number INTEGER,
  reading_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vastu analyses table
CREATE TABLE IF NOT EXISTS vastu_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_name TEXT NOT NULL,
  property_type TEXT,
  analysis_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI chat history table
CREATE TABLE IF NOT EXISTS ai_chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  messages JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE numerology_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vastu_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for birth_charts
CREATE POLICY "Users can view own birth charts"
  ON birth_charts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own birth charts"
  ON birth_charts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own birth charts"
  ON birth_charts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own birth charts"
  ON birth_charts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for numerology_readings
CREATE POLICY "Users can view own numerology readings"
  ON numerology_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own numerology readings"
  ON numerology_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for vastu_analyses
CREATE POLICY "Users can view own vastu analyses"
  ON vastu_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vastu analyses"
  ON vastu_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vastu analyses"
  ON vastu_analyses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vastu analyses"
  ON vastu_analyses FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_chats
CREATE POLICY "Users can view own ai chats"
  ON ai_chats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ai chats"
  ON ai_chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ai chats"
  ON ai_chats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ai chats"
  ON ai_chats FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_birth_charts_updated_at
  BEFORE UPDATE ON birth_charts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vastu_analyses_updated_at
  BEFORE UPDATE ON vastu_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_chats_updated_at
  BEFORE UPDATE ON ai_chats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
