import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Todo from './todo';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const { data: todos, error: todosError } = await supabase
    .from('todo')
    .select()
    .eq('user_id', data.user.id);

  const { data: categories, error: categoriesError } = await supabase
    .from('todo_category')
    .select()
    .eq('user_id', data.user.id);

  if (todosError || categoriesError) {
    // TODO Implement error page
    console.error('Error fetching notes:', todosError);
    return <div>Error loading notes</div>;
  }

  return (
    <Todo user={data.user} initial={todos} initialCategories={categories} />
  );
}
