'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCalendar, FaGear, FaNoteSticky } from 'react-icons/fa6';
import { FaCheckSquare, FaRegCalendar } from 'react-icons/fa';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from '@/components/NavItem';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const mobileIconSize = 25;

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  return (
    <div className='md:flex md:flex-row screen-size'>
      <section id='SIDEBAR' className=''>
        <div className='sticky left-0 top-0 screen-size flex-col bg-light-off-white dark:bg-transparent dark:rounded-none p-2 py-5 space-y-2 z-50 rounded-tr-3xl rounded-br-3xl hidden md:flex shadow-md justify-between'>
          <section className='flex flex-col space-y-2'>
            <NavItem sidebar={true} item={'todo'}>
              <FaCheckSquare size={27} />
            </NavItem>
            <NavItem sidebar={true} item={'notes'}>
              <FaNoteSticky size={27} />
            </NavItem>
            <NavItem sidebar={true} item={'calendar'}>
              <FaCalendar size={27} />
            </NavItem>
          </section>
          <section>
            <Popover>
              <PopoverTrigger>
                <div className='size-10 rounded-md text-center transition-all text-text-dark dark:text-dark-gray-300 hover:text-text-light hover:dark:text-white flex items-center justify-center cursor-pointer'>
                  <FaGear size={27} />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <button>Logout</button>
              </PopoverContent>
            </Popover>
          </section>
        </div>
      </section>

      <section id='MAIN PAGE' className='flex-1 max-h-svh flex flex-col'>
        <div
          id='TITLE'
          className='flex flex-row backdrop-blur-xl dark:backdrop-blur-none dark:bg-black w-full fixed dark:block'
        >
          <Link href={'/'}>
            <h1 className='mr-2 px-3 py-2 rounded-xl md:ml-0 font-bold text-3xl flex flex-row text-text-dark'>
              <span className='dark:text-text-light'>True</span>{' '}
              <span className='text-text-light pl-1'>Do</span>
            </h1>
          </Link>
        </div>

        <div
          id='CHILDREN'
          className='flex-1 overflow-y-scroll pt-12 pb-24 scrollbar scrollbar-track-transparent scrollbar-thumb-dark-gray-600 active:scrollbar-thumb-dark-gray-300 hover:scrollbar-thumb-dark-gray-300'
        >
          {children}
        </div>

        <div
          id='BOTTOM NAV BAR'
          className='fixed bottom-0 left-1/2 translate-x-[-50%] w-5/6 m-auto flex flex-row justify-evenly bg-light-off-white dark:bg-dark-gray-600 py-4 z-10 rounded-xl my-4 md:hidden shadow-md'
        >
          <NavItem item={'todo'}>
            <FaCheckSquare size={mobileIconSize} />
          </NavItem>
          <NavItem item={'notes'}>
            <FaNoteSticky size={mobileIconSize} />
          </NavItem>
          <div className='size-10'></div>
          <NavItem item={'calendar'}>
            <FaCalendar size={mobileIconSize} />
          </NavItem>
          <Popover>
            <PopoverTrigger>
              <div
                className={
                  'size-10 rounded-md text-center transition-all text-text-dark dark:text-dark-gray-300 hover:text-text-light hover:dark:text-white flex items-center justify-center cursor-pointer'
                }
              >
                <div className='flex flex-col justify-center items-center h-full'>
                  <FaGear size={mobileIconSize}></FaGear>
                  <p className='text-[.6rem]'>Settings</p>{' '}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className='dark:bg-dark-gray-700 p-2'>
              <Button className='dark:bg-transparent dark:hover:bg-dark-gray-500 dark:text-white'>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
};

export default Layout;
