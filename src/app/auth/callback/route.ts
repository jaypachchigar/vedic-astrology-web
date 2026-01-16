import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}
