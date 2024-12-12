'use client';

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DotsVerticalIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';

const IconSize = '20px';

const ExtraSettingsPopover = ({ deleteCategory, category }) => {
  const [changeInput, setChangeInput] = useState(category.category);
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
        <Dialog>
          <DialogTrigger>
            <Button
              variant='outline'
              size='sm'
              className='bg-light-off-white hover:bg-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 transition-all border-none'
            >
              <Pencil1Icon></Pencil1Icon>
            </Button>
          </DialogTrigger>
          <DialogContent className='text-white'>
            <DialogTitle>Rename Category</DialogTitle>
            <Input
              value={changeInput}
              onChange={(e) => {
                setChangeInput(e.target.value);
              }}
            ></Input>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  handleChangeCategory(category.id, changeInput);
                }}
                className='  border-gray-400 dark:border-dark-gray-400 dark:text-white dark:bg-dark-gray-800 hover:dark:bg-dark-gray-500 bg-transparent text-black hover:bg-light-off-white hover:shadow-md transition-all'
                variant='outline'
              >
                Rename
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
};

export default ExtraSettingsPopover;
