'use client';
import Image from 'next/image';

import { BubbleMenu } from '@tiptap/react';

import bold from '@/public/bold.svg';
import italics from '@/public/italic.svg';

const BubbleMenuComponent = ({ editor }) => {
  return (
    <div>
      <BubbleMenu
        className='bg-text-light text-accent rounded-xl p-2 space-x-2 transition-all'
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
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
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'font-bold' : ''}
        >
          <Image className='size-3' src={bold} alt='bold' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'italic' : ''}
        >
          <Image className='size-3' src={italics} alt='bold' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          code
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          task list
        </button>
      </BubbleMenu>
    </div>
  );
};

export default BubbleMenuComponent;
