import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Get environment variables with build-time safety
const getSupabaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // During build, use placeholder if not set
  if (!url && typeof window === 'undefined') {
    return 'https://placeholder.supabase.co';
  }
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  return url;
};

const getSupabaseAnonKey = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // During build, use placeholder if not set
  if (!key && typeof window === 'undefined') {
    return 'placeholder-key';
  }
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

// Simple client for client components - lazy initialization
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

function getSupabaseInstance() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(
      getSupabaseUrl(),
      getSupabaseAnonKey(),
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'vedic-astrology-auth',
          storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        },
      }
    );
  }
  return supabaseInstance;
}

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(target, prop) {
    return (getSupabaseInstance() as any)[prop];
  }
});
