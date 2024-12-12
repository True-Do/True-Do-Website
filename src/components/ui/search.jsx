'use client';

import * as React from 'react';
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  MagnifyingGlassIcon,
  RocketIcon,
  FilePlusIcon,
} from '@radix-ui/react-icons';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from './button';

export function Search() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        className='px-3 rounded-xl bg-light-off-white dark:bg-dark-gray-700 shadow-md dark:text-white dark:hover:bg-dark-gray-400 flex flex-row items-center space-x-1 border-[1px] dark:border-dark-gray-400'
        onClick={() => {
          setOpen(true);
        }}
      >
        <MagnifyingGlassIcon></MagnifyingGlassIcon>
        <span>Commands</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Actions'>
            <CommandItem
              onSelect={() => {
                window.location.replace('/app/note?id=new');
              }}
            >
              <FilePlusIcon className='mr-2 h-4 w-4' />
              <span>Add A New Note</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.location.replace('/app/todo');
              }}
            >
              <RocketIcon className='mr-2 h-4 w-4' />
              <span>Todo</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.location.replace('/app/notes');
              }}
            >
              <FaceIcon className='mr-2 h-4 w-4' />
              <span>Notes</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.location.replace('/app/calendar');
              }}
            >
              <RocketIcon className='mr-2 h-4 w-4' />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
