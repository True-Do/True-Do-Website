import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import Note from './note';

export default async function PrivatePage() {
  const headersList = headers();
  const currentUrl = headersList.get('x-invoke-path'); // This contains the current URL path
  const fullUrl = new URL(currentUrl, `https://${headersList.get('host')}`);
  const searchParams = new URLSearchParams(fullUrl.search);
  const id = searchParams.get('id') || 'default';

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  if (!id == 'new') {
    const { data: note, error: noteError } = await supabase
      .from('note')
      .select()
      .eq('user_id', data.user.id)
      .eq('id', id)
      .single();

    if (noteError) {
      // TODO Implement error page
      console.error('Error fetching notes:', noteError);
      return <div>Error loading notes</div>;
    }
    return <Note user={data.user} initial={note} />;
  }
  return <Note user={data.user} />;
}
