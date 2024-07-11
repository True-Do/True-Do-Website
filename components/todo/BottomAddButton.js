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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PlusIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Stars } from 'lucide-react';

const iconSize = 20;

const BottomAddButton = ({
  setAddCategory,
  handleAddCategory,
  handleAddAICategory,
}) => {
  return (
    <div
      id='ADD BUTTON'
      className='fixed left-1/2 translate-x-[-50%] md:sticky bottom-10 md:bottom-5 mx-auto z-20'
    >
      <Popover>
        <PopoverTrigger>
          <div
            id='ADD BUTTON'
            className='p-2 rounded-full md:p-0 bg-background dark:bg-black'
          >
            <div className='p-4 rounded-full md:rounded-xl bg-light-off-white dark:bg-dark-gray-600 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
              <PlusIcon></PlusIcon>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className='flex flex-col space-y-1'>
          {/* Button 1 */}
          <Dialog>
            <DialogTrigger>
              <div className='bg-light-off-white dark:bg-dark-gray-600 cursor-pointer hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400 w-full dark:text-white space-x-1 flex flex-row items-center justify-center p-2 rounded-md'>
                <PlusIcon height={iconSize} width={iconSize}></PlusIcon>
                <span>Add Category</span>
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
          </Dialog>

          {/* Button 2 */}
          <Dialog>
            <DialogTrigger>
              <div className='bg-light-off-white dark:bg-dark-gray-600 cursor-pointer hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400 w-full dark:text-white space-x-1 flex flex-row items-center justify-center p-2 rounded-md'>
                <StarFilledIcon
                  height={iconSize - 2}
                  width={iconSize - 2}
                ></StarFilledIcon>
                <span>Add Category with AI</span>
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
                    placeholder='Describe your project'
                    type='text'
                  />
                  <div className='flex justify-end mt-3'>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleAddAICategory();
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
          </Dialog>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BottomAddButton;
