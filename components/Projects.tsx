'use client';

import { Marquee } from './ui/marquee';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HeroVideoDialog } from './ui/hero-video-dialog';
import { XIcon } from 'lucide-react';


// Individual card component for project preview
// Displays project image with overlay containing name and description
const ReviewCard = ({
  src,
  name,
  description,
  onClick,
}: {
  src: string;
  name: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <motion.figure
      className='relative cursor-pointer overflow-hidden group'
      onClick={onClick}
    >
      <div className='relative'>
        <Image
          width={500}
          height={500}
          src={src}
          alt='projects'
          className='object-cover w-full'
        />
        <div className='absolute bottom-0 left-0 p-4 bg-linear-to-t from-black/60 to-transparent w-full'>
          <h3 className='text-white text-xl font-semibold'>{name}</h3>
          <p className='text-white/80 text-sm'>{description}</p>
        </div>
      </div>
    </motion.figure>
  );
};

// Sliding panel component that shows detailed project information
// Appears when a project card is clicked
const ProjectDetailsSlider = ({
  project,
  onClose,
}: {
  project: {
    src: string;
    name: string;
    logo: string;
    description: string;
    details: string;
    tags: string[];
    className: string;
    videoSrc: string;
  };
  onClose: () => void;
}) => {
  const t = useTranslations('Projects');

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className='fixed right-0 top-0 z-50 h-full cursor-pointer overflow-y-auto bg-white p-6 shadow-lg dark:bg-gray-800 md:w-3/5 xl:w-1/2'
    >
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      >
        <XIcon className='h-6 w-6' />
      </button>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>{project.name}</h2>
        {/* Replace Image with HeroVideoDialog */}
        <div className='w-full mb-6 rounded-lg overflow-hidden'>
          <HeroVideoDialog
            className='block dark:hidden'
            animationStyle='top-in-bottom-out'
            videoSrc={project.videoSrc}
            thumbnailSrc={project.src}
            thumbnailAlt={project.name}
            aspectRatio='aspect-video'
          />
          <HeroVideoDialog
            className='hidden dark:block'
            animationStyle='top-in-bottom-out'
            videoSrc={project.videoSrc}
            thumbnailSrc={project.src}
            thumbnailAlt={project.name}
            aspectRatio='aspect-video'
          />
        </div>

        {/* <Image
          src={project.src}
          alt={project.name}
          width={500}
          height={300}
          className='w-full rounded-lg mb-6 object-cover h-60'
        /> */}

        <p className='2xl:text-lg text-gray-600 dark:text-gray-300 mb-4'>
          {project.description}
        </p>

        <div className='space-y-4'>
          <h3 className='font-semibold text-lg 2xl:text-xl'>
            {t('projectDetails')}
          </h3>
          <p className='text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-300'>
            {project.details}
          </p>
          {/* <div className='flex flex-wrap gap-2'>
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'
              >
                {tag}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects section component
// Features:
// - Vertical scrolling marquee with project cards
// - Interactive project cards that reveal detailed information
// - Responsive layout with 3 columns on desktop
// - Pause animation on hover or when details panel is open
const Projects = () => {
  const t = useTranslations('Projects');
  const [selectedProject, setSelectedProject] = useState<{
    src: string;
    name: string;
    logo: string;
    description: string;
    details: string;
    tags: string[];
    className: string;
    videoSrc: string;
  } | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // Get project data from translations
  const projectData = [
    {
      src: '/img/projects/project-1.jpg',
      logo: '/img/logos/logo-1.svg',
      tags: [
        'Video Production',
        'Creative Direction',
        'Social Media',
        'Anniversary Campaign',
      ],
      className: '',
      ...t.raw('projects.project1'),
    },
    {
      src: '/img/projects/project-2.jpg',
      logo: '/airbnb-logo.png',
      tags: ['UI/UX Design', 'Web Design', 'Landing Page', 'User Experience'],
      className: '',
      ...t.raw('projects.project2'),
    },
    {
      src: '/img/projects/project-3.jpg',
      logo: '/audi-logo.png',
      tags: [
        'Web Development',
        'Interactive Design',
        'E-commerce',
        'Car Configurator',
      ],
      className: '',
      ...t.raw('projects.project3'),
    },
    {
      src: '/img/projects/project-4.jpg',
      logo: '/paypal-logo.png',
      tags: [
        'Payment Integration',
        'E-commerce',
        'Web Development',
        'API Integration',
      ],
      className: '',
      ...t.raw('projects.project4'),
    },
    {
      src: '/img/projects/project-5.jpg',
      logo: '/sony-logo.png',
      tags: ['Web Development', 'Interactive Design', 'Gaming', 'E-commerce'],
      className: '',
      ...t.raw('projects.project5'),
    },
    {
      src: '/img/projects/project-6.jpg',
      logo: '/under-armour-logo.png',
      tags: ['Mobile App Design', 'UI/UX Design', 'Fitness', 'App Development'],
      className: '',
      ...t.raw('projects.project6'),
    },
    {
      src: '/img/projects/project-7.jpg',
      logo: '/redbull-logo.png',
      tags: [
        'Digital Marketing',
        'Social Media Marketing',
        'Campaign Development',
        'Content Creation',
      ],
      className: '',
      ...t.raw('projects.project7'),
    },
    {
      src: '/img/projects/project-8.png',
      logo: '/spalding-logo.png',
      tags: [
        'Product Review',
        'Content Creation',
        'Collaboration',
        'Digital Marketing',
      ],
      className: '',
      ...t.raw('projects.project8'),
    },
    {
      src: '/img/projects/project-9.jpg',
      logo: '/visa-logo.png',
      tags: [
        'Payment Integration',
        'E-commerce',
        'Web Development',
        'API Integration',
      ],
      className: '',
      ...t.raw('projects.project9'),
    },
    {
      src: '/img/projects/project-10.png',
      logo: '/nord-logo.png',
      tags: [
        'E-commerce Design',
        'UI/UX Design',
        'Web Design',
        'User Experience',
      ],
      className: '',
      ...t.raw('projects.project10'),
    },
  ];

  const firstRow = projectData.slice(0, projectData.length);
  const secondRow = projectData.slice(3, projectData.length);
  const thirdRow = projectData.slice(6, projectData.length);

  return (
    <section
      id='my-works'
      className='w-full bg-white dark:bg-gray-900 py-16 md:px-6'
    >
      <div className='mx-auto max-w-340 px-4 md:px-8'>
        <div className='mb-12 md:-ml-8'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            {t('title')}
          </h2>
          <p className='text-muted-foreground text-lg '>{t('subtitle')}</p>
        </div>

        <div className='w-full h-[800px] 2xl:h-[1000px] flex items-center justify-center overflow-hidden py-8'>
          <Marquee
            vertical
            pauseOnHover
            className='[--duration:60s]'
            paused={selectedProject !== null}
          >
            {firstRow.map((review, index) => (
              <ReviewCard
                key={index}
                {...review}
                onClick={() => setSelectedProject(review)}
              />
            ))}
          </Marquee>

          <Marquee
            vertical
            pauseOnHover
            className='[--duration:60s]'
            paused={selectedProject !== null}
          >
            {secondRow.map((review, index) => (
              <ReviewCard
                key={index}
                {...review}
                onClick={() => setSelectedProject(review)}
              />
            ))}
          </Marquee>

          <Marquee
            vertical
            pauseOnHover
            className='[--duration:60s] hidden md:flex'
            paused={selectedProject !== null}
          >
            {thirdRow.map((review, index) => (
              <ReviewCard
                key={index}
                {...review}
                onClick={() => setSelectedProject(review)}
              />
            ))}
          </Marquee>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black z-40'
              onClick={() => setSelectedProject(null)}
            />
            <ProjectDetailsSlider
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
