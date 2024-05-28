import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Todo from './todo';

export default async function PrivatePage() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <Todo user={data.user} />;
}
