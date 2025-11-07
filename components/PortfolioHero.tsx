import React from 'react';
import Image from 'next/image';

/**
 * A self-contained, responsive portfolio hero section based on your design.
 * All content is hard-coded.
 */
export function PortfolioHero() {
  return (
    <section className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-24 sm:py-32 px-4 md:px-8'>
      {/* Centered, max-width container */}
      <div className='max-w-7xl mx-auto flex flex-col items-center'>
        {/* Label */}
        <p className='text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2'>
          Project
        </p>

        {/* Main Title (Stacked) */}
        <h1 className='text-center text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight tracking-tighter mb-16'>
          <span className='block'>ALEVTINA</span>
          <span className='block'>GORDIENKO</span>
        </h1>

        {/* Metadata Row */}
        <div className='flex flex-col sm:flex-row justify-center items-center text-center gap-y-6 sm:gap-y-0 sm:gap-x-12 md:gap-x-24 mb-16 w-full max-w-4xl'>
          <div className='flex-1'>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Year
            </p>
            <p className='text-lg font-medium'>[2024]</p>
          </div>
          <div className='flex-1'>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Category
            </p>
            <p className='text-lg font-medium'>[BRAND IDENTITY]</p>
          </div>
          <div className='flex-1'>
            <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
              Client
            </p>
            <p className='text-lg font-medium'>[CREATIVE STUDIO]</p>
          </div>
        </div>

        {/* Main Image Container */}
        <div className='w-full max-w-6xl'>
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

        {/* Image Caption */}
        <p className='text-center text-sm italic text-gray-600 dark:text-gray-300 mb-24 max-w-2xl mx-auto'>
          Artistic portrait with glitch-inspired overlays and ethereal lighting
        </p>

        {/* Introduction Paragraph */}
        <p className='text-center text-2xl md:text-3xl font-semibold leading-relaxed mb-10 max-w-4xl mx-auto'>
          A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND
          IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.
        </p>

        {/* Detailed Description */}
        <p className='text-center text-base leading-relaxed text-gray-700 dark:text-gray-200 max-w-3xl mx-auto'>
          This project centers on a creative portrait session designed to
          reflect the innovative and dynamic spirit of the brand. The shoot
          features ethereal lighting and glitch-inspired color overlays, evoking
          a sense of movement and digital artistry. The subject's confident gaze
          and contemporary styling embody the brand's forward-looking identity.
          Unlike the introduction of a new disease before medication, memorable,
          immersive visual experience. This imagery will be used across brand
          touchpoints to communicate a unique blend of creativity, technology,
          and authenticity.
        </p>
      </div>
    </section>
  );
}

// Export as default if you prefer to import it that way
// export default PortfolioHero;
