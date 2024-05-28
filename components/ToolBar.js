'use client';

import { useCallback } from 'react';

import Image from 'next/image';
import Icons from '@/constants/Icons';

const iconSize = 20;

const ToolTip = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-row flex-wrap space-x-3 mb-2 p-2 px-4 rounded-xl justify-center md:justify-start sticky top-5 bg-light-off-white dark:text-white dark:bg-dark-gray-500 z-50'>
      <section className='space-x-3 flex flex-row'>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          h2
        </button>
      </section>

      <div className='border-r-[1px] border-black dark:border-white my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <div className='dark:hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='bold'
              src={Icons['bold-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='bold'
              src={Icons['bold-light']}
            ></Image>
          </div>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'dark:bg-dark-gray-400 p-1 rounded-md transition-all'
              : 'hover:dark:bg-dark-gray-400 p-1 rounded-md transition-all'
          }
        >
          <div className='dark:hidden'>
            <Image
              height={iconSize}
              width={iconSize}
              alt='italics'
              src={Icons['italics-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='italics'
              src={Icons['italics-light']}
            ></Image>
          </div>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <div className='dark:hidden'>
            <Image
              height={iconSize}
              width={iconSize}
              alt='strike'
              src={Icons['strike-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='strike'
              src={Icons['strike-light']}
            ></Image>
          </div>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <div className='dark:hidden'>
            <Image
              height={iconSize}
              width={iconSize}
              alt='code'
              src={Icons['code-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='code'
              src={Icons['code-light']}
            ></Image>
          </div>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
        >
          <div className='dark:hidden'>
            <Image
              width={iconSize}
              height={iconSize}
              alt='Check List'
              src={Icons['checklist-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='Check List'
              src={Icons['checklist-light']}
            ></Image>
          </div>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <div className='dark:hidden'>
            <Image
              width={iconSize}
              height={iconSize}
              alt='Bullet List'
              src={Icons['bulletlist-dark']}
            ></Image>
          </div>
          <div className='dark:block hidden'>
            <Image
              className='dark:text-white'
              height={iconSize}
              width={iconSize}
              alt='Bullet List'
              src={Icons['bulletlist-light']}
            ></Image>
          </div>
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='HR'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nO3RQQ0AAAgCQPuX1gAGcOrdxh9GBAAAAABP5dI004UMOfsIAAAAAOcVg2G3SeBKR5YAAAAASUVORK5CYII='
          ></Image>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <section className='space-x-3 flex flex-row items-center'>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Left Align'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPklEQVR4nO3UwQkAIBADwfRflluY1iAYRNyBeweOkEQ/Isk8fNwKHv1/aQOt8jSCLc9bcLnUgsulFlwuPW0B+GG2kNfDhr8AAAAASUVORK5CYII='
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Center Align'
            src={Icons['center-dark']}
          ></Image>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={''}
        >
          <Image
            height={iconSize}
            width={iconSize}
            alt='Right Align'
            src={Icons['right-dark']}
          ></Image>
        </button>
      </section>

      <div className='border-r-[1px] border-black my-1'></div>

      <button onClick={addImage}>
        <Image
          height={iconSize}
          width={iconSize}
          alt='image'
          src={Icons['image-dark']}
        ></Image>
      </button>
    </div>
  );
};

export default ToolTip;
