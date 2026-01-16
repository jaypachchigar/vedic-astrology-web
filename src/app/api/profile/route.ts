import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user from auth header or session
    const authHeader = request.headers.get('authorization');

    // Create admin client with service role key (bypasses RLS and auth)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get user from regular client first
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader?.replace('Bearer ', '')
    );

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('🔍 Loading profile for user:', user.id);

    // Get profile using admin client (bypasses RLS)
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️ No profile found');
        return NextResponse.json({ data: null });
      }
      console.error('❌ Profile load error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Profile loaded');
    return NextResponse.json({ data: profile });

  } catch (error: any) {
    console.error('❌ Profile API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
