'use client';

import { createClient } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Notes = ({ user, initial }) => {
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(true);
  const [insertTodo, setInsertTodo] = useState('');
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
              {notes.map((note) => (
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
                    <div className='text-sm'>{parse(note.note)}</div>
                  </div>
                </Link>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>

      <div id='ADD BUTTON' className='fixed bottom-5 left-1/2'>
        <Link href={'/app/note?id=new'} className=''>
          <div className='px-4 py-2 rounded-xl bg-light-off-white shadow-md hover:bg-white hover:shadow-sm transition-all'>
            +
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
