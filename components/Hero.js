'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween' }}
      id='HERO'
      className='text-3xl p-3 pl-4 md:p-4 font-semibold mt-8 md:mt-12 md:text-5xl md:flex md:flex-col md:items-center'
    >
      True Do is Your{' '}
      <p className='text-text-light'>
        Productivity <br className='md:hidden' /> Powerhouse
      </p>
    </motion.section>
  );
};

export default Hero;
