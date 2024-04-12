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
      {!loading && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
          <Masonry gutter='1rem'>
            {notes.map((note) => (
              <Link href={`/app/note?id=${note.id}`} key={note.id} id={note.id}>
                <div
                  key={note.id}
                  className='flex flex-col rounded-xl bg-light-off-white p-4 space-y-2'
                >
                  <h2 className='text-xl font-bold'>{note.title}</h2>
                  <div className='text-sm'>{parse(note.note)}</div>
                </div>
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <div id='ADD BUTTON' className=''>
        <Link href={'/app/note?id=new'} className='fixed bottom-5 left-1/2'>
          <div className='px-4 py-2 rounded-xl bg-light-off-white'>+</div>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
