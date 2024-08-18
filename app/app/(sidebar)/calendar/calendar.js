'use client';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createClient } from '@/utils/supabase/client';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ user, initial }) => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(moment(Date.now()).toDate());
  const [selected, setSelected] = useState(false);
  const [startEnd, setStartEnd] = useState([Date.now(), Date.now()]);
  const [events, setEvents] = useState();
  const [addEvent, setAddEvent] = useState('');
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const getEvents = useCallback(() => {
    let formatted = [];
    initial.map((data) => {
      let formattedData = {};
      formattedData['start'] = moment(data.start).toDate();
      formattedData['end'] = moment(data.end).toDate();
      formattedData['title'] = data.title;
      console.log(formattedData);
      formatted.push(formattedData);
    });
    setEvents(formatted);
    setLoading(false);
  }, [initial]);

  async function handleAddEvent() {
    if (addEvent == '' || addEvent == undefined || addEvent == null) {
      return;
    }

    const { insert_error } = await supabase.from('calendar').insert([
      {
        title: addEvent,
        user_id: user?.id,
        start: moment(startEnd[0]).format(),
        end: moment(startEnd[1]).format(),
      },
    ]);

    let { data, error } = await supabase
      .from('calendar')
      .select()
      .eq('user_id', user.id);

    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const components = {
    // event: (event) => {
    //   console.log(event);
    // },
  };

  return (
    <>
      {!loading && (
        <div className='h-[83vh] md:h-[88vh] flex flex-col text-white'>
          <section
            id='Toolbar'
            className='py-3 flex flex-row items-center justify-between'
          >
            <section className='space-x-2'>
              <button
                onClick={() => {
                  if (view == Views.MONTH) {
                    console.log(date);
                    setDate(moment(date).subtract(1, 'M').toDate());
                  }
                  if (view == Views.WEEK) {
                    setDate(moment(date).subtract(1, 'w').toDate());
                  }
                  if (view == Views.DAY) {
                    setDate(moment(date).subtract(1, 'd').toDate());
                  }
                }}
                className='p-2 py-1 border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                {'<'}
              </button>
              <button
                onClick={() => {
                  setDate(moment(Date.now()).toDate());
                }}
                className='p-2 py-1 border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                Today
              </button>
              <button
                onClick={() => {
                  if (view == Views.MONTH) {
                    console.log(date);
                    setDate(moment(date).add(1, 'M').toDate());
                  }
                  if (view == Views.WEEK) {
                    setDate(moment(date).add(1, 'w').toDate());
                  }
                  if (view == Views.DAY) {
                    setDate(moment(date).add(1, 'd').toDate());
                  }
                }}
                className='p-2 py-1 border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                {'>'}
              </button>
            </section>

            <section>
              {date.toLocaleString('default', { month: 'short' })}{' '}
              {date.getDate()}
            </section>
            <section className='space-x-1 flex flex-row'>
              <button
                onClick={() => {
                  setView(Views.MONTH);
                }}
                className='p-2 py-1 border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                M
              </button>
              <button
                onClick={() => {
                  setView(Views.WEEK);
                }}
                className='p-2 py-1 hidden md:flex border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                W
              </button>
              <button
                onClick={() => {
                  setView(Views.DAY);
                }}
                className='p-2 py-1 border-dark-gray-400 border-[1px] rounded-md bg-dark-gray-700 hover:bg-dark-gray-400 transition-all'
              >
                D
              </button>
            </section>
          </section>
          <Calendar
            events={events}
            view={view}
            toolbar={false}
            date={date}
            localizer={localizer}
            components={components}
            onNavigate={(date) => {
              setDate(date);
            }}
            onView={(view) => {
              setView(view);
            }}
            onSelectSlot={({ start, end }) => {
              setStartEnd([start, end]);
              if (!selected) {
                setSelected(true);
              }
              console.log(selected);
            }}
            selectable
          />
        </div>
      )}
      <Dialog open={selected} onOpenChange={setSelected}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-white'>Add Event</DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-white'>
            <Input
              value={addEvent}
              onChange={(e) => setAddEvent(e.target.value)}
            ></Input>
            <div className='flex flex-row justify-between mt-4'>
              <div>
                <span>Start: </span>
                <DatePicker
                  className='bg-transparent border border-dark-gray-400 rounded-md p-2 text-white w-full'
                  selected={startEnd[0]}
                  showTimeSelect
                  dateFormat='MMMM d, yyyy h:mm aa'
                ></DatePicker>
              </div>
              <div>
                <span>End: </span>
                <DatePicker
                  className='bg-transparent border border-dark-gray-400 rounded-md p-2 text-white w-full'
                  selected={startEnd[1]}
                  showTimeSelect
                  dateFormat='MMMM d, yyyy h:mm aa'
                ></DatePicker>
              </div>
            </div>
            <div className='flex justify-end mt-3'>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAddEvent();
                  }}
                  className='  border-gray-400 dark:border-dark-gray-400 dark:text-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
                  variant='outline'
                >
                  Add
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarPage;
