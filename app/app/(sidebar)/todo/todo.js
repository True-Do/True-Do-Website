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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const [todoCategory, setTodoCategory] = useState('');
  const supabase = createClient();

  // ========
  // CATEGORY
  // ========
  async function getCategories() {
    let { data, error } = await supabase
      .from('todo_category')
      .select()
      .eq('user_id', user.id);

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

  async function addTodoFn(_category) {
    let final_category = _category || todoCategory;

    if (addTodo == '' || addTodo == undefined || addTodo == null) {
      return;
    }

    const { insert_error } = await supabase.from('todo').insert([
      {
        label: addTodo,
        user_id: user?.id,
        category: final_category,
      },
    ]);

    let { data, error } = await supabase
      .from('todo')
      .select()
      .eq('user_id', user.id);

    setTodo(data);
  }

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  return (
    <div className='w-full flex flex-col h-full'>
      <section className='flex-1 p-1'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 4 }}>
          <Masonry gutter=''>
            {!loading &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className='m-1 px-4 py-3 rounded-xl bg-light-off-white shadow-md'
                  >
                    <div className='flex flex-row items-center'>
                      <h2 className='text-xl md:text-xl font-bold flex-1 break-all mb-2'>
                        {category.category}
                      </h2>
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

                    {todo.map((todo) => {
                      if (todo.category == category.id) {
                        return (
                          <div key={todo.id} id={todo.id} className='text-base'>
                            <Checkbox
                              onClick={() => {
                                deleteTodo(todo.id);
                              }}
                              className='mr-1'
                            />
                            {todo.label}
                          </div>
                        );
                      }
                    })}
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
