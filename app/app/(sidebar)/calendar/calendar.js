'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      mode='single'
      selected={date}
      onSelect={setDate}
      className='rounded-md border'
    />
  );
};

export default CalendarPage;
