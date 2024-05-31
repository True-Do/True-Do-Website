'use client';

import { Button } from '@/components/ui/button';
import { login, signup, oauth } from './actions';

import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  return (
    <div className='screen-size w-full flex justify-center md:flex md:flex-row'>
      <div className='w-full hidden md:block bg-[url("/about-1.jpg")]'></div>
      <div className='w-full h-full fixed md:hidden bg-[url("/about-1.jpg")]'></div>

      <div className='z-10 flex items-center justify-center w-3/4 h-[75svh] md:h-svh my-auto'>
        <div className='w-full h-full md:min-h-svh flex flex-col items-center justify-center bg-light-off-white dark:bg-black rounded-3xl md:rounded-none'>
          <div className='w-1/2 '>
            <h1 className='text-[1.7rem] font-bold mb-2'>
              Login to True <span className='text-text-light'>Do</span>
            </h1>

            <p className='mb-8 text-sm'>
              True Do is Your Productivity <br />
              Powerhouse
            </p>

            <form className='flex flex-col'>
              <Label className='mb-1' htmlFor='email'>
                Email Address
              </Label>
              <Input
                className='bg-light-off-white ring-0 border-gray-300 dark:border-dark-gray-400 dark:bg-black focus:bg-white dark:focus:bg-dark-accent dark:shadow-dark-gray-400 transition-all outline-none shadow-sm hover:shadow-none'
                placeholder='Email'
                id='email'
                name='email'
                type='email'
                required
              />
              <Label className='mt-5 mb-1' htmlFor='password'>
                Password
              </Label>

              <Input
                className='bg-light-off-white ring-0 border-gray-300 dark:border-dark-gray-400 dark:bg-black focus:bg-white dark:focus:bg-dark-accent dark:shadow-dark-gray-400 transition-all outline-none shadow-sm hover:shadow-none'
                placeholder='Password'
                id='password'
                name='password'
                type='password'
                required
              />
              <div className='flex flex-row justify-center mt-4'>
                <Button
                  variant='secondary'
                  className='bg-text-light text-white shadow-black hover:bg-text-light hover:shadow-md transition-all w-full mr-3 dark:bg-dark-gray-400 dark:hover:bg-dark-gray-300'
                  size='sm'
                  formAction={login}
                >
                  Log in
                </Button>
                <Button
                  variant='secondary'
                  size='sm'
                  className='bg-text-light text-white shadow-black hover:bg-text-light hover:shadow-md transition-all w-full dark:bg-dark-gray-400 dark:hover:bg-dark-gray-300'
                  formAction={signup}
                >
                  Sign up
                </Button>
              </div>
            </form>

            <div className='flex flex-row w-full justify-between items-center space-x-2 mt-4'>
              <div className='border-t-[1px] border-gray-500 w-full'></div>
              <p>or</p>
              <div className='border-t-[1px] border-gray-500 w-full'></div>
            </div>

            <div className='flex flex-col space-y-2 mt-4'>
              <button
                onClick={() => {
                  supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: 'https://true-do.vercel.app/auth/callback',
                      // redirectTo: 'https://localhost:3000/auth/callback',
                      queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                      },
                    },
                  });
                }}
                className='w-full px-4 py-2 text-base border flex items-center gap-2 border-slate-400 dark:border-dark-gray-400 rounded-lg text-slate-700 dark:text-white hover:border-slate-400 dark:hover:border-dark-gray-300 hover:text-slate-900 dark:hover:text-dark-gray-100 hover:shadow transition duration-150'
              >
                <Image
                  width={1}
                  height={1}
                  className='size-5'
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  loading='lazy'
                  alt='google logo'
                />
                <span className='ml-2'>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
