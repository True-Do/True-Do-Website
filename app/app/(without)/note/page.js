import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Note from './note';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <Note user={data.user} />;
}
