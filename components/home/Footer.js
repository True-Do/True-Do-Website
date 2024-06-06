import React from 'react';

const Footer = () => {
  return (
    <div className='flex flex-row items-center py-4 max-w-4xl mx-auto font-thin opacity-75 text-sm px-4'>
      Made by{' '}
      <a
        className='ml-1'
        href='https://aaryan-dongre.vercel.app/'
        target='_blank'
      >
        Aaryan Dongre / Mulitet4
      </a>
    </div>
  );
};

export default Footer;
