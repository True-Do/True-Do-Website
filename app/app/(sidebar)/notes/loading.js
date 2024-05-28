import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  const Loading = () => {
    return (
      <div className='w-full screen-size'>
        <section className='grid grid-cols-3 gap-2 p-1 px-2'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
            return (
              <Skeleton
                key={id}
                className={'w-full h-12 rounded-xl'}
              ></Skeleton>
            );
          })}
        </section>
      </div>
    );
  };
};

export default Loading;
