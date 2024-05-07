import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Todo from './todo';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <Todo user={data.user} />;
}
