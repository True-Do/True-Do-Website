import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CalendarPage from './calendar';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error || data?.session == null) {
    redirect('/login');
  }

  return <CalendarPage user={data.session.user} />;
}
