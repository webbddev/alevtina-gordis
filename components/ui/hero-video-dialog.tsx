'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayIcon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface HeroVideoProps {
  animationStyle?:
    | 'from-center'
    | 'from-top'
    | 'from-bottom'
    | 'top-in-bottom-out';
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  aspectRatio?: string;
}

const animationVariants = {
  'from-center': {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  },
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  },
} as const

export function HeroVideoDialog({
  animationStyle = 'from-center',
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Video thumbnail',
  className,
  aspectRatio = 'aspect-video',
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';

    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url; // Already an embed link
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return original url if not a standard YouTube link
  };

  const embedUrl = getYouTubeEmbedUrl(videoSrc);

  return (
    <div className={cn('relative', className, aspectRatio)}>
      <button
        type='button'
        onClick={() => setIsVideoOpen(true)}
        className='group relative flex size-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl'
        aria-label='Play video'
      >
        <div className='absolute inset-0 z-[1] bg-neutral-950/30 transition-colors duration-300 group-hover:bg-neutral-950/10' />
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          fill
          className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='relative z-[2] rounded-full bg-neutral-900/50 p-4 ring-1 backdrop-blur-md'>
          <PlayIcon className='size-8 fill-white text-white' />
        </div>
      </button>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            key='video-player'
            variants={selectedAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg'
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className='relative aspect-video w-full max-w-4xl'
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setIsVideoOpen(false)}
                className='absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black'
              >
                <XIcon className='size-5' />
              </motion.button>
              <div className='relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white'>
                <iframe
                  src={embedUrl}
                  title='Hero Video player'
                  className='size-full rounded-2xl'
                  allowFullScreen
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
