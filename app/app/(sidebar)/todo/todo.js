/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import {
  Cross1Icon,
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import AddTodoDialog from '@/components/todo/AddTodoDialog';
import ExtraSettingsPopover from '@/components/todo/ExtraSettingsPopover';
import BottomAddButton from '@/components/todo/BottomAddButton';

const IconSize = '20px';

const Todo = ({ user, initial, initialCategories }) => {
  const [todo, setTodo] = useState();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [addCategory, setAddCategory] = useState('');
  const [addTodo, setAddTodo] = useState('');
  const supabase = createClient();
  const [open, setOpen] = useState({});
  const [columnsOnPhone, setColumnsOnPhone] = useState(1);
  const [columnsOnPc, setColumnsOnPc] = useState(2);

  // ========
  // CATEGORY
  // ========
  async function getCategories() {
    let _open = {};
    initialCategories.map((category) => {
      _open[category.id] = false;
    });

    setOpen(_open);
    setCategories(initialCategories);
  }

  async function deleteCategory(category_id) {
    const { delete_error } = await supabase
      .from('todo_category')
      .delete()
      .eq('user_id', user.id)
      .eq('id', category_id);

    let { data, error } = await supabase
      .from('todo_category')
      .select()
      .eq('user_id', user.id);

    setCategories(data);
  }

  async function handleAddCategory() {
    if (addCategory == '' || addCategory == undefined || addCategory == null) {
      return;
    }

    await supabase.from('todo_category').insert([
      {
        category: addCategory,
        user_id: user?.id,
      },
    ]);

    let { data, error } = await supabase
      .from('todo_category')
      .select()
      .eq('user_id', user.id);

    let _open = {};
    data.map((category) => {
      _open[category.id] = false;
    });
    setOpen(_open);

    setCategories(data);
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

    console.log(title);

    const { data: categoryData, error: categoryError } = await supabase
      .from('todo_category')
      .insert({
        category: title,
        user_id: user?.id,
      })
      .select();

    console.log(categoryData);

    const finalTodosList = [];

    todosList.map((todo) => {
      finalTodosList.push({
        label: todo,
        user_id: user?.id,
        category: categoryData[0]['id'],
      });
    });

    console.log(finalTodosList);

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

  // =====
  //. TODO
  // =====
  const getTodo = () => {
    getCategories();
    setTodo(initial);
    setLoading(false);
  };

  async function deleteTodo(todo_id) {
    const { delete_error } = await supabase
      .from('todo')
      .delete()
      .eq('user_id', user.id)
      .eq('id', todo_id);

    let { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    setTodo(data);
  }

  async function handleAddTodo(category_id) {
    if (addTodo == '' || addTodo == undefined || addTodo == null) {
      return;
    }

    const { insert_error } = await supabase.from('todo').insert([
      {
        label: addTodo,
        user_id: user?.id,
        category: category_id,
      },
    ]);

    let { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    let _open = { ...open };
    _open[category_id] = true;
    setOpen(_open);
    setTodo(data);
  }

  useEffect(() => {
    getTodo();
  }, []);

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

  return (
    <div className='w-full flex flex-col h-full'>
      {/* Menu Bar */}
      <section id='Menu Bar' className='my-1 flex flex-row space-x-2 mx-2'>
        <Button
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400 border-[1px] dark:border-dark-gray-400'
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
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400 border-[1px] dark:border-dark-gray-400'
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
      </section>

      <section id='Main Page' className='flex-1 p-1 pb-32 md:pb-16'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 750: columnsOnPhone, 900: columnsOnPc }}
        >
          <Masonry gutter=''>
            {!loading &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className='m-1 rounded-lg bg-light-off-white dark:bg-dark-gray-500 shadow-md border-[1px] dark:border-dark-gray-400 '
                  >
                    <div
                      id='Title'
                      className='flex flex-row items-center py-3 px-4 '
                    >
                      <h2
                        className='text-xl md:text-xl font-bold flex-1 break-all cursor-pointer'
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
                        {open[category.id] == true ? (
                          <CloseIcon></CloseIcon>
                        ) : (
                          <OpenIcon></OpenIcon>
                        )}
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
                        open[category.id] == true
                          ? 'border-dark-gray-400'
                          : 'hidden'
                      }
                    />

                    <div
                      className={
                        open[category.id] == true
                          ? 'flex flex-col divide-y-[1px] divide-dark-gray-400 transition-all'
                          : 'hidden'
                      }
                    >
                      {todo.map((todo) => {
                        if (todo.category == category.id) {
                          return (
                            <div
                              key={todo.id}
                              id={todo.id}
                              className='text-base flex flex-row hyphens-auto break-all py-[.35rem]  px-3'
                            >
                              <Checkbox
                                onClick={() => {
                                  deleteTodo(todo.id);
                                }}
                                className='mr-2 mt-[.4rem] ml-0'
                              />
                              <span className='text-lg'>{todo.label}</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      </section>

      {!loading && (
        <BottomAddButton
          setAddCategory={setAddCategory}
          handleAddCategory={handleAddCategory}
          handleAddAICategory={handleAddAICategory}
        ></BottomAddButton>
      )}
    </div>
  );
};

export default Todo;
