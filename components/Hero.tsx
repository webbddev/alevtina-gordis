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
import { AnimatedTextWords } from './AnimatedTextWords';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export function Hero() {
  const t = useTranslations('Hero');
  const [chatOpen, setChatOpen] = useState(false);
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <section className='bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-14 md:px-6 overflow-x-hidden'>
      <div className='mx-auto max-w-7xl px-4 md:px-8'>
        {/* --- LEFT-ALIGNED SECTION --- */}
        <p className='text-left text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 md:-ml-8'>
          {t('projectLabel')}
        </p>

        {/* Main Title Section */}
        <h1 className='font-ebGaramond font-medium uppercase text-gray-700 dark:text-gray-200 mix-blend-mode:multiply text-left text-[56px]/[2.75rem] md:text-6xl/[2.75rem] lg:text-7xl/[3.50rem] xl:text-8xl/[4.5rem] 2xl:text-9xl/[5rem] tracking-tight mb-16 md:-ml-8 relative'>
          <div className='block'>
            <AnimatedTextWords duration={1.2} delay={0}>
              {t('titleLine1')}
            </AnimatedTextWords>
          </div>
          <div className='relative inline-block pl-0.5 md:pl-4'>
            <AnimatedTextWords duration={1.2} delay={0.5}>
              {t('titleLine2')}
            </AnimatedTextWords>

            {/* THEME TOGGLER */}
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 1,
                ease: [0.19, 1, 0.22, 1],
              }}
              viewport={{ once: true }}
              className='absolute -top-6 md:-top-7 lg:-top-8 xl:-top-11 2xl:-top-18 left-full'
            >
              <AnimatedThemeToggler className='ml-2 md:ml-4 2xl:ml-6' />
            </motion.div>

            {/* MOBILE SOUND ICON POSITIONING (Next to/Above Toggler on mobile) */}
            <div className='inline-block md:hidden absolute -top-16 left-full ml-2'>
              <motion.button
                onClick={toggleAudio}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.8,
                  ease: [0.19, 1, 0.22, 1],
                }}
                viewport={{ once: true }}
                className='p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm'
              >
                {isPlaying ? (
                  <Volume2 className='w-5 h-5 text-gray-700 dark:text-gray-200' />
                ) : (
                  <VolumeX className='w-5 h-5 text-gray-400' />
                )}
              </motion.button>
            </div>
          </div>

          {/* DESKTOP SOUND ICON POSITIONING (Right side for md+ screens) */}
          <div className='hidden md:block'>
            <motion.button
              onClick={toggleAudio}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              viewport={{ once: true }}
              className='md:absolute md:top-0 md:right-0 lg:-right-4 xl:-right-8 p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center'
              aria-label={
                isPlaying ? 'Mute background sound' : 'Unmute background sound'
              }
            >
              {isPlaying ? (
                <Volume2 className='w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-200' />
              ) : (
                <VolumeX className='w-5 h-5 md:w-6 md:h-6 text-gray-400' />
              )}
            </motion.button>
          </div>
        </h1>

        {/* --- NAVIGATION AND CONTENT --- */}
        <div className='flex flex-col sm:flex-row justify-between items-start gap-6 md:gap-10 mb-16 w-full max-w-6xl xl:mx-auto'>
          <div className='font-nunito flex-1 flex flex-col items-start gap-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-3 md:gap-y-6 xl:gap-x-14'>
            {/* Language Switcher */}
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

            {/* Viewing My Work Link */}
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

            {/* Visit BirDigi Link */}
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

            {/* Download CV Link */}
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

            {/* Contact Me Link */}
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

            {/* Ask AI Link */}
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
                alt='Portrait'
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

        <TextReveal className='font-ebGaramond font-semibold uppercase text-justify text-2xl md:text-3xl leading-8 tracking-wide max-w-5xl mx-auto project-drop-cap mb-4'>
          {t('overviewIntro')}
        </TextReveal>

        <TextReveal className='font-nunito font-medium text-justify text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-200 max-w-3xl md:w-[95%] mx-auto'>
          {t('overviewDetails')}
        </TextReveal>
      </div>
    </section>
  );
}
