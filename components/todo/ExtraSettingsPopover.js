'use client';

import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Cross1Icon,
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';

const IconSize = '20px';

const ExtraSettingsPopover = ({ deleteCategory }) => {
  return (
    <Popover id='Extra Settings'>
      <PopoverTrigger>
        <DotsVerticalIcon height={IconSize} width={IconSize}></DotsVerticalIcon>
      </PopoverTrigger>

      <PopoverContent>
        <Button
          variant='outline'
          size='sm'
          className='bg-light-off-white hover:bg-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 transition-all border-none'
          onClick={() => {
            deleteCategory(category.id);
          }}
        >
          <TrashIcon></TrashIcon>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ExtraSettingsPopover;
