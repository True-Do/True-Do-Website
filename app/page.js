import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className=''>
      <Link href='/app/note?new'>Note</Link>
    </div>
  );
};

export default Home;
