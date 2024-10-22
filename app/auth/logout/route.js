import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const supabase = createClient();

  await supabase.auth.signOut();

  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = '/';
  revalidatePath('/');
  return NextResponse.redirect(redirectTo);
}
