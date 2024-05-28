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
    const { data, error } = await supabase
      .from('note')
      .select()
      .eq('user_id', user.id);

    setNotes(data);
    setLoading(false);
  }, [supabase, user.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className='py-4 px-4'>
      <div className='h-full'>
        {!loading && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 5 }}>
            <Masonry gutter='.75rem'>
              {notes.map((note) => {
                let short_note =
                  note.note.split('><').slice(0, 6).join('><') + '>';

                return (
                  <Link
                    href={`/app/note?id=${note.id}`}
                    key={note.id}
                    id={note.id}
                  >
                    <div
                      key={note.id}
                      className='shadow-md flex flex-col rounded-xl bg-light-off-white p-4 space-y-2 hover:bg-white hover:shadow-sm transition-all'
                    >
                      <h2 className='text-xl font-bold'>{note.title}</h2>
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
          <div className='p-2 rounded-full md:p-0 bg-background'>
            <div className='p-4 rounded-full md:rounded-xl bg-light-off-white shadow-md hover:bg-white hover:shadow-sm transition-all'>
              <PlusIcon></PlusIcon>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
