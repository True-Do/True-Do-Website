/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

    localStorage.setItem('todo-data', JSON.stringify(data));
    localStorage.setItem('todo-fetch-time', JSON.stringify(Date.now()));

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

    localStorage.setItem('todo-data', JSON.stringify(data));
    localStorage.setItem('todo-fetch-time', JSON.stringify(Date.now()));

    let _open = {};
    data.map((category) => {
      _open[category.id] = false;
    });
    setOpen(_open);

    setCategories(data);
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

    localStorage.setItem('todo-data', JSON.stringify(data));
    localStorage.setItem('todo-fetch-time', JSON.stringify(Date.now()));

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

    localStorage.setItem('todo-data', JSON.stringify(data));
    localStorage.setItem('todo-fetch-time', JSON.stringify(Date.now()));

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
      <section id='Menu Bar' className='my-1 flex flex-row space-x-2 mx-2'>
        <Button
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400'
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
          className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400'
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
        <Button
          onClick={() => {
            localStorage.removeItem('todo-data');
            localStorage.removeItem('todo-fetch-time');
            window.location.reload();
          }}
          className='px-3 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400'
        >
          <ReloadIcon></ReloadIcon>
        </Button>
      </section>

      <section id='Main Page' className='flex-1 p-1'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 750: columnsOnPhone, 900: columnsOnPc }}
        >
          <Masonry gutter=''>
            {!loading &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className='m-1 py-3 rounded-xl bg-light-off-white dark:bg-dark-gray-500 shadow-md '
                  >
                    <div
                      id='Title'
                      className='flex flex-row items-center p-1 px-4'
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

                      <Dialog id='Add Button'>
                        <DialogTrigger>
                          <div
                            size='sm'
                            variant='outline'
                            className='bg-transparent border-none m-1'
                          >
                            <PlusIcon
                              height={IconSize}
                              width={IconSize}
                            ></PlusIcon>
                          </div>
                        </DialogTrigger>

                        <DialogContent className='bg-light-off-white dark:text-white max-w-xs'>
                          <DialogHeader>
                            <DialogTitle className='mb-4 '>
                              Add Todo
                            </DialogTitle>
                            <DialogDescription>
                              <Input
                                onChange={(event) => {
                                  setAddTodo(event.target.value);
                                }}
                                className='bg-light-off-white border-gray-400 outline-none text-black ring-0 dark:text-white focus:shadow-md transition-all mb-3'
                                placeholder='Todo'
                                type='text'
                              />

                              <p className='text-text-dark dark:text-white p-1'>
                                Category - {category.category}
                              </p>

                              <div className='flex justify-end mt-3'>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => {
                                      handleAddTodo(category.id);
                                    }}
                                    className='  border-gray-400 dark:border-dark-gray-400 dark:text-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
                                    variant='outline'
                                  >
                                    Add
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      <Popover id='Extra Settings'>
                        <PopoverTrigger>
                          <DotsVerticalIcon
                            height={IconSize}
                            width={IconSize}
                          ></DotsVerticalIcon>
                        </PopoverTrigger>

                        <PopoverContent>
                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-light-off-white hover:bg-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 transition-all border-none'
                            onClick={() => {
                              deleteCategory(category.id);
                            }}
                          >
                            <TrashIcon></TrashIcon>
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <hr
                      className={
                        open[category.id] == true
                          ? 'border-[1px] border-dark-gray-400 mt-2'
                          : 'hidden'
                      }
                    />

                    <div
                      className={
                        open[category.id] == true
                          ? 'mt-2 flex flex-col space-y-1 divide-y-[1px] divide-dark-gray-400 px-4 transition-all'
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
        <div
          id='ADD BUTTON'
          className='fixed bottom-10 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
        >
          <Dialog>
            <DialogTrigger>
              <div
                id='ADD BUTTON'
                className='p-2 rounded-full md:p-0 bg-background dark:bg-black'
              >
                <div className='p-4 rounded-full md:rounded-xl bg-light-off-white dark:bg-dark-gray-600 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all'>
                  <PlusIcon></PlusIcon>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className='bg-light-off-white dark:text-white max-w-xs'>
              <DialogHeader>
                <DialogTitle className='mb-4'>Add Category</DialogTitle>
                <DialogDescription>
                  <Input
                    onChange={(event) => {
                      setAddCategory(event.target.value);
                    }}
                    className='bg-light-off-white dark:text-white border-gray-400 outline-none ring-0 focus:shadow-md dark:placeholder:text-white transition-all'
                    placeholder='Category Name'
                    type='text'
                  />
                  <div className='flex justify-end mt-3'>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleAddCategory();
                        }}
                        className=' border-gray-400 dark:border-dark-gray-400 dark:text-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
                        variant='outline'
                      >
                        Add
                      </Button>
                    </DialogClose>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>{' '}
        </div>
      )}
    </div>
  );
};

export default Todo;
