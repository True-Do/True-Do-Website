/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useTodos, useCategories } from './hooks';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Button } from '@/components/ui/button';
import AddTodoDialog from '@/components/todo/AddTodoDialog';
import ExtraSettingsPopover from '@/components/todo/ExtraSettingsPopover';
import BottomAddButton from '@/components/todo/BottomAddButton';
import { Search } from '@/components/ui/search';

const IconSize = '20px';
function CloseIcon() {
  return (
    <svg
      width={IconSize}
      height={IconSize}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg
      width={IconSize}
      height={IconSize}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

const Todo = ({ user }) => {
  const {
    todos,
    isLoading: todosLoading,
    mutate: mutateTodos,
  } = useTodos(user.id);
  const {
    categories,
    isLoading: categoriesLoading,
    mutate: mutateCategories,
  } = useCategories(user.id);

  const [open, setOpen] = useState({});
  const [addCategory, setAddCategory] = useState('');
  const [addTodo, setAddTodo] = useState('');

  useEffect(() => {
    if (categories) {
      let _open = {};
      categories.map((category) => {
        _open[category.id] = false;
      });
      setOpen(_open);
    }
  }, [categories]);

  async function deleteCategory(category_id) {
    const supabase = createClient();
    await supabase
      .from('todo_category')
      .delete()
      .eq('user_id', user.id)
      .eq('id', category_id);
    mutateCategories();
  }

  async function handleAddCategory() {
    if (!addCategory) return;
    const supabase = createClient();
    await supabase
      .from('todo_category')
      .insert([{ category: addCategory, user_id: user?.id }]);
    mutateCategories();
    setAddCategory('');
  }

  async function handleAddAICategory() {
    if (addCategory == '' || addCategory == undefined || addCategory == null) {
      return;
    }

    const aiOutput = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ prompt: addCategory.toString() }),
    });
    const body = await aiOutput.json();
    const todosList = body.data;
    const title = todosList[todosList.length - 1];
    todosList.pop(todosList.length - 1);

    const { data: categoryData, error: categoryError } = await supabase
      .from('todo_category')
      .insert({
        category: title,
        user_id: user?.id,
      })
      .select();

    const finalTodosList = [];

    todosList.map((todo) => {
      finalTodosList.push({
        label: todo,
        user_id: user?.id,
        category: categoryData[0]['id'],
      });
    });

    const { insert_error } = await supabase.from('todo').insert(finalTodosList);

    let { data: newCategoryData, error: newCategoryError } = await supabase
      .from('todo_category')
      .select()
      .eq('user_id', user.id);

    let { data: newtodoData, error: newtodoError } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    let _open = {};
    newCategoryData.map((category) => {
      _open[category.id] = false;
    });
    setOpen(_open);

    setTodo(newtodoData);
    setCategories(newCategoryData);
    setAddCategory('');
  }

  async function handleAddTodo(category_id) {
    if (!addTodo) return;
    const supabase = createClient();
    await supabase
      .from('todo')
      .insert([{ label: addTodo, user_id: user?.id, category: category_id }]);
    mutateTodos();
    setAddTodo('');
    setOpen((prev) => ({ ...prev, [category_id]: true }));
  }

  async function deleteTodo(todo_id) {
    const supabase = createClient();
    await supabase
      .from('todo')
      .delete()
      .eq('user_id', user.id)
      .eq('id', todo_id);
    mutateTodos();
  }

  if (todosLoading || categoriesLoading) return <div></div>;

  return (
    <div className='w-full flex flex-col h-full'>
      <section id='Menu Bar' className='my-1 flex flex-row space-x-2 mx-2'>
        <Button
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md dark:text-white dark:hover:bg-dark-gray-400 border-[1px] dark:border-dark-gray-400'
          onClick={() => {
            let _open = { ...open };
            Object.keys(open).map((id) => {
              _open[id] = true;
            });
            setOpen(_open);
          }}
        >
          Expand All
        </Button>
        <Button
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md dark:text-white dark:hover:bg-dark-gray-400 border-[1px] dark:border-dark-gray-400'
          onClick={() => {
            let _open = { ...open };
            Object.keys(open).map((id) => {
              _open[id] = false;
            });
            setOpen(_open);
          }}
        >
          Collapse All
        </Button>
        <Search></Search>
      </section>

      <section id='Main Page' className='flex-1 p-1 pb-32 md:pb-16'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 1, 900: 2 }}>
          <Masonry gutter='.1rem'>
            {categories.map((category) => (
              <div
                key={category.id}
                className='m-1 rounded-lg bg-light-off-white dark:bg-dark-gray-800 shadow-md border-[1px] dark:border-dark-gray-400 '
              >
                <div
                  id='Title'
                  className='flex flex-row items-center py-3 px-4 '
                >
                  <h2
                    className='text-lg md:text-xl font-bold flex-1 break-words cursor-pointer mr-2'
                    onClick={() => {
                      let _open = { ...open };
                      _open[category.id] = !_open[category.id];
                      setOpen(_open);
                    }}
                  >
                    {category.category}
                  </h2>

                  <button
                    onClick={() => {
                      let _open = { ...open };
                      _open[category.id] = !_open[category.id];
                      setOpen(_open);
                    }}
                  >
                    {open[category.id] ? <CloseIcon /> : <OpenIcon />}
                  </button>

                  <AddTodoDialog
                    setAddTodo={setAddTodo}
                    category={category}
                    handleAddTodo={handleAddTodo}
                  ></AddTodoDialog>

                  <ExtraSettingsPopover
                    deleteCategory={deleteCategory}
                    category={category}
                  ></ExtraSettingsPopover>
                </div>

                <hr
                  className={
                    open[category.id] ? 'border-dark-gray-400' : 'hidden'
                  }
                />

                <div
                  className={
                    open[category.id]
                      ? 'flex flex-col divide-y-[1px] divide-dark-gray-400 transition-all'
                      : 'hidden'
                  }
                >
                  {todos.map((todo) =>
                    todo.category === category.id ? (
                      <div
                        key={todo.id}
                        id={todo.id}
                        className='text-base flex flex-row break-words py-[.35rem] px-3 md:px-2 pl-5'
                      >
                        <Checkbox
                          onClick={() => deleteTodo(todo.id)}
                          className='md:mr-2 mr-1 mt-[.28rem] md:mt-[.29rem] ml-0'
                        />
                        <span className='text-[.9rem] md:text-base'>
                          {todo.label}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>

      <BottomAddButton
        setAddCategory={setAddCategory}
        handleAddCategory={handleAddCategory}
        handleAddAICategory={handleAddAICategory}
      ></BottomAddButton>
    </div>
  );
};

export default Todo;
