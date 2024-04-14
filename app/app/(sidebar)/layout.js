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
    <div className='flex flex-row screen-size'>
      <section id='SIDEBAR' className=''>
        <div className='sticky left-0 top-0 screen-size flex-col bg-light-off-white p-4 space-y-1 z-50 rounded-tr-3xl rounded-br-3xl hidden md:flex shadow-md'>
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
            T
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
            N
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
            C
          </Link>
        </div>

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
                  T
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
                  N
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
                  C
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

      <section id='MAIN PAGE' className='flex-1 py-4 h-svh flex flex-col'>
        <div className='flex flex-row ml-4'>
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
          <h1 className='ml-4 md:ml-0 font-bold text-3xl '>True Do</h1>
        </div>
        <div className='flex-1 overflow-y-scroll'>{children}</div>
      </section>
    </div>
  );
};

export default Layout;
