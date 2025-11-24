'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimatedTextWordsProps = {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
};

export const AnimatedTextWords = ({
  text,
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.15,
}: AnimatedTextWordsProps) => {
  let items: (string | React.ReactNode)[];
  const isString = typeof text === 'string' || typeof children === 'string';

  if (typeof text === 'string') {
    items = text.trim().split(/\s+/);
  } else if (typeof children === 'string') {
    items = children.trim().split(/\s+/);
  } else {
    items = React.Children.toArray(children);
  }
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ease: [0.19, 1, 0.22, 1] as const,
        duration: duration,
      },
    },
  };

  return (
    <motion.div
      style={{ display: 'inline' }}
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className={className}
      custom={1}
    >
      {items.map((item, index) => (
        <motion.div
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: text ? '0.25em' : 0,
          }}
          key={index}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};
