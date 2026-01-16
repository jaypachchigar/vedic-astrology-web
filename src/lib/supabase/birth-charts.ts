import { supabase } from './client';

// Type definitions
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  timezone?: string;
  created_at?: string;
  updated_at?: string;
}

// Get user profile
export async function getUserProfile(): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('❌ Not authenticated');
    return null;
  }

  console.log('🔍 Loading profile for user:', user.id);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log('⚠️ No profile found, will create on first save');
      return null;
    }
    console.error('❌ Profile load error:', error);
    throw error;
  }

  console.log('✅ Profile loaded:', data);
  return data;
}

// Update user profile
export async function updateUserProfile(updates: {
  full_name?: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  timezone?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('❌ Not authenticated');
    throw new Error('Not authenticated');
  }

  console.log('💾 Saving profile for user:', user.id);
  console.log('📝 Updates:', updates);

  // Use upsert to insert or update
  // @ts-ignore
  const { data, error } = await (supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'id'
    }) as any)
    .select()
    .single();

  if (error) {
    console.error('❌ Profile save error:', error);
    throw error;
  }

  console.log('✅ Profile saved successfully:', data);
  return data;
}

// Save birth chart
export async function saveBirthChart(chartData: {
  name: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  chart_data: any; // The complete calculation results
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('❌ Not authenticated');
    throw new Error('Not authenticated');
  }

  console.log('💾 Saving birth chart for user:', user.id);

  // Extract structured data from chart_data
  const kundli = chartData.chart_data?.kundli || {};
  const advancedKundli = chartData.chart_data?.advancedKundli || {};
  const planetPositions = chartData.chart_data?.planetPositions?.planets || [];

  // @ts-ignore
  const { data, error } = await (supabase
    .from('birth_charts')
    .insert({
      user_id: user.id,
      chart_name: chartData.name,
      date_of_birth: chartData.date_of_birth,
      time_of_birth: chartData.time_of_birth,
      place_of_birth: chartData.place_of_birth,
      latitude: chartData.latitude,
      longitude: chartData.longitude,
      timezone: chartData.timezone || 'Asia/Kolkata',
      ascendant: kundli.ascendant || null,
      planets: planetPositions || null,
      houses: kundli.houses || null,
      dasha: advancedKundli.vimshottari_dasha || null,
      doshas: advancedKundli.doshas || null,
      is_primary: false,
    }) as any)
    .select()
    .single();

  if (error) {
    console.error('❌ Birth chart save error:', error);
    throw error;
  }

  console.log('✅ Birth chart saved successfully:', data);
  return data;
}

// Get user's birth charts
export async function getUserBirthCharts() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('❌ Not authenticated');
    return [];
  }

  const { data, error } = await supabase
    .from('birth_charts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error loading birth charts:', error);
    throw error;
  }

  console.log('✅ Loaded', data?.length || 0, 'birth charts');
  return data || [];
}
