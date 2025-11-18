'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InlineWidget } from 'react-calendly';

const BookACallButton = () => {
  return (
    <div className='mt-4'>
      <Dialog>
        <DialogTrigger asChild>
          <button className='font-funnel block text-2xl font-light px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
            Book a Call
          </button>
        </DialogTrigger>
        <DialogContent>
          <InlineWidget url='https://calendly.com/nikolay-tetradov/chat-to-alya' />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookACallButton;
