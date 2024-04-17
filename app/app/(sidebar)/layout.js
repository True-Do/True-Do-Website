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

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  return (
    <div className='md:flex md:flex-row screen-size'>
      <section id='SIDEBAR' className=''>
        <div className='sticky left-0 top-0 screen-size flex-col bg-light-off-white p-2 py-5 space-y-2 z-50 rounded-tr-3xl rounded-br-3xl hidden md:flex shadow-md'>
          <NavItem sidebar={true} item={'todo'}>
            <FaCheckSquare size={27} />
          </NavItem>
          <NavItem sidebar={true} item={'notes'}>
            <FaNoteSticky size={27} />
          </NavItem>
          <NavItem sidebar={true} item={'calendar'}>
            <FaCalendar size={27} />
          </NavItem>
        </div>
      </section>

      <section id='MAIN PAGE' className='flex-1 max-h-svh flex flex-col'>
        <div id='TITLE' className='flex flex-row backdrop-blur-xl w-full fixed'>
          <Link href={'/'}>
            <h1 className='mr-2 px-3 py-2 rounded-xl md:ml-0 font-bold text-3xl flex flex-row'>
              True <p className='text-text-light pl-1'>Do</p>
            </h1>
          </Link>
        </div>

        <div id='CHILDREN' className='flex-1 overflow-y-scroll pt-12 pb-24'>
          {children}
        </div>

        <div
          id='BOTTOM NAV BAR'
          className='fixed bottom-0 left-1/2 translate-x-[-50%] w-3/4 m-auto flex flex-row justify-evenly bg-light-off-white p-2 px-2 z-10 rounded-xl my-4 md:hidden shadow-md'
        >
          <NavItem item={'todo'}>
            <FaCheckSquare size={20} />
          </NavItem>
          <NavItem item={'notes'}>
            <FaNoteSticky size={20} />
          </NavItem>
          <div className='size-10'></div>
          <NavItem item={'calendar'}>
            <FaCalendar size={20} />
          </NavItem>
          <Popover>
            <PopoverTrigger>
              <div
                className={
                  'size-10 rounded-md text-center transition-all text-text-dark hover:text-text-light flex items-center justify-center cursor-pointer'
                }
              >
                <div className='flex flex-col justify-center items-center h-full'>
                  <FaGear size={20}></FaGear>
                  <p className='text-[.6rem]'>Settings</p>{' '}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <button>Logout</button>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
};

export default Layout;
