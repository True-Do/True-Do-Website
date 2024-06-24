import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Todo from './todo';

export default async function PrivatePage() {
  const startTime = Date.now();
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const endTime = Date.now();
  const timeToFetch = (endTime - startTime) / 1000;

  return <Todo user={data.user} />;
}
