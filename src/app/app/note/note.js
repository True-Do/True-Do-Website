'use client';

import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';

import ToolTip from '@/components/sidebar/ToolBar';
import Link from 'next/link';

import { createClient } from '@/lib/supabase/client';
import { ResetIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import revalidate from './actions';

// TODO Add timer for ratelimiting?

const Note = ({ user, initial }) => {
  const router = useRouter();

  const search = useSearchParams();
  const isNewNote = search.get('id') == 'new' ? true : false;
  const [id, setId] = useState(search.get('id'));

  const titleInputRef = useRef();

  const [note, setNote] = useState({ title: '', note: '' });
  const supabase = createClient();

  const [editorReady, setEditorReady] = useState(false);
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

    // Call update (id != new) or insert (id == new)
    // on clicking out of the editor
    onBlur: async ({ editor }) => {
      const _note = editor.getHTML();
      setNote((prevState) => {
        return {
          ...prevState,
          note: _note,
        };
      });

      if (id == 'new') {
        await insertNote(_note, note.title);
      } else {
        await updateNote(_note, note.title);
      }
    },
  });

  // Called when there's already a note
  async function updateNote(note, title) {
    title = title || '';
    note = note || '';

    if (note == '' && title == '') {
      return;
    }

    let { data, error } = await supabase.from('note').upsert([
      {
        id: id,
        title: title,
        note: note,
        updated_at: new Date(),
        user_id: user?.id,
      },
    ]);
  }

  // Called when id == new,
  // once data is inserted, update id internally
  // further changes will use updateNote
  async function insertNote(note, title) {
    title = title || '';
    note = note || '';

    if ((note == '' || note == '<p></p>') && title == '') {
      return;
    }

    let { data, error } = await supabase
      .from('note')
      .insert([
        {
          title: title,
          note: note,
          updated_at: new Date(),
          user_id: user?.id,
        },
      ])
      .select();

    setId(data[0].id);
    search['id'] = data[0].id;
  }

  async function deleteNote(note, title) {
    let { data, error } = await supabase
      .from('note')
      .delete()
      .eq('user_id', user.id)
      .eq('id', search.get('id'));

    router.replace('/app/notes');
  }

  // Get data, Set State, Set tiptap editor content,
  // Set title input data
  const getData = useCallback(async () => {
    setNote(initial);

    if (editor) {
      editor.commands.setContent(initial.note);
      setEditorReady(true);
    }

    titleInputRef.current.value = initial.title;
  }, [initial, editor]);

  // Will wait till editor is ready
  // once editor is ready, then check id
  // if id == new, don't populate anything
  // if id != new, call getData() and populate editor and title
  useEffect(() => {
    if (!editor) {
      return;
    }

    if (isNewNote) {
      setEditorReady(true);
      return;
    }

    getData();
  }, [editor, isNewNote, getData]);

  return (
    <div className='w-full screen-size px-6 pt-6 pb-12  bg-light-off-white text-text-dark leading-3 md:px-8 md:py-6 dark:bg-dark-gray-800 dark:text-white'>
      <section id='BUTTONS' className='flex justify-between'>
        <div>
          <Link
            onClick={() => {
              revalidate();
            }}
            href={'/app/notes'}
          >
            <ResetIcon height={20} width={20} />
          </Link>
        </div>
        <div className='flex flex-row space-x-2'>
          <button
            onClick={() => {
              deleteNote();
            }}
          >
            <TrashIcon height={20} width={20} />
          </button>
        </div>
      </section>

      <section id='TITLE' className='mt-4 md:mt-6 dark:placeholder:text-white'>
        <input
          onBlur={async (e) => {
            let title = e.target.value;
            setNote((prevState) => {
              return {
                ...prevState,
                title: title,
              };
            });

            if (id == 'new') {
              await insertNote(note.note, title);
            } else {
              await updateNote(note.note, title);
            }
          }}
          className='bg-transparent text-2xl font-semibold w-full dark:placeholder:text-white'
          placeholder='Title'
          ref={titleInputRef}
        />
      </section>

      <section id='BODY' className='mt-4 text-base font-normal md:mt-6'>
        {editorReady && (
          <div>
            <ToolTip editor={editor}></ToolTip>
            <EditorContent editor={editor} placeholder='Your note here' />
          </div>
        )}
      </section>
    </div>
  );
};

export default Note;
