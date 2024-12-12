'use client';

import FeaturesNew from '@/components/home/FeaturesNew';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import { authActions } from '@/lib/slices/authSlice';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='overflow-x-hidden'>
      <section
        id='TOP BAR'
        className='flex flex-row justify-between items-center p-2 max-w-4xl mx-auto'
      >
        <Link href='/'>
          <h1 className='flex flex-row font-bold text-2xl'>
            True <p className='text-text-light'>Do</p>
          </h1>
        </Link>
        <div className='space-x-4'>
          <Link
            className='p-1 rounded-md hover:opacity-30 text-sm font-semibold  transition-all'
            href='/about'
          >
            About
          </Link>
          {user ? (
            <Link
              className='p-1 rounded-md hover:opacity-30 text-sm font-semibold  transition-all'
              href='/app/todo'
            >
              App
            </Link>
          ) : (
            <Link
              className='p-1 rounded-md hover:opacity-30 text-sm font-semibold  transition-all'
              href='/login'
            >
              Login
            </Link>
          )}
        </div>
      </section>

      <hr className='w-svw border-dark-gray-200 dark:border-white dark:opacity-10' />

      <div className='max-w-4xl mx-auto space-y-12 md:space-y-24'>
        <Hero></Hero>
        <FeaturesNew></FeaturesNew>
      </div>

      <hr className='w-svw border-dark-gray-200 dark:border-white dark:opacity-10' />

      <Footer></Footer>
    </div>
  );
};

export default Home;
