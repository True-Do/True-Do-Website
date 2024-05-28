import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
    </div>
  );
};

export default Loading;
