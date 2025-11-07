import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from './ui/text-reveal';

/**
 * A self-contained, responsive portfolio hero section with:
 * - LEFT-ALIGNED top section (Title, Metadata, Image)
 * - CENTER-ALIGNED bottom section (Project Overview, Text, Contact Link)
 */
export function PortfolioHero1() {
  return (
    <section className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-24 sm:py-32 px-4 md:px-8'>
      {/* Centered, max-width container. */}
      <div className='max-w-7xl mx-auto'>
        {/* --- LEFT-ALIGNED SECTION --- */}

        {/* Label */}
        <p className='text-left text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2'>
          Project
        </p>

        {/* Main Title (Stacked) */}
        <h1 className='text-left text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight tracking-tighter mb-16'>
          <span className='block'>ALEVTINA</span>
          <span className='block'>GORDIENKO</span>
        </h1>

        <div className='flex flex-col sm:flex-row justify-start items-start text-left gap-y-6 sm:gap-y-0 sm:gap-x-12 md:gap-x-24 mb-16 w-full max-w-4xl'>
          <div className=''>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Enjoy
            </p>
            <Link href='#my-work' className='text-lg font-medium group'>
              {'[ '}
              <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                VIEWING MY WORK
              </span>
              {' ]'}
            </Link>
          </div>
          {/* --- Download CV Link --- */}
          <div className=''>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Feel free
            </p>
            <a
              href='/Alevtina-Gordienko-CV.pdf'
              download
              className='text-lg font-medium group'
            >
              {'[ '}
              <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                DOWNLOAD MY CV
              </span>
              {' ]'}
            </a>
          </div>
          {/* --- Contact Me Link --- */}
          <div className='flex-1'>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Welcome
            </p>
            <Link
              href='#contact'
              className='text-lg font-medium hover:text-gray-400 dark:hover:text-gray-300 transition-colors'
            >
              {'[ '}
              <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                CONTACT ME
              </span>
              {' ]'}
            </Link>
          </div>
        </div>

        {/* Main Image Container */}
        <div className='w-full'>
          <div className='relative w-full aspect-[3/2] overflow-hidden rounded-lg mb-4 shadow-lg'>
            <Image
              src='/portfolio-image.png'
              alt='Artistic portrait with glitch-inspired overlays and ethereal lighting'
              layout='fill'
              objectFit='cover'
              quality={90}
            />
          </div>
        </div>

        <p className='text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-24 mb-4'>
          Project Overview
        </p>

        {/* Introduction Paragraph with TextReveal */}
        <TextReveal
          className='text-start text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto'
        >
          A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND
          IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.
        </TextReveal>

        {/* Detailed Description with TextReveal */}
        <TextReveal
          className='text-start text-base leading-relaxed text-gray-700 dark:text-gray-200 max-w-3xl mx-auto'
        >
          This project centers on a creative portrait session designed to
          reflect the innovative and dynamic spirit of the brand. The shoot
          features ethereal lighting and glitch-inspired color overlays, evoking
          a sense of movement and digital artistry. The subject's confident gaze
          and contemporary styling embody the brand's forward-looking identity,
          while the interplay of cyan and magenta tones creates a memorable,
          immersive visual experience. This imagery will be used across brand
          touchpoints to communicate a unique blend of creativity, technology,
          and authenticity.
        </TextReveal>

        {/* Contact Us Link (Centered) */}
        <div className='flex justify-center mt-16'>
          <Link
            href='/contact'
            className='inline-flex items-center text-base font-medium text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            Contact Us
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}
