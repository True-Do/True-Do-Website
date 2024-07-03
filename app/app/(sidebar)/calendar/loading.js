import { Skeleton } from '@/components/ui/skeleton';
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
    </div>
  );
};

export default loading;
