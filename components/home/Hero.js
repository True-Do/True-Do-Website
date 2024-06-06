'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween' }}
      id='HERO'
      className='text-3xl p-3 pl-4 md:p-4 font-semibold mt-8 md:mt-2 flex flex-col text-center space-y-12 md:text-5xl md:flex md:flex-row md:items-center overflow-hidden'
    >
      <div className='w-full'>
        True Do is Your{' '}
        <p className='text-text-light'>
          Productivity <br className='' /> Powerhouse
        </p>
      </div>
      <div className='w-3/4 md:w-full mx-auto' id='ILLUSTRATION'>
        <Image
          src='/landing.png'
          height={1080}
          width={1080}
          layout='responsive'
          alt='Landing Page Illustration'
        />
      </div>
    </motion.section>
  );
};

export default Hero;
