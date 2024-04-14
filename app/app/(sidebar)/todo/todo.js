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

const Todo = ({ user, initial }) => {
  const [todo, setTodo] = useState();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [insertTodo, setInsertTodo] = useState('');
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

  async function addCategory() {
    await supabase.from('todo_category').insert([
      {
        category: category,
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

  async function addTodo() {
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
    getTodo();
  }, [getTodo]);

  return (
    <div className='w-full flex flex-col h-full'>
      <section className='flex-1'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 4 }}>
          <Masonry gutter=''>
            {!loading &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className='m-2 px-4 py-3 rounded-xl bg-light-off-white'
                  >
                    <div className='flex flex-row mb-4'>
                      <h2 className='text-xl md:text-2xl font-bold flex-1 break-all'>
                        {category.category}
                      </h2>
                      <button>+</button>
                      <button
                        onClick={() => {
                          deleteCategory(category.id);
                        }}
                        className='ml-1'
                      >
                        x
                      </button>
                    </div>

                    {todo.map((todo) => {
                      if (todo.category == category.id) {
                        return (
                          <div key={todo.id} id={todo.id}>
                            <Checkbox className='mr-1' />
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

      <div id='ADD BUTTON' className='fixed bottom-5 left-1/2'>
        <Popover>
          <PopoverTrigger>
            <div className='px-4 py-2 rounded-xl bg-light-off-white shadow-md cursor-pointer hover:shadow-sm hover:bg-white transition-all'>
              +
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex flex-col'>
              <Dialog>
                <DialogTrigger>
                  <button className='hover:bg-white px-2 py-1 transition-all rounded-lg'>
                    Add Category
                  </button>
                </DialogTrigger>

                <DialogContent className='bg-light-off-white max-w-xs'>
                  <DialogHeader>
                    <DialogTitle className='mb-4'>Add Category</DialogTitle>
                    <DialogDescription>
                      <Input
                        onChange={(event) => {
                          setCategory(event.target.value);
                        }}
                        className='bg-light-off-white border-gray-400 outline-none text-black ring-0 focus:bg-white'
                        placeholder='Category Name'
                        type='text'
                      />
                      <div className='flex justify-end mt-3'>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              addCategory();
                            }}
                            className=' border-gray-400 bg-transparent text-black hover:bg-white'
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
              <button className='hover:bg-white px-2 py-1 transition-all rounded-lg'>
                Add Todo
              </button>{' '}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Todo;
