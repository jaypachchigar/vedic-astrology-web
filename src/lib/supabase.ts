import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for your database tables (add more as needed)
export type Profile = {
  id: string;
  email: string;
  full_name: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
};

export type BirthChart = {
  id: string;
  user_id: string;
  chart_data: any;
  created_at: string;
};
