'use client';
import features from '@/constants/Features';
import { motion } from 'framer-motion';

const FeaturesGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween' }}
      className='mx-auto max-w-5xl pb-24 overflow-hidden'
    >
      <div className='mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 px-4 sm:grid-cols-2 lg:mx-0 md:grid-cols-3 lg:gap-x-8 lg:gap-y-16'>
        {features.map((feature) => (
          <div key={feature.name} className='relative'>
            <div className='flex flex-col'>
              <feature.icon
                className='mb-2 h-5 w-5 text-text-dark dark:text-text-light'
                aria-hidden='true'
              />
              <div className='text-md inline font-semibold text-gray-800 dark:text-gray-100'>
                {feature.name}
              </div>{' '}
              <div className='inline max-w-xs text-sm text-gray-700 dark:text-gray-300'>
                {feature.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturesGrid;
