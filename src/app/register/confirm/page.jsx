import React from 'react';

const Confirm = () => {
  return (
    <div className='screen-size w-full flex justify-center md:flex md:flex-row'>
      <div className='w-full hidden md:block bg-[url("/about-1.jpg")]'></div>
      <div className='w-full h-full fixed md:hidden bg-[url("/about-1.jpg")]'></div>

      <div className='z-10 flex items-center justify-center w-5/6 h-auto md:h-svh my-auto'>
        <div className='w-full h-full md:min-h-svh flex flex-col items-center justify-center bg-light-off-white dark:bg-black rounded-xl md:rounded-none py-12'>
          <div className='w-full px-10 md:w-1/2 md:px-0'>
            <h1 className='text-[1.7rem] font-bold mb-2'>
              Login to True <span className='text-text-light'>Do</span>
            </h1>

            <p className='mb-8 text-sm'>
              Check your inbox to confirm your signup!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
