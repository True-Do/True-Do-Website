import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import CalendarPage from './calendar';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const { dbdata, dberror } = await supabase.from('todo');
  console.log(dbdata);

  return <CalendarPage user={data.user} initial={dbdata} />;
}
