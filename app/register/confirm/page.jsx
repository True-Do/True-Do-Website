import React from 'react';

const Confirm = () => {
  return (
    <div className='screen-size w-full flex flex-row'>
      <div className='w-full bg-[url("/about-1.jpg")]'></div>

      <div className='w-full flex flex-col items-center justify-center bg-light-off-white'>
        <div className='w-1/2 '>
          <h1 className='text-[1.7rem] font-bold mb-2'>
            Login to True <span className='text-text-light'>Do</span>
          </h1>

          <p className='mb-8 text-sm'>
            Check your inbox to confirm your signup!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
