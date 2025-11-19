'use client';

import Image from 'next/image';
import { TextReveal } from './ui/text-reveal';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { Lens } from './ui/lens';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { SmoothLink } from './SmoothLink';
import { useState } from 'react';
import { AIChatBox } from './AIChatBox';
import { ShineBorder } from './ui/shine-border';

export function Hero() {
  const t = useTranslations('Hero');
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <section className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-14 md:px-6'>
      <div className='mx-auto max-w-7xl px-4 md:px-8'>
        {/* --- LEFT-ALIGNED SECTION --- */}
        <p className='text-left text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 md:-ml-8'>
          {t('projectLabel')}
        </p>

        {/* Main Title (Stacked) - Alevtina */}
        <h1 className='font-libreBaskerville font-bold uppercase text-black/80 dark:text-white/90 text-left text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-16 md:-ml-8'>
          <span className='block'>{t('titleLine1')}</span>
          <span className='relative inline-block'>
            {t('titleLine2')}
            <AnimatedThemeToggler className='absolute top-0 left-full ml-2' />
          </span>
        </h1>

        {/* --- COMBINED NAVIGATION SECTION --- */}
        <div className='flex flex-col sm:flex-row justify-between items-start gap-6 md:gap-10 mb-16 w-full max-w-6xl xl:mx-auto'>
          {/* Four Links (Centered) */}
          <div className='font-nunito flex-1 flex flex-col items-start gap-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-3 md:gap-y-6 xl:gap-x-14'>
            {/* --- Language Switcher --- */}
            <div className='text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('iTalk')}
              </p>
              <span className='inline-flex items-baseline gap-1 text-base'>
                <span className='leading-none'>[</span>
                <LanguageSwitcher />
                <span className='leading-none'>]</span>
              </span>
            </div>

            {/* --- Viewing My Work Link --- */}
            <div className='text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('enjoy')}
              </p>
              <SmoothLink
                href='#my-works'
                className='text-base font-medium group '
              >
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('viewWork')}
                </span>
                {' ]'}
              </SmoothLink>
            </div>

            {/* --- Visit BirDigi Link --- */}
            <div className='text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('visit')}
              </p>
              <a
                href='https://birdigi.vercel.app/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-base font-medium group'
              >
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('visitBirDigi')}
                </span>
                {' ]'}
              </a>
            </div>

            {/* --- Download CV Link --- */}
            <div className='text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('feelFree')}
              </p>
              <a
                href='/Alevtina-Gordienko-CV-RU.pdf'
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
            <div className='text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('welcome')}
              </p>
              <SmoothLink
                href='#contact'
                className='text-base font-medium hover:text-gray-400 dark:hover:text-gray-300 transition-colors'
              >
                {'[ '}
                <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                  {t('contactMe')}
                </span>
                {' ]'}
              </SmoothLink>
            </div>

            {/* --- Ask AI Link --- */}
            <div className='relative text-left'>
              <p className='text-xs md:text-[12px] lg:text-[14px] xl:text-[16px] uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {t('talkWithAI')}
              </p>
              <div className='relative inline-block'>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className='text-base font-medium group'
                >
                  {'[ '}
                  <span className='transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-300'>
                    {t('AIChatBot')}
                  </span>
                  {' ]'}
                </button>
                <div className='absolute -bottom-1 left-0 w-full h-0.5'>
                  <ShineBorder
                    shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                    borderWidth={1}
                    duration={8}
                  />
                </div>
              </div>
              <AIChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
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
            <div className='relative w-full aspect-3/2 overflow-hidden rounded-lg mb-4 shadow-lg'>
              <Image
                src='/author.jpg'
                alt='Artistic portrait with glitch-inspired overlays and ethereal lighting'
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
              />
            </div>
          </Lens>
        </div>

        <p className='text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-10 mb-4'>
          {t('overviewTitle')}
        </p>

        {/* Introduction Paragraph with TextReveal */}
        <TextReveal className='font-libreBaskerville font-normal uppercase text-justify text-2xl md:text-3xl leading-relaxed max-w-5xl mx-auto project-drop-cap mb-4'>
          {t('overviewIntro')}
        </TextReveal>

        {/* Detailed Description with TextReveal */}
        <TextReveal className='font-nunito font-medium  text-justify text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-200 max-w-3xl md:w-[95%] mx-auto'>
          {t('overviewDetails')}
        </TextReveal>
      </div>
    </section>
  );
}
