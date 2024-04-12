'use client';

import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

const Todo = ({ user, initial }) => {
  const [todo, setTodo] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [insertTodo, setInsertTodo] = useState('');
  const supabase = createClient();

  function getCategories(todos) {
    let categories = [];
    todos.map((todo) => {
      if (!categories.includes(todo.category)) {
        categories.push(todo.category);
      }
    });
    console.log(categories);
    setCategories(categories);
  }

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    getCategories(data);
    setTodo(data);
    setLoading(false);
  }, [supabase, user.id]);

  async function addData() {
    const { insert_data, insert_error } = await supabase
      .from('todo')
      .upsert([{ label: insertTodo, user_id: user?.id }]);

    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    getCategories(data);
    setTodo(data);
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className='w-full flex flex-col h-full'>
      <section className='flex-1'>
        {!loading &&
          categories.map((category) => {
            let category_title = category;

            if (category == null) {
              category_title = 'Uncategorized';
            }

            return (
              <div
                key={category}
                className='m-2 px-4 py-3 rounded-xl w-fit bg-light-off-white'
              >
                <h2 className='text-2xl font-bold'>{category_title}</h2>

                {todo.map((todo) => {
                  if (todo.category == category) {
                    return (
                      <div key={todo.id} id={todo.id}>
                        {todo.label}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
      </section>

      <section className='flex flex-row px-4'>
        <input
          className='bg-light-off-white w-full rounded-xl p-2 text-lg outline-none shadow-md'
          type='text'
          onChange={(e) => {
            setInsertTodo(e.target.value);
          }}
        />
        <button
          className='bg-light-off-white mx-3 px-2 rounded-xl shadow-lg font-bold'
          onClick={() => addData()}
        >
          Add
        </button>
      </section>
    </div>
  );
};

export default Todo;
