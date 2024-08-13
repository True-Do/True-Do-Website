import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <div className='w-full screen-size'>
      <section className='grid grid-cols-2 md:grid-cols-5 gap-2 p-2 px-4'>
        <Skeleton className={'w-full h-64 rounded-xl'}></Skeleton>
        <Skeleton className={'w-full h-56 rounded-xl'}></Skeleton>
        <Skeleton className={'w-full h-32 rounded-xl'}></Skeleton>
        <Skeleton
          className={'w-full h-72 rounded-xl hidden md:block'}
        ></Skeleton>
        <Skeleton
          className={'w-full h-56 rounded-xl hidden md:block'}
        ></Skeleton>
      </section>
      <div
        id='ADD BUTTON'
        className='fixed bottom-12 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
      >
        <Link href={'/app/note?id=new'} className=''>
          <div className='p-2 border-[1px] dark:border-dark-gray-400 rounded-2xl md:p-0 bg-background dark:bg-black md:border-none'>
            <div className='p-4 rounded-xl md:rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
              <PlusIcon></PlusIcon>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
