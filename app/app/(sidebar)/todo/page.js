import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Todo from './todo';

// let cache = {};

export default async function PrivatePage({ req, res }) {
  // const cacheKey = 'todos_and_categories';
  // const cachedData = cache[cacheKey];

  // if (cachedData) {
  //   console.log('Serving from cache');
  //   return <Todo {...cachedData} />;
  // }

  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || data?.session == null) {
    redirect('/login');
  }

  const { data: todos, error: todosError } = await supabase
    .from('todo')
    .select()
    .eq('user_id', data.session.user.id);

  const { data: categories, error: categoriesError } = await supabase
    .from('todo_category')
    .select()
    .eq('user_id', data.session.user.id);

  if (todosError || categoriesError) {
    // TODO Implement error page
    console.error('Error fetching notes:', todosError);
    return <div>Error loading notes</div>;
  }

  // Cache the data
  // cache[cacheKey] = {
  //   user: data.session.user,
  //   initial: todos,
  //   initialCategories: categories,
  // };

  // // Set a timeout to clear the cache after a certain period (e.g., 60 seconds)
  // setTimeout(() => {
  //   delete cache[cacheKey];
  // }, 60000); // 60 seconds

  return (
    <Todo
      user={data.session.user}
      initial={todos}
      initialCategories={categories}
    />
  );
}
