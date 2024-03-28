'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';

import BubbleMenuComponent from '@/components/BubbleMenuComponent';
import FloatingMenuComponent from '@/components/FloatingMenuComponent';
import ToolTip from '@/components/ToolBar';
import Link from 'next/link';

const Note = () => {
  // const EDITING_MODE = props.params.id == 'new' ? true : false;
  const search = useSearchParams();
  console.log(search.get('id'));

  const NEW_MODE = true;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      TaskList,
      TaskItem,
      Image,
      Youtube,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Your note here',
      }),
    ],
  });

  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    if (editor) {
      setEditorReady(true);
    }
  }, [editor]);

  return (
    <div className='w-full screen-size px-6 pt-6 pb-12  bg-light-off-white text-text-dark leading-3 md:px-8 md:py-6'>
      <section className='flex justify-between' id='Buttons'>
        <div>
          <Link href={'/app/todo'}>Back</Link>
        </div>
        <div className='flex flex-row space-x-2'>
          <p>Done</p>
          <p>Delete</p>
        </div>
      </section>

      <section id='Title' className='mt-4 md:mt-6 '>
        {!NEW_MODE ? (
          <h2 className='text-2xl font-semibold'>
            Title of Note. This is long enough for test.
          </h2>
        ) : (
          <input
            className='bg-transparent text-2xl font-semibold w-full'
            placeholder='Title'
          />
        )}
      </section>

      <section id='Body' className='mt-4 text-base font-normal md:mt-6'>
        {!NEW_MODE ? (
          <p className='prose'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br></br>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the induk a galley of type Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the induk a galley of type Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the induk a galley of type Lorem Ipsum is simpl=m has
            been the induk a galley of type Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            induk a galley of type
          </p>
        ) : (
          <>
            {editorReady && (
              <>
                {/* <BubbleMenuComponent editor={editor}></BubbleMenuComponent>
                <FloatingMenuComponent editor={editor}></FloatingMenuComponent> */}
                <ToolTip editor={editor}></ToolTip>
                <EditorContent editor={editor} placeholder='Your note here' />
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Note;
