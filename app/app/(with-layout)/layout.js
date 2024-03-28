'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const iconSize = 24;

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  console.log();

  return (
    <div className=''>
      <section id='SideBar' className='p-4 flex flex-row items-center'>
        <button
          onClick={() => {
            setMenu(true);
          }}
          className='md:hidden'
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Left Align'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPklEQVR4nO3UwQkAIBADwfRflluY1iAYRNyBeweOkEQ/Isk8fNwKHv1/aQOt8jSCLc9bcLnUgsulFlwuPW0B+GG2kNfDhr8AAAAASUVORK5CYII='
          ></Image>
        </button>
        <h1 className='ml-4 font-bold text-3xl '>True Do</h1>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: 'tween', delay: 0, duration: 0.2 }}
              className='absolute left-0 top-0 w-full screen-size flex flex-row'
            >
              <div className='fixed left-0 top-0 screen-size flex flex-col bg-light-off-white p-4 space-y-1 z-50 rounded-tr-3xl rounded-br-3xl'>
                <Link
                  onClick={() => {
                    setMenu(false);
                  }}
                  href={'/app/todo'}
                  className={
                    path.split('/')[2] == 'todo'
                      ? 'px-2 py-1 rounded-md text-left w-fit transition-all bg-text-dark text-light-off-white'
                      : 'px-2 py-1 rounded-md text-left w-fit transition-all hover:bg-text-light hover:text-light-off-white'
                  }
                >
                  To Do
                </Link>
                <Link
                  onClick={() => {
                    setMenu(false);
                  }}
                  href={'/app/notes'}
                  className={
                    path.split('/')[2] == 'notes'
                      ? 'px-2 py-1 rounded-md text-left w-fit transition-all bg-text-dark text-light-off-white'
                      : 'px-2 py-1 rounded-md text-left w-fit transition-all hover:bg-text-light hover:text-light-off-white'
                  }
                >
                  Notes
                </Link>
                <Link
                  onClick={() => {
                    setMenu(false);
                  }}
                  href={'/app/calendar'}
                  className={
                    path.split('/')[2] == 'calendar'
                      ? 'px-2 py-1 rounded-md text-left w-fit transition-all bg-text-dark text-light-off-white'
                      : 'px-2 py-1 rounded-md text-left w-fit transition-all hover:bg-text-light hover:text-light-off-white'
                  }
                >
                  Calendar
                </Link>
              </div>
              <div
                className='flex-1 bg-transparent'
                onClick={() => {
                  setMenu(false);
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {children}
    </div>
  );
};

export default Layout;
