import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const getSupabaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  return url;
};

const getSupabaseAnonKey = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }
  return key;
};

export function createClient() {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  );
}

// Lazy initialization for simple client (only created when first accessed)
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(target, prop) {
    if (!supabaseInstance) {
      supabaseInstance = createSupabaseClient(
        getSupabaseUrl(),
        getSupabaseAnonKey()
      );
    }
    return (supabaseInstance as any)[prop];
  }
});
