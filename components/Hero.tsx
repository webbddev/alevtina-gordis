import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from './ui/text-reveal';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { Lens } from './ui/lens';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-14 md:px-6'>
      <div className='max-w-340 mx-auto px-4 md:px-8'>
        {/* --- LEFT-ALIGNED SECTION --- */}
        <p className='text-left text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 md:-ml-8'>
          {t('projectLabel')}
        </p>

        {/* Main Title (Stacked) */}
        <h1 className='text-left text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight tracking-tighter mb-16 md:-ml-8'>
          <span className='block'>{t('titleLine1')}</span>
          <span className='relative inline-block'>
            {t('titleLine2')}
            <AnimatedThemeToggler className='absolute top-0 left-full ml-2' />
          </span>
        </h1>

        {/* --- COMBINED NAVIGATION SECTION --- */}
        <div className='flex flex-col sm:flex-row justify-between items-start gap-6 md:gap-10 mb-16 w-full max-w-6xl mx-auto'>
          {/* Three Links (Centered) */}
          <div className='flex-1 flex flex-col items-start gap-y-4 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:gap-x-20 lg:flex lg:flex-row lg:items-center lg:justify-center lg:flex-nowrap'>
            {/* Language Switcher */}
            <div className='flex-shrink-0'>
              <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('iTalk')}
              </p>
              <span className='inline-flex items-baseline gap-1 text-base font-medium'>
                <span className='leading-none'>[</span>
                <LanguageSwitcher />
                <span className='leading-none'>]</span>
              </span>
            </div>
            {/* --- Viewing My Work Link --- */}
            <div className=''>
              <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('enjoy')}
              </p>
              <Link href='#my-works' className='text-base font-medium group '>
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('viewWork')}
                </span>
                {' ]'}
              </Link>
            </div>
            {/* --- Download CV Link --- */}
            <div className=''>
              <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('feelFree')}
              </p>
              <a
                href='/Alevtina-Gordienko-CV.pdf'
                download
                className='text-base font-medium group'
              >
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('downloadCv')}
                </span>
                {' ]'}
              </a>
            </div>
            {/* --- Contact Me Link --- */}
            <div className=''>
              <p className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('welcome')}
              </p>
              <Link
                href='#contact'
                className='text-base font-medium hover:text-gray-400 dark:hover:text-gray-300 transition-colors'
              >
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('contactMe')}
                </span>
                {' ]'}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Image Container */}
        <div className='w-full'>
          <Lens
            zoomFactor={1.5}
            lensSize={170}
            isStatic={false}
            ariaLabel='Zoom Area'
          >
            <div className='relative w-full aspect-[3/2] overflow-hidden rounded-lg mb-4 shadow-lg'>
              <Image
                src='/portfolio-image.png'
                alt='Artistic portrait with glitch-inspired overlays and ethereal lighting'
                layout='fill'
                objectFit='cover'
                quality={90}
              />
            </div>
          </Lens>
        </div>

        <p className='text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-10 mb-4'>
          {t('overviewTitle')}
        </p>

        {/* Introduction Paragraph with TextReveal */}
        <TextReveal className='font-mono text-justify text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto'>
          {t('overviewIntro')}
        </TextReveal>

        {/* Detailed Description with TextReveal */}
        <TextReveal className='font-funnel font-light text-justify text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-200 max-w-3xl mx-auto'>
          {t('overviewDetails')}
        </TextReveal>
      </div>
    </section>
  );
}
