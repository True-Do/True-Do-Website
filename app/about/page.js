import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className='mx-auto overflow-x-hidden'>
      <section
        id='TOP BAR'
        className='flex flex-row justify-between items-center p-2 max-w-4xl mx-auto'
      >
        <Link href={'/'}>
          <h1 className='flex flex-row font-bold text-2xl'>
            True <p className='text-text-light'>Do</p>
          </h1>
        </Link>
        <div className='space-x-4 '>
          <Link
            className='p-1 rounded-md hover:opacity-30 text-sm font-semibold  transition-all'
            href='/about'
          >
            <span className='underline'>About</span>
          </Link>
          <Link
            className='p-1 rounded-md hover:opacity-30 text-sm font-semibold  transition-all'
            href='/login'
          >
            Login
          </Link>
          {/* {user ? (
            <Link className='dark:border-dark-gray-300' href='/app/todo'>
              App
            </Link>
          ) : (
            <Link className='dark:border-dark-gray-300' href='/login'>
              Login
            </Link>
          )} */}
        </div>
      </section>

      <hr className='w-svw border-dark-gray-200 dark:border-white dark:opacity-10' />

      <div className='max-w-4xl mx-auto'>
        <section className='flex mt-12'>
          <div className='basis-5/12 flex items-center justify-center'>
            <Image
              alt='about us'
              className='rounded-xl w-5/6'
              src={'/about-1.png'}
              width={'380'}
              height={'280'}
            ></Image>
          </div>
          <div className='p-8 pr-24 basis-7/12 flex flex-col items-start justify-center'>
            <h1 className='text-xl font-semibold'>About us</h1>
            <p className='text-sm'>
              True Do is a dynamic web application designed to streamline your
              daily tasks and schedules seamlessly. With our integrated To-Do,
              Notes and Calendar features, managing your agenda has never been
              more efficient.
            </p>
          </div>
        </section>

        <section className='flex mt-12 pb-12 ml-4'>
          <div className='p-8 pr-32 basis-7/12 flex flex-col items-start justify-center'>
            <h1 className='text-xl font-semibold'>Our Mission</h1>
            <p className='text-sm'>
              True Do was built to keep all your productivity tools in a single
              place making it easier to switch between different tasks and
              quickly jot down information
            </p>
          </div>
          <div className='basis-5/12 flex items-center justify-center'>
            <Image
              alt='about us'
              className='rounded-xl w-5/6'
              src={'/about-2.png'}
              width={'380'}
              height={'280'}
            ></Image>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
