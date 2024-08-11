'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCalendar, FaGear, FaNoteSticky } from 'react-icons/fa6';
import { FaCheckSquare, FaRegCalendar } from 'react-icons/fa';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from '@/components/sidebar/NavItem';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/ui/search';

const mobileIconSize = 25;

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  return (
    <div className='md:flex md:flex-row screen-size bg-background dark:bg-black'>
      {/* Sidebar for large screens */}
      <aside id='SIDEBAR' className=''>
        <div className='sticky left-0 top-0 screen-size flex-col bg-light-off-white dark:bg-transparent dark:rounded-none p-2 py-5 space-y-2 z-50 rounded-tr-3xl rounded-br-3xl hidden md:flex shadow-md justify-between dark:border-r-dark-gray-400 dark:border-r-[1px] '>
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
                <Link href={'/auth/logout'}>Logout</Link>
              </PopoverContent>
            </Popover>
          </section>
        </div>
      </aside>

      <section id='MAIN PAGE' className='flex-1 max-h-svh flex flex-col'>
        {/* Top Bar */}

        {/* Children */}
        <section
          id='CHILDREN'
          className='flex-1 overflow-y-scroll pt-1 md:pt-2 px-2 md:px-4 scrollbar scrollbar-track-transparent scrollbar-thumb-dark-gray-600 active:scrollbar-thumb-dark-gray-300 hover:scrollbar-thumb-dark-gray-300'
        >
          {children}
        </section>

        {/* Mobile Navbar */}
        <section
          id='BOTTOM NAV BAR'
          className='fixed bottom-0 left-1/2 translate-x-[-50%] w-5/6 m-auto flex flex-row justify-evenly bg-light-off-white dark:bg-dark-gray-600 dark:border-dark-gray-400 dark:border-[1px] py-4 z-10 rounded-xl my-4 md:hidden shadow-md'
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
              <Link
                href={'/auth/logout'}
                className='dark:bg-transparent dark:hover:bg-dark-gray-500 dark:text-white'
              >
                Logout
              </Link>
            </PopoverContent>
          </Popover>
        </section>
      </section>
    </div>
  );
};

export default Layout;
