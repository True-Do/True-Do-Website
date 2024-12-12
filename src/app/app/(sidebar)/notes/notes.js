'use client';
import useSWR from 'swr';
import Link from 'next/link';
import parse from 'html-react-parser';
import clip from 'text-clipper';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PlusIcon } from '@radix-ui/react-icons';
import { Search } from '@/components/ui/search';
import { createClient } from '@/lib/supabase/client';

const fetcher = async (url) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(url).select();
  if (error) throw new Error(error.message);
  return data;
};

const Notes = ({ user }) => {
  const { data: notes, error } = useSWR(`note?user_id=eq.${user.id}`, fetcher);

  if (error) return <div>Error loading notes</div>;
  if (!notes) return <div></div>;

  return (
    <div className='py-1'>
      {/* Menu Bar */}
      <section id='Menu Bar' className='my-1 flex flex-row space-x-2 mb-3'>
        <Search />
      </section>

      <div className='h-full pb-32 md:pb-24'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 5 }}>
          <Masonry gutter='.6rem'>
            {notes.map((note) => (
              <Link href={`/app/note?id=${note.id}`} key={note.id} id={note.id}>
                <div
                  key={note.id}
                  className='shadow-md flex flex-col rounded-lg bg-light-off-white dark:bg-dark-gray-800 p-4 space-y-2 hover:bg-white dark:hover:bg-dark-accent-hover hover:shadow-sm transition-all border-[1px] dark:border-dark-gray-400'
                >
                  <h2 className='text-xl font-bold break-words'>
                    {note.title}
                  </h2>
                  <div className='text-sm notes-preview text-ellipsis'>
                    {parse(clip(note.note, 140, { html: true, maxLines: 5 }))}
                  </div>
                </div>
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <div
        id='ADD BUTTON'
        className='fixed bottom-12 md:bottom-5 left-1/2 translate-x-[-50%] mx-auto z-20'
      >
        <Link href={'/app/note?id=new'}>
          <div className='p-2 rounded-2xl md:p-0 bg-background dark:bg-black border-[1px] dark:border-dark-gray-400 md:border-none'>
            <div className='p-4 rounded-xl md:rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md hover:bg-white dark:hover:bg-dark-accent-hover hover:shadow-sm transition-all md:border-[1px] dark:border-dark-gray-400'>
              <PlusIcon />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
