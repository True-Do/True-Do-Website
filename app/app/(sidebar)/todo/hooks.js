import useSWR from 'swr';
import { createClient } from '@/utils/supabase/client';

const fetcher = async (url) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(url).select();
  if (error) throw error;
  return data;
};

export function useTodos(userId) {
  const { data, error, mutate } = useSWR(
    userId ? `todo?user_id=eq.${userId}` : null,
    fetcher
  );
  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useCategories(userId) {
  const { data, error, mutate } = useSWR(
    userId ? `todo_category?user_id=eq.${userId}` : null,
    fetcher
  );
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
