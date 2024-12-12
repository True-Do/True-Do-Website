import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Notes from './notes';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error || data?.session == null) {
    redirect('/login');
  }

  return <Notes user={data.session.user} />;
}
