'use client';

import { useCallback, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2Icon,
  PhoneIcon,
  PhoneOffIcon,
  ChevronDown,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const DEFAULT_AGENT = {
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '',
  name: "Alya's Voice Agent",
  description: 'Chat with Alya',
};

export default function ElevenLabsVoiceAgent() {
  const t = useTranslations('VoiceAgent');
  const [isOpen, setIsOpen] = useState(false);
  const [agentState, setAgentState] = useState<
    'disconnected' | 'connecting' | 'connected' | 'disconnecting'
  >('disconnected');

  const conversation = useConversation({
    onConnect: () => setAgentState('connected'),
    onDisconnect: () => setAgentState('disconnected'),
    onError: (error) => {
      console.error('Conversation Error:', error);
      setAgentState('disconnected');
    },
  });

  const startCall = useCallback(async () => {
    try {
      if (!DEFAULT_AGENT.agentId) {
        alert(t('agentIdMissing'));
        return;
      }

      setAgentState('connecting');

      // microphone request initiated
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // session start
      await conversation.startSession({
        agentId: DEFAULT_AGENT.agentId,
        connectionType: 'webrtc',
      });
    } catch (err) {
      console.error('Failed to start call:', err);
      setAgentState('disconnected');
    }
  }, [conversation]);

  const stopCall = useCallback(async () => {
    try {
      setAgentState('disconnecting');
      await conversation.endSession();
      setAgentState('disconnected');
    } catch (err) {
      console.error('Failed to stop call:', err);
    }
  }, [conversation]);

  // Calculate volume level for pulsation (returns a value from 1 to 1.2)
  const getScale = () => {
    const volume = conversation.getOutputVolume() || 0;
    return 1 + Math.min(volume * 2, 0.2);
  };

  return (
    <div className='flex flex-col items-end'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              'mb-4 overflow-hidden rounded-[28px] border border-gray-100 bg-white/90 shadow-2xl dark:border-gray-800 dark:bg-gray-950/85',
              // Adjust size based on screen
              'w-[calc(100vw-32px)] sm:w-[360px] md:w-[380px]'
            )}
          >
            {/* Header */}
            <div className='flex items-center justify-end border-b px-5 py-4 dark:border-gray-800'>
              {/* <div className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <span className='text-lg'>🇺🇸</span> English
                <ChevronDown className='h-4 w-4 opacity-50' />
              </div> */}
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <X className='h-5 w-5 text-gray-400' />
              </button>
            </div>

            {/* Content */}
            <div className='flex flex-col items-center p-8'>
              <div className='relative mb-6'>
                {/* Pulsating background when speaking */}
                <AnimatePresence>
                  {agentState === 'connected' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut',
                      }}
                      className='absolute inset-0 rounded-full bg-blue-500'
                    />
                  )}
                </AnimatePresence>

                {/* Agent photo */}
                <div className='relative z-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-gray-800'>
                  <Image
                    src='/author.jpg'
                    alt='Alya Agent'
                    fill
                    className='object-cover'
                  />
                </div>

                {/* Hang up button (appears only during a call) */}
                {agentState === 'connected' && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={stopCall}
                    className='absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors'
                  >
                    <PhoneOffIcon className='h-5 w-5 fill-current' />
                  </motion.button>
                )}
              </div>

              <h3 className='mb-1 text-xl font-semibold text-gray-900 dark:text-white'>
                {t('agentName')}
              </h3>
              <p className='mb-8 text-sm text-gray-500 dark:text-gray-400'>
                {agentState === 'connected' ? (
                  <span className='flex items-center gap-2 text-green-500'>
                    <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
                    {t('listening')}
                  </span>
                ) : agentState === 'connecting' ? (
                  t('connecting')
                ) : (
                  t('agentDescription')
                )}
              </p>

              {/* Main action button */}
              {agentState !== 'connected' && (
                <button
                  onClick={startCall}
                  disabled={agentState === 'connecting'}
                  className='flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black/80 text-white font-semibold shadow-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-gray-200'
                >
                  {agentState === 'connecting' ? (
                    <Loader2Icon className='h-6 w-6 animate-spin' />
                  ) : (
                    <>
                      <PhoneIcon className='h-5 w-5 fill-current' />
                      {t('startCall')}
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Footer */}
            {/* <div className='bg-gray-50 py-2 text-center text-[10px] uppercase tracking-tighter text-gray-400 dark:bg-gray-900/50'>
              Powered by ElevenLabs Agents
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher (Pill button) */}
      {!isOpen && (
        <motion.button
          layoutId='launcher'
          onClick={() => setIsOpen(true)}
          // 1. Added relative, overflow-hidden, and p-px (padding for the border width)
          className='group relative flex items-center gap-3 overflow-hidden rounded-full p-px shadow-2xl transition-all focus:outline-none'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* 2. The Spinning Gradient Layer */}
          <span
            className={cn(
              'absolute inset-[-1000%] animate-[spin_4s_linear_infinite]',
              // Light Mode: Use the name defined after --background-image-
              'bg-champagne-gold opacity-25',
              // Dark Mode
              'dark:bg-luxury-purple dark:opacity-50'
            )}
          />
          {/* 3. The Inner Content Container (acts as the button face) */}
          <div className='inline-flex h-full w-full items-center gap-3 rounded-full bg-white/60 dark:bg-gray-950/40 p-2 pr-6 backdrop-blur-xl transition-colors duration-500 group-hover:bg-white dark:group-hover:bg-gray-900/90'>
            <div className='relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700'>
              <Image
                src='/author.jpg'
                alt='Agent'
                fill
                className='object-cover grayscale group-hover:grayscale-0 transition-all'
              />
            </div>
            <div className='flex items-center gap-2.5 font-bold text-sm text-gray-800 dark:text-gray-100'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white dark:bg-white dark:text-black'>
                <PhoneIcon className='h-4 w-4 fill-current' />
              </div>
              {t('startCall')}
            </div>
          </div>
        </motion.button>
      )}
    </div>
  );
}
