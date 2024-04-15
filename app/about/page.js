import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div>
      <section
        id='TOP BAR'
        className='flex flex-row justify-between items-center p-4 sticky top-0 bg-background'
      >
        <Link href={'/'}>
          <h1 className='flex flex-row font-bold text-3xl'>
            True <p className='text-text-light'>Do</p>
          </h1>
        </Link>
        <div className='space-x-4'>
          <Link href='/about'>About</Link>
          <Link href='/app/todo'>App</Link>
        </div>
      </section>

      <section className='flex mt-4 ml-4'>
        <div className='basis-5/12 flex items-center justify-center'>
          <Image
            alt='about us'
            className='rounded-xl w-5/6'
            src={'/about-1.jpg'}
            width={'380'}
            height={'280'}
          ></Image>
        </div>
        <div className='p-8 pr-24 basis-7/12 flex flex-col items-start justify-center'>
          <h1 className='text-2xl font-semibold'>About us</h1>
          <p>
            True Do is a dynamic web application designed to streamline your
            daily tasks and schedules seamlessly. With our integrated To-Do,
            Notes and Calendar features, managing your agenda has never been
            more efficient.
          </p>
        </div>
      </section>

      <section className='flex mt-12 pb-12 ml-4'>
        <div className='p-8 pr-32 basis-7/12 flex flex-col items-start justify-center'>
          <h1 className='text-2xl font-semibold'>Our Mission</h1>
          <p>
            True Do was built to keep all your productivity tools in a single
            place making it easier to switch between different tasks and quickly
            jot down information
          </p>
        </div>
        <div className='basis-5/12 flex items-center justify-center'>
          <Image
            alt='about us'
            className='rounded-xl w-5/6'
            src={'/about-2.jpg'}
            width={'380'}
            height={'280'}
          ></Image>
        </div>
      </section>
    </div>
  );
};

export default About;
