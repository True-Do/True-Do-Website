'use client';

import { Calendar } from '@/components/ui/calendar';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CalendarPage = ({ user, initial }) => {
  const [date, setDate] = useState(new Date());
  const [addCalendar, setAddCalendar] = useState();
  const [loading, setLoading] = useState(true);
  const [calendarItems, setCalendarItems] = useState();
  const [daysWithItems, setDaysWithItems] = useState([]);
  const supabase = createClient();

  const getCalendarItems = useCallback(() => {
    setCalendarItems(initial);
    setLoading(false);
  }, [initial]);

  async function deleteCalendarItem(calendar_id) {
    const { delete_error } = await supabase
      .from('calendar')
      .delete()
      .eq('user_id', user.id)
      .eq('id', calendar_id);

    let { data, error } = await supabase
      .from('calendar')
      .select()
      .eq('user_id', user.id);

    setCalendarItems(data);
  }

  async function handleAddCalendar() {
    if (addCalendar == '' || addCalendar == undefined || addCalendar == null) {
      return;
    }

    const { insert_error } = await supabase.from('calendar').insert([
      {
        item: addCalendar,
        user_id: user?.id,
        date: date,
        recurring: false,
      },
    ]);

    let { data, error } = await supabase
      .from('calendar')
      .select()
      .eq('user_id', user.id);

    setCalendarItems(data);
  }

  useEffect(() => {
    getCalendarItems();
  }, [getCalendarItems]);

  return (
    <div className='h-[80vh] mt-1 w-full flex items-center'>
      <div className='h-full w-full flex flex-col md:flex-row items-center justify-center px-20'>
        {!loading && (
          <>
            <section className='w-full flex items-center justify-center'>
              <Calendar
                formatters={{
                  formatDay: (date) => {
                    let returnString = date.getDate();
                    return returnString;
                  },
                }}
                mode='single'
                selected={date}
                onSelect={(e) => {
                  setDate(e);
                }}
                className='rounded-md border'
              />
            </section>
            <section className='w-full p-8'>
              <ul className='list-disc'>
                {calendarItems.map((item) => {
                  if (!date) return;
                  // TODO Potential timezone problem?
                  let itemDateWithoutTime = new Date(item.date);
                  if (
                    itemDateWithoutTime.toDateString() != date.toDateString()
                  ) {
                    return;
                  }
                  return (
                    <li className='flex flex-row' key={item.id}>
                      <span className='flex-1'>{item.item}</span>
                      <button
                        onClick={() => {
                          deleteCalendarItem(item.id);
                        }}
                      >
                        <TrashIcon height={28}></TrashIcon>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        )}
      </div>

      {!loading && (
        <div
          id='ADD BUTTON'
          className='fixed bottom-10 md:bottom-5 left-1/2 translate-x-[-50%] z-20'
        >
          <Dialog>
            <DialogTrigger>
              <div
                id='ADD BUTTON'
                className='p-2 border-[1px] dark:border-dark-gray-400 rounded-2xl md:p-0 bg-background dark:bg-black md:border-none'
              >
                <div className='p-4 rounded-xl md:rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md cursor-pointer hover:shadow-sm hover:bg-white dark:hover:bg-dark-accent-hover transition-all md:dark:border-[1px] dark:border-dark-gray-400'>
                  <PlusIcon></PlusIcon>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className='bg-light-off-white dark:text-white max-w-xs'>
              <DialogHeader>
                <DialogTitle className='mb-4'>Add Calendar Item</DialogTitle>
                <DialogDescription>
                  <Input
                    onChange={(event) => {
                      setAddCalendar(event.target.value);
                    }}
                    className='bg-light-off-white dark:text-white border-gray-400 outline-none ring-0 focus:shadow-md dark:placeholder:text-white transition-all'
                    placeholder='Calendar Item'
                    type='text'
                  />
                  <div className='flex justify-end mt-3'>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleAddCalendar();
                        }}
                        className=' border-gray-400 dark:border-dark-gray-400 dark:text-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
                        variant='outline'
                      >
                        Add
                      </Button>
                    </DialogClose>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>{' '}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
