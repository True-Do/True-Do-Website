import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Notes from './notes';

export default async function PrivatePage() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: notes, error: notesError } = await supabase
    .from('note')
    .select()
    .eq('user_id', data.user.id);

  if (notesError) {
    // TODO Implement error page
    console.error('Error fetching notes:', todosError);
    return <div>Error loading notes</div>;
  }

  return <Notes user={data.user} initial={notes} />;
}
