'use client';

import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import React from 'react';

const FloatingMenuComponent = ({ editor }) => {
  return (
    <div>
      <FloatingMenu
        className='bg-text-light text-accent rounded-xl p-2 mt-2 ml-4 text-sm space-x-2 transition-all'
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={''}
        >
          HR
        </button>
      </FloatingMenu>
    </div>
  );
};

export default FloatingMenuComponent;
