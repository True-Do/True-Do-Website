'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className='h-[80vh] mt-1 w-full flex items-center'>
      <div className='h-full w-full flex flex-row items-center justify-center px-20'>
        <section className='w-full  flex items-center justify-center'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border'
          />
        </section>
        <section className='w-full p-8'>
          <ul className='list-disc'>
            <li>Do this</li>
            <li>Do this</li>
            <li>Do this</li>
            <li>Do this</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CalendarPage;
