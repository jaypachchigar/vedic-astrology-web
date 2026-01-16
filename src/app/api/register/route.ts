import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, profileData, chartData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Create admin client with service role key (bypasses RLS)
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

    console.log('💾 Saving profile for user:', userId);

    // Save profile (bypasses RLS with admin client)
    // @ts-ignore
    const { data: profileResult, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: userEmail,
        ...profileData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      })
      .select()
      .single();

    if (profileError) {
      console.error('❌ Profile save error:', profileError);
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    console.log('✅ Profile saved');

    // Save birth chart if provided
    if (chartData) {
      console.log('💾 Saving birth chart...');

      // @ts-ignore
      const { error: chartError } = await supabaseAdmin
        .from('birth_charts')
        .insert({
          user_id: userId,
          ...chartData
        });

      if (chartError) {
        console.error('❌ Chart save error:', chartError);
        // Don't fail if chart save fails
      } else {
        console.log('✅ Birth chart saved');
      }
    }

    return NextResponse.json({ success: true, data: profileResult });

  } catch (error: any) {
    console.error('❌ Registration API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
