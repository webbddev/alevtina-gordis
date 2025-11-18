'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InlineWidget } from 'react-calendly';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';


const BookACallButton = () => {
  return (
    <div className='mt-4'>
      <Dialog>
        <DialogTrigger asChild>
          <button className='relative inline-flex h-9 overflow-hidden rounded-xl p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 '>
            <span className='absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-gray-900/90 px-4 py-1 text-sm font-medium text-white backdrop-blur-xl hover:bg-gray-800/80 transition-colors duration-500'>
              <motion.div
                className='flex items-center gap-2'
                whileHover='hover'
              >
                <motion.span
                  variants={{
                    hover: {
                      rotate: [0, 15, -15, 15, -15, 0],
                      transition: { duration: 1 },
                    },
                  }}
                >
                  <Phone size={16} />
                </motion.span>
                <span>BOOK A CALL</span>
              </motion.div>
            </span>
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
