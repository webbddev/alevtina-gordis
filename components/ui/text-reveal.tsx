'use client';

import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

export interface TextRevealProps extends ComponentPropsWithoutRef<'p'> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');

  return (
    <p
      ref={ref}
      className={cn(
        'flex flex-wrap text-black/50 dark:text-white/60',
        className
      )}
      {...props}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className='relative mx-1 lg:mx-1.5'>
      <span className='absolute opacity-30'>{children}</span>
      <motion.span style={{ opacity: opacity }} className=''>
        {children}
      </motion.span>
    </span>
  );
};
