'use client';

import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import clip from 'text-clipper';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PlusIcon } from '@radix-ui/react-icons';

const Notes = ({ user, initial }) => {
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const getData = useCallback(async () => {
    setNotes(initial);
    setLoading(false);
  }, [initial]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className='py-4 px-4'>
      <div className='h-full pb-32 md:pb-24'>
        {!loading && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 5 }}>
            <Masonry gutter='.75rem'>
              {notes.map((note) => {
                return (
                  <Link
                    href={`/app/note?id=${note.id}`}
                    key={note.id}
                    id={note.id}
                  >
                    <div
                      key={note.id}
                      className='shadow-md flex flex-col rounded-lg bg-light-off-white dark:bg-dark-accent p-4 space-y-2 hover:bg-white dark:hover:bg-dark-accent-hover hover:shadow-sm transition-all border-[1px] dark:border-dark-gray-400'
                    >
                      <h2 className='text-xl font-bold break-words'>
                        {note.title}
                      </h2>
                      <div className='text-sm notes-preview text-ellipsis'>
                        {parse(
                          clip(note.note, 140, { html: true, maxLines: 5 })
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>

      <div
        id='ADD BUTTON'
        className='fixed bottom-12 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
      >
        <Link href={'/app/note?id=new'} className=''>
          <div className='p-2 rounded-full md:p-0 bg-background dark:bg-black'>
            <div className='p-4 rounded-full md:rounded-xl bg-light-off-white dark:bg-dark-gray-600 shadow-md hover:bg-white dark:hover:bg-dark-accent-hover hover:shadow-sm transition-all md:border-[1px] dark:border-dark-gray-400'>
              <PlusIcon></PlusIcon>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
