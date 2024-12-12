'use client';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { PlusIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const IconSize = '20px';

const AddTodoDialog = ({ setAddTodo, handleAddTodo, category }) => {
  return (
    <Dialog id='Add Button'>
      <DialogTrigger>
        <div
          size='sm'
          variant='outline'
          className='bg-transparent border-none m-1'
        >
          <PlusIcon height={IconSize} width={IconSize}></PlusIcon>
        </div>
      </DialogTrigger>

      <DialogContent className='bg-light-off-white dark:text-white max-w-xs'>
        <DialogHeader>
          <DialogTitle className='mb-4 '>Add Todo</DialogTitle>
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
  );
};

export default AddTodoDialog;
