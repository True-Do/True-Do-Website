import { Skeleton } from '@/components/ui/skeleton';
import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react';

const loading = () => {
  return (
    <div className='h-[80vh] mt-1 w-full flex  items-center'>
      <div className='h-full w-full flex flex-col md:flex-row items-center justify-center px-20'>
        <section className='w-full  flex items-center justify-center'>
          <Skeleton className={'w-96 h-96 rounded-xl md:block'}></Skeleton>
        </section>
        <section className='w-full p-8'>
          <ul className='list-disc space-y-2'>
            <Skeleton className={'h-8 w-full'}></Skeleton>
            <Skeleton className={'h-8 w-full'}></Skeleton>
            <Skeleton className={'h-8 w-full'}></Skeleton>
            <Skeleton className={'h-8 w-full'}></Skeleton>
          </ul>
        </section>
      </div>
      <div
        id='ADD BUTTON'
        className='fixed bottom-12 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
      >
        <div>
          <div className='p-2 border-[1px] dark:border-dark-gray-400 rounded-2xl md:p-0 bg-background dark:bg-black md:border-none'>
            <div className='p-4 rounded-xl md:rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
              <PlusIcon></PlusIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
