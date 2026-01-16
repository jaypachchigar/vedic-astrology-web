-- AI Training and Learning System Schema (Without Vector)
-- Run this in Supabase SQL Editor

-- Table to store all user questions and AI responses for training
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Question details
  question TEXT NOT NULL,
  question_category TEXT, -- e.g., 'career', 'health', 'relationships', 'general'
  -- question_embedding VECTOR(1536), -- Removed - requires pgvector extension

  -- User context at time of question
  user_moon_sign TEXT,
  user_ascendant TEXT,
  user_birth_date DATE,
  user_birth_time TIME,
  user_current_dasha TEXT,
  user_location_lat DOUBLE PRECISION,
  user_location_lon DOUBLE PRECISION,

  -- AI response
  response TEXT NOT NULL,
  response_source TEXT, -- 'generated', 'template', 'learned'
  confidence_score DOUBLE PRECISION DEFAULT 0.5, -- 0.0 to 1.0

  -- Astrological calculations used
  transits_at_time JSONB, -- Current planetary transits when asked
  relevant_yogas TEXT[], -- Yogas that influenced the answer
  relevant_dashas TEXT[], -- Dashas considered in answer

  -- Feedback and learning
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  user_feedback TEXT,
  was_helpful BOOLEAN,
  follow_up_questions TEXT[], -- Related questions user asked after

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  -- Search and indexing
  tokens TEXT[] -- Keywords extracted from question for faster search
);

-- Table to store learned patterns and templates
CREATE TABLE IF NOT EXISTS public.ai_learned_patterns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Pattern information
  pattern_type TEXT NOT NULL, -- 'moon_sign_question', 'dasha_question', 'transit_question', etc.
  astrological_context JSONB NOT NULL, -- The astrological configuration this applies to

  -- Question pattern
  question_pattern TEXT NOT NULL, -- Regex or template matching question types
  question_keywords TEXT[] NOT NULL, -- Keywords that trigger this pattern

  -- Response template
  response_template TEXT NOT NULL, -- Template for generating response
  response_variables TEXT[], -- Variables to fill in template

  -- Learning statistics
  times_used INTEGER DEFAULT 0,
  success_rate DOUBLE PRECISION DEFAULT 0.0, -- Based on user ratings
  average_rating DOUBLE PRECISION,
  last_used_at TIMESTAMP WITH TIME ZONE,

  -- Quality metrics
  confidence_score DOUBLE PRECISION DEFAULT 0.5,
  is_verified BOOLEAN DEFAULT FALSE, -- Manually verified by expert

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Table to store birth chart insights for quick lookup
CREATE TABLE IF NOT EXISTS public.ai_chart_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Birth chart data
  moon_sign TEXT NOT NULL,
  moon_nakshatra TEXT,
  ascendant TEXT,
  sun_sign TEXT,

  -- Planetary positions
  planet_positions JSONB NOT NULL, -- All planets with houses, signs, degrees

  -- Yogas and combinations
  major_yogas TEXT[] NOT NULL, -- Raja Yoga, Dhana Yoga, etc.
  dosha_analysis JSONB, -- Mangal Dosha, Kaal Sarp, etc.

  -- Dasha periods
  current_maha_dasha TEXT NOT NULL,
  current_antar_dasha TEXT NOT NULL,
  current_pratyantar_dasha TEXT,
  dasha_timeline JSONB, -- Complete Vimshottari timeline

  -- Strengths and weaknesses
  strong_houses TEXT[],
  weak_houses TEXT[],
  exalted_planets TEXT[],
  debilitated_planets TEXT[],

  -- Life predictions (cached)
  career_prediction TEXT,
  finance_prediction TEXT,
  relationships_prediction TEXT,
  health_prediction TEXT,

  -- Calculation metadata
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  is_current BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Table to store semantic question clusters
CREATE TABLE IF NOT EXISTS public.ai_question_clusters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Cluster information
  cluster_name TEXT NOT NULL,
  cluster_description TEXT,
  representative_questions TEXT[], -- Example questions in this cluster

  -- Astrological relevance
  relevant_to_moon_signs TEXT[], -- Which moon signs ask this most
  relevant_to_houses TEXT[], -- Which houses this relates to
  relevant_to_planets TEXT[], -- Which planets this relates to

  -- Response strategy
  answer_approach TEXT, -- How to answer questions in this cluster
  required_calculations TEXT[], -- What calculations are needed

  -- Statistics
  question_count INTEGER DEFAULT 0,
  average_satisfaction DOUBLE PRECISION,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_category ON public.ai_conversations(question_category);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON public.ai_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_moon_sign ON public.ai_conversations(user_moon_sign);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_rating ON public.ai_conversations(user_rating DESC);

CREATE INDEX IF NOT EXISTS idx_ai_learned_patterns_type ON public.ai_learned_patterns(pattern_type);
CREATE INDEX IF NOT EXISTS idx_ai_learned_patterns_success ON public.ai_learned_patterns(success_rate DESC);

CREATE INDEX IF NOT EXISTS idx_ai_chart_insights_user_id ON public.ai_chart_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chart_insights_current ON public.ai_chart_insights(is_current);

-- Full text search on questions
CREATE INDEX IF NOT EXISTS idx_ai_conversations_question_fts
  ON public.ai_conversations
  USING gin(to_tsvector('english', question));

-- Enable Row Level Security
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_learned_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chart_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_question_clusters ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_conversations
CREATE POLICY "Users can view own conversations"
  ON public.ai_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON public.ai_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON public.ai_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_learned_patterns (read-only for users, write for service)
CREATE POLICY "Anyone can view patterns"
  ON public.ai_learned_patterns
  FOR SELECT
  USING (true);

-- RLS Policies for ai_chart_insights
CREATE POLICY "Users can view own insights"
  ON public.ai_chart_insights
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights"
  ON public.ai_chart_insights
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own insights"
  ON public.ai_chart_insights
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_question_clusters (read-only)
CREATE POLICY "Anyone can view clusters"
  ON public.ai_question_clusters
  FOR SELECT
  USING (true);

-- Grant permissions
GRANT ALL ON public.ai_conversations TO authenticated;
GRANT ALL ON public.ai_learned_patterns TO authenticated;
GRANT ALL ON public.ai_chart_insights TO authenticated;
GRANT ALL ON public.ai_question_clusters TO authenticated;

GRANT ALL ON public.ai_conversations TO service_role;
GRANT ALL ON public.ai_learned_patterns TO service_role;
GRANT ALL ON public.ai_chart_insights TO service_role;
GRANT ALL ON public.ai_question_clusters TO service_role;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON public.ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_learned_patterns_updated_at BEFORE UPDATE ON public.ai_learned_patterns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_chart_insights_updated_at BEFORE UPDATE ON public.ai_chart_insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_question_clusters_updated_at BEFORE UPDATE ON public.ai_question_clusters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-categorize questions
CREATE OR REPLACE FUNCTION categorize_question(question_text TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Simple keyword-based categorization
  IF question_text ~* 'career|job|work|business|profession' THEN
    RETURN 'career';
  ELSIF question_text ~* 'health|disease|illness|medical|body' THEN
    RETURN 'health';
  ELSIF question_text ~* 'love|marriage|relationship|partner|spouse' THEN
    RETURN 'relationships';
  ELSIF question_text ~* 'money|wealth|finance|income|profit' THEN
    RETURN 'finance';
  ELSIF question_text ~* 'education|study|exam|learning|knowledge' THEN
    RETURN 'education';
  ELSIF question_text ~* 'spiritual|meditation|god|divine|moksha' THEN
    RETURN 'spiritual';
  ELSIF question_text ~* 'family|parent|child|sibling' THEN
    RETURN 'family';
  ELSE
    RETURN 'general';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to extract keywords from question
CREATE OR REPLACE FUNCTION extract_keywords(question_text TEXT)
RETURNS TEXT[] AS $$
DECLARE
  common_words TEXT[] := ARRAY['is', 'are', 'was', 'were', 'will', 'shall', 'can', 'could', 'should', 'would', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'my', 'me', 'i', 'you', 'he', 'she', 'it', 'we', 'they'];
  words TEXT[];
  keywords TEXT[] := '{}';
  word TEXT;
BEGIN
  -- Split question into words and filter
  words := regexp_split_to_array(lower(question_text), '\s+');

  FOREACH word IN ARRAY words
  LOOP
    -- Remove punctuation
    word := regexp_replace(word, '[^a-z0-9]', '', 'g');

    -- Add if not common word and length > 3
    IF length(word) > 3 AND NOT (word = ANY(common_words)) THEN
      keywords := array_append(keywords, word);
    END IF;
  END LOOP;

  RETURN keywords;
END;
$$ LANGUAGE plpgsql;

-- View for analytics
CREATE OR REPLACE VIEW public.ai_conversation_analytics AS
SELECT
  question_category,
  user_moon_sign,
  COUNT(*) as question_count,
  AVG(user_rating) as avg_rating,
  AVG(confidence_score) as avg_confidence,
  COUNT(CASE WHEN was_helpful = true THEN 1 END) as helpful_count,
  COUNT(CASE WHEN was_helpful = false THEN 1 END) as not_helpful_count
FROM public.ai_conversations
WHERE user_rating IS NOT NULL
GROUP BY question_category, user_moon_sign;

-- Comments
COMMENT ON TABLE public.ai_conversations IS 'Stores all user questions and AI responses for training and improvement';
COMMENT ON TABLE public.ai_learned_patterns IS 'Learned response patterns based on successful interactions';
COMMENT ON TABLE public.ai_chart_insights IS 'Cached birth chart insights for quick AI responses';
COMMENT ON TABLE public.ai_question_clusters IS 'Semantic clusters of similar questions for better routing';
COMMENT ON COLUMN public.ai_conversations.confidence_score IS 'AI confidence in the response (0.0-1.0)';
COMMENT ON COLUMN public.ai_learned_patterns.success_rate IS 'Percentage of positive ratings for this pattern';
