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
} from '@radix-ui/react-icons';

const Todo = ({ user, initial }) => {
  const [todo, setTodo] = useState();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [addCategory, setAddCategory] = useState('');
  const [addTodo, setAddTodo] = useState('');
  const supabase = createClient();
  const [open, setOpen] = useState({});

  // ========
  // CATEGORY
  // ========
  async function getCategories() {
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

  async function addCategoryFn() {
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
  }

  // =====
  //. TODO
  // =====
  const getTodo = useCallback(async () => {
    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    await getCategories(data);
    setTodo(data);
    setLoading(false);
  }, [supabase, user.id]);

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

  async function addTodoFn(category_id) {
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
  }, [getTodo]);

  function OpenIcon() {
    return (
      <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z'
          fill='currentColor'
          fill-rule='evenodd'
          clip-rule='evenodd'
        ></path>
      </svg>
    );
  }

  function CloseIcon() {
    return (
      <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z'
          fill='currentColor'
          fill-rule='evenodd'
          clip-rule='evenodd'
        ></path>
      </svg>
    );
  }

  return (
    <div className='w-full flex flex-col h-full'>
      <section className='flex-1 p-1'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
          <Masonry gutter=''>
            {!loading &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className='m-1 px-4 py-3 rounded-xl bg-light-off-white shadow-md'
                  >
                    <div className='flex flex-row items-center'>
                      <h2 className='text-xl md:text-xl font-bold flex-1 break-all'>
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
                          <OpenIcon></OpenIcon>
                        ) : (
                          <CloseIcon></CloseIcon>
                        )}
                      </button>

                      <Popover>
                        <PopoverTrigger>
                          <DotsVerticalIcon></DotsVerticalIcon>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Dialog>
                            <DialogTrigger>
                              <Button
                                size='sm'
                                variant='outline'
                                className='bg-light-off-white hover:bg-white transition-all border-none'
                              >
                                <PlusIcon></PlusIcon>
                              </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-light-off-white max-w-xs'>
                              <DialogHeader>
                                <DialogTitle className='mb-4'>
                                  Add Todo
                                </DialogTitle>
                                <DialogDescription>
                                  <Input
                                    onChange={(event) => {
                                      setAddTodo(event.target.value);
                                    }}
                                    className='bg-light-off-white border-gray-400 outline-none text-black ring-0 focus: focus:shadow-md transition-all mb-3'
                                    placeholder='Todo'
                                    type='text'
                                  />

                                  <p className='text-text-dark p-1'>
                                    Category - {category.category}
                                  </p>

                                  <div className='flex justify-end mt-3'>
                                    <DialogClose asChild>
                                      <Button
                                        onClick={() => {
                                          addTodoFn(category.id);
                                        }}
                                        className=' border-gray-400 bg-transparent text-black hover:bg-light-off-white transition-all hover:shadow-md'
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

                          <Button
                            variant='outline'
                            size='sm'
                            className='bg-light-off-white hover:bg-white transition-all border-none'
                            onClick={() => {
                              deleteCategory(category.id);
                            }}
                          >
                            <TrashIcon></TrashIcon>
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div
                      className={open[category.id] == true ? 'mt-2' : 'hidden'}
                    >
                      {todo.map((todo) => {
                        if (todo.category == category.id) {
                          return (
                            <div
                              key={todo.id}
                              id={todo.id}
                              className='text-base flex flex-row hyphens-auto break-all'
                            >
                              <Checkbox
                                onClick={() => {
                                  deleteTodo(todo.id);
                                }}
                                className='m-1 ml-0'
                              />
                              {todo.label}
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
              <div className='p-2 rounded-full md:p-0 bg-background'>
                <div className='p-4 rounded-full md:rounded-xl bg-light-off-white shadow-md cursor-pointer hover:shadow-sm hover:bg-white transition-all'>
                  <PlusIcon></PlusIcon>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className='bg-light-off-white max-w-xs'>
              <DialogHeader>
                <DialogTitle className='mb-4'>Add Category</DialogTitle>
                <DialogDescription>
                  <Input
                    onChange={(event) => {
                      setAddCategory(event.target.value);
                    }}
                    className='bg-light-off-white border-gray-400 outline-none text-black ring-0 focus:shadow-md transition-all'
                    placeholder='Category Name'
                    type='text'
                  />
                  <div className='flex justify-end mt-3'>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          addCategoryFn();
                        }}
                        className=' border-gray-400 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
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
