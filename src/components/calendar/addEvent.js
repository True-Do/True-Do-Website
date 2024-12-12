'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';

const AddEvent = ({ open, setOpen, startEnd }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hello</DialogTitle>
        </DialogHeader>
        <DialogDescription>{startEnd[0].getDate()}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
