'use client';

import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

const ProtectedComponent = ({ user, initial }) => {
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    setTodo(data);
    setLoading(false);

    console.log(data, error);
  }, [supabase, user.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{!loading && todo[0].label}</div>;
};

export default ProtectedComponent;
