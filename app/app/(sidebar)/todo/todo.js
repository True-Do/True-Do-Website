'use client';

import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

const Todo = ({ user, initial }) => {
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(true);
  const [insertTodo, setInsertTodo] = useState('');
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

  const addData = async () => {
    const { insert_data, insert_error } = await supabase
      .from('todo')
      .upsert([{ label: insertTodo, user_id: user.id }]);

    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    setTodo(data);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {!loading &&
        todo.map((todo) => (
          <div key={todo.id} id={todo.id}>
            {todo.label}
          </div>
        ))}
      <input
        type='text'
        onChange={(e) => {
          setInsertTodo(e.target.value);
        }}
      />
      <button onClick={() => addData()}>Add</button>
    </div>
  );
};

export default Todo;
