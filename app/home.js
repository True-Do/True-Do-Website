import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Link from 'next/link';
import React from 'react';

const Home = ({ user }) => {
  return (
    <div className='max-h-svh overflow-hidden'>
      <section
        id='TOP BAR'
        className='flex flex-row justify-between items-center p-4'
      >
        <h1 className='flex flex-row font-bold text-3xl'>
          True <p className='text-text-light'>Do</p>
        </h1>
        <div className='space-x-4'>
          <Link href='/about'>About</Link>
          {user ? (
            <Link href='/app/todo'>App</Link>
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </div>
      </section>

      <Hero></Hero>

      <Features></Features>
    </div>
  );
};

export default Home;
