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

const BottomAddButton = ({ setAddCategory, handleAddCategory }) => {
  return (
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
            <div className='p-4 rounded-full md:rounded-xl bg-light-off-white dark:bg-dark-gray-600 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
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
  );
};

export default BottomAddButton;
