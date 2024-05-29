import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <div className='w-full screen-size'>
      <section className='grid grid-cols-2 md:grid-cols-3 gap-2 p-1 px-2'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
          return (
            <Skeleton key={id} className={'w-full h-12 rounded-xl'}></Skeleton>
          );
        })}
      </section>
      <div
        id='ADD BUTTON'
        className='fixed bottom-10 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
      >
        <div
          id='ADD BUTTON'
          className='p-2 rounded-full md:p-0 bg-background dark:bg-black'
        >
          <div className='p-4 rounded-full md:rounded-xl bg-light-off-white dark:bg-dark-gray-600 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all'>
            <PlusIcon></PlusIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
