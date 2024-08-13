'use server';

import { createClient } from '@/utils/supabase/server';
import Home from './home';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    data.user = null;
  }

  return <Home user={data.user} />;
}
