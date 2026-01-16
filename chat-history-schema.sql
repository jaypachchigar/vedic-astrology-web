-- Chat History Table for AI Assistant
-- Run this in Supabase SQL Editor

-- Create chat_history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON public.chat_history(user_id);

-- Create index on timestamp for ordering
CREATE INDEX IF NOT EXISTS idx_chat_history_timestamp ON public.chat_history(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own chat history
CREATE POLICY "Users can view own chat history"
  ON public.chat_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own messages
CREATE POLICY "Users can insert own messages"
  ON public.chat_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own messages
CREATE POLICY "Users can update own messages"
  ON public.chat_history
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete their own messages
CREATE POLICY "Users can delete own messages"
  ON public.chat_history
  FOR DELETE
  USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.chat_history TO authenticated;
GRANT ALL ON public.chat_history TO service_role;
