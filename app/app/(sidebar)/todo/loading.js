import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const Loading = () => {
  return (
    <div className='w-full screen-size'>
      <section id='Menu Bar' className='my-1 flex flex-row space-x-2 mx-2'>
        <Button className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400'>
          Expand All
        </Button>
        <Button className='px-4 py-3 rounded-xl bg-light-off-white dark:bg-dark-accent shadow-md dark:text-white dark:hover:bg-dark-gray-400'>
          Collapse All
        </Button>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-2 py-3 px-2'>
        {[1, 2, 3, 4, 5, 6].map((id) => {
          return (
            <Skeleton key={id} className={'w-full h-16 rounded-xl'}></Skeleton>
          );
        })}
      </section>
      <div
        id='ADD BUTTON'
        className='fixed bottom-10 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
      >
        <div
          id='ADD BUTTON'
          className='p-2 border-[1px] dark:border-dark-gray-400 rounded-2xl md:p-0 bg-background dark:bg-black md:border-none'
        >
          <div className='p-4 rounded-xl md:rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
            <PlusIcon></PlusIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
