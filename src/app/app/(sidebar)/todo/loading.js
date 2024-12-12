import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const Loading = () => {
  return (
    <div className='w-full screen-size'>
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
