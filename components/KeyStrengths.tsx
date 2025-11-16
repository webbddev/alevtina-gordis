'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AuroraText } from '@/components/ui/aurora-text';
import { useTheme } from 'next-themes';

const KeyStrengths = () => {
  const { theme } = useTheme();
  const t = useTranslations('KeyStrengths');
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['20%', '-10%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['40%', '-10%']);
  const x4 = useTransform(scrollYProgress, [0, 1], ['20%', '-15%']);
  const x5 = useTransform(scrollYProgress, [0, 1], ['-30%', '15%']);

  const dividerColor = 'bg-yellow-500 dark:bg-yellow-400';

  const yellowTones = ['#FBBF24', '#F59E0B', '#D97706']; // Amber 400, 500, 600
  const grayTones = ['#9CA3AF', '#6B7280', '#4B5563']; // Gray 400, 500, 600
  // Light mode: Rich darks with warm gold accents
  // Light mode: Rich darks with warm gold accents
  const lightModeTones = [
    '#1A1410', // Deep charcoal brown
    '#2D2620', // Warm dark gray
    '#3F3A35', // Medium warm brown
    '#5C5550', // Warm taupe
    '#D4A574', // Warm beige
    '#E8B876', // Light tan
    '#F4C869', // Golden amber
    '#FFD700', // Bright gold
    '#FFC700', // Deep gold
    '#FEBE10', // Warm yellow
  ];

  // Dark mode: Light neutrals with vibrant gold accents
  const darkModeTones = [
    '#F5F1ED', // Off-white
    '#E8E3DD', // Light warm gray
    '#D4CCBF', // Warm beige
    '#B8B0A0', // Muted warm gray
    '#8A8274', // Medium taupe
    '#FFE680', // Light gold
    '#FFD700', // Bright gold
    '#FFC700', // Deep gold
    '#FFAA00', // Amber
    '#FF9500', // Orange gold
  ];

  const mixedTones = theme === 'dark' ? darkModeTones : lightModeTones;

  return (
    <section
      ref={targetRef}
      className='bg-white dark:bg-gray-900 pt-10 overflow-hidden font-light leading-snug text-center pb-10 text-[20px] md:text-[30px] xl:text-[50px]'
    >
      {/* Line 1 */}
      <motion.div style={{ x: x1 }} className='py-2'>
        <p className='font-normal '>
          <AuroraText colors={mixedTones}>{t('skill1')}</AuroraText>
        </p>
      </motion.div>

      {/* Line 2 */}
      <motion.div
        style={{ x: x2 }}
        className='flex items-center justify-center gap-3 py-2'
      >
        <p className='font-thin'>{t('skill2')}</p>
        <div className={`w-10 h-1 md:w-32 ${dividerColor}`} />
      </motion.div>

      {/* Line 3 */}
      <motion.div style={{ x: x3 }} className='py-2'>
        <p className=''>{t('skill3')}</p>
      </motion.div>

      {/* Line 4 */}
      <motion.div
        style={{ x: x4 }}
        className='flex items-center justify-center gap-3 py-2'
      >
        <p className='font-thin'>
          <AuroraText colors={mixedTones}>{t('skill5')}</AuroraText>
        </p>
        <div className={`w-10 h-1 md:w-32 ${dividerColor}`} />
        <p className='font-thin '>{t('skill6')}</p>
      </motion.div>

      {/* Line 5 */}
      <motion.div style={{ x: x5 }} className='py-2'>
        <p className='font-'>{t('skill4')}</p>
      </motion.div>
    </section>
  );
};

export default KeyStrengths;
