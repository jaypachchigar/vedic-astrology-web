import { supabase } from './client';

/**
 * Get user profile - works even without email confirmation
 * Fetches directly from database using user ID
 */
export async function getUserProfileClient() {
  try {
    // Get user ID from auth (works even if email not confirmed)
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('⚠️ No user found');
      return null;
    }

    console.log('🔍 Loading profile for user:', user.id);

    // Fetch profile directly from database
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle() as { data: any; error: any };

    if (error) {
      console.error('❌ Profile load error:', error);
      return null;
    }

    if (!data) {
      console.log('⚠️ No profile found for user');
      return null;
    }

    console.log('✅ Profile loaded:', data?.full_name);
    return data;

  } catch (error) {
    console.error('❌ Error in getUserProfileClient:', error);
    return null;
  }
}
