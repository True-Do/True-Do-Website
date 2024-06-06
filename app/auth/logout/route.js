import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
  const supabase = createClient();

  await supabase.auth.signOut();

  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = '/';
  return NextResponse.redirect(redirectTo);
}
