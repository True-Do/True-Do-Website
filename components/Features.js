'use client';

import { motion } from 'framer-motion';

const Features = () => {
  return (
    <motion.section
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', delay: 0.5 }}
      id='FEATURES'
      className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between p-4 md:p-16 md:px-24 overflow-hidden'
    >
      <div className='md:flex md:flex-col md:items-start'>
        <h2 className='text-xl md:text-3xl font-semibold'>Todo</h2>
        <p className='text-sm md:text-lg text-left'>
          Get your daily tasks <br className='md:' /> done with Todo
        </p>
      </div>
      <div className='md:flex md:flex-col md:items-center'>
        <h2 className='text-xl md:text-3xl font-semibold'>Notes</h2>
        <p className='text-sm md:text-lg text-center'>
          Jot down your <br className='md:' /> thoughts with Notes
        </p>
      </div>
      <div className='md:flex md:flex-col md:items-end'>
        <h2 className='text-xl md:text-3xl font-semibold'>Calendar</h2>
        <p className='text-sm md:text-lg text-right'>
          Organize your day <br className='md:' /> with Calendar
        </p>
      </div>
    </motion.section>
  );
};

export default Features;
