'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AuroraText } from '@/components/ui/aurora-text';

const KeyStrengths = () => {
  const t = useTranslations('KeyStrengths');
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['20%', '-10%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['30%', '-10%']);
  const x4 = useTransform(scrollYProgress, [0, 1], ['20%', '-15%']);

  const dividerColor = 'bg-yellow-500 dark:bg-yellow-400';

  const yellowTones = ['#FBBF24', '#F59E0B', '#D97706']; // Amber 400, 500, 600
  const grayTones = ['#9CA3AF', '#6B7280', '#4B5563']; // Gray 400, 500, 600
  const mixedTones = ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'];

  return (
    <section
      ref={targetRef}
      className='bg-white dark:bg-gray-900 pt-20 overflow-hidden font-light leading-snug text-center pb-42 text-[28px] sm:text-[38px] md:text-[40px] lg:text-[50px]'
    >
      {/* Line 1 */}
      <motion.div style={{ x: x1 }} className='py-2'>
        <p className='font-normal italic'>
          <AuroraText colors={mixedTones}>{t('skill1')}</AuroraText>
        </p>
      </motion.div>

      {/* Line 2 */}
      <motion.div
        style={{ x: x2 }}
        className='flex items-center justify-center gap-3 py-2'
      >
        <p className='font-light'>{t('skill2')}</p>
        <div className={`w-10 h-1 md:w-32 ${dividerColor}`} />
        <p className='font-thin'>{t('skill4')}</p>
      </motion.div>

      <motion.div style={{ x: x3 }} className='py-2'>
        <p className='italic'>{t('skill3')}</p>
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
        <p>{t('skill6')}</p>
      </motion.div>

      
    </section>
  );
};

export default KeyStrengths;
