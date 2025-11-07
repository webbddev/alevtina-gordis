'use client';

import { Marquee } from './ui/marquee';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
      className='fixed right-0 top-0 h-full md:w-2/5 bg-white shadow-lg p-6 z-50 cursor-pointer'
    >
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
      >
        {t('close')}
      </button>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>{project.name}</h2>
        <Image
          src={project.src}
          alt={project.name}
          width={500}
          height={300}
          className='w-full rounded-lg mb-6 object-cover h-60'
        />
        <p className='text-gray-600 mb-4'>{project.description}</p>

        <div className='space-y-4'>
          <h3 className='font-semibold text-lg'>{t('projectDetails')}</h3>
          <p className='text-gray-600'>{project.details}</p>
          <div className='flex flex-wrap gap-2'>
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className='px-3 py-1 bg-gray-100 rounded-full text-sm'
              >
                {tag}
              </span>
            ))}
          </div>
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
  } | null>(null);

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
      id='my-work'
      className='w-full bg-white py-16 md:mx-auto 2xl:w-[70vw] md:px-16'
    >
      <div className='mx-auto mb-12 px-2 md:px-0'>
        <h2 className='text-4xl font-bold text-gray-900 mb-4'>{t('title')}</h2>
        <p className='text-[#7b7b7b] text-lg'>{t('subtitle')}</p>
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
