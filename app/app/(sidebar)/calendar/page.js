import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import CalendarPage from './calendar';

export default async function PrivatePage() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const { data: calendar, error: calendarError } = await supabase
    .from('calendar')
    .select()
    .eq('user_id', data.user.id);

  if (calendarError) {
    // TODO Implement error page
    console.error('Error fetching notes:', todosError);
    return <div>Error loading notes</div>;
  }

  if (error || !data?.user) {
    redirect('/login');
  }

  return <CalendarPage user={data.user} initial={calendar} />;
}
