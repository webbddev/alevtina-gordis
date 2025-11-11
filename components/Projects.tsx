'use client';

import { Marquee } from './ui/marquee';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HeroVideoDialog } from './ui/hero-video-dialog';
import { XIcon, CheckCircle2 } from 'lucide-react';

// Individual card component for project preview
// Displays project image with overlay containing name and description
const ProjectPreviewCard = ({
  src,
  name,
  summary: summary,
  onClick,
}: {
  src: string;
  name: string;
  summary: string;
  onClick: () => void;
}) => {
  return (
    <div
      className='relative block w-full cursor-pointer overflow-hidden group text-left'
      onClick={onClick}
      aria-label={`Open details for ${name}`}
    >
      <div className='relative'>
        <Image
          width={400}
          height={500}
          src={src}
          alt={name}
          className='object-cover w-full'
          priority
        />
        <div className='absolute bottom-0 left-0 p-4 bg-linear-to-t from-black/80 to-transparent w-full'>
          <h3 className='text-white text-[12px] md:text-[13px] lg:text-[16px] xl:text-[17px] font-semibold '>
            {name}
          </h3>
          <p className='line-clamp-2 text-white/80 text-[12px] md:text-[13px] lg:text-[16px] xl:text-[17px]'>
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};
``;

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
    summary: string;
    role: string;
    description: string[];
    result: string;
    tags?: string[];
    className: string;
    videoSrc: string;
  };
  onClose: () => void;
}) => {
  const t = useTranslations('Projects');

  useEffect(() => {
    // This locks the body scroll, preventing the main page from moving
    // This is the correct target, as it won't affect the 'fixed' slider
    document.body.style.overflow = 'hidden';

    // Cleanup function: This runs when the component unmounts
    return () => {
      // This unlocks the body scroll
      document.body.style.overflow = '';
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <motion.div
      data-lenis-prevent
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className='fixed right-0 top-0 z-50 h-screen w-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 md:w-3/5 xl:w-1/2'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='relative p-6'>
        <button
          onClick={onClose}
          className='sticky top-4 float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10'
        >
          <XIcon className='h-6 w-6' />
        </button>

        <div className='clear-both mt-8'>
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

          <div className='space-y-6'>
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectRole')}
              </h3>
              <p className='text-base md:text-lg lg:text-xl 2xl:text-[24px] text-gray-600 dark:text-gray-300'>
                {project.role}
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectTasks')}
              </h3>
              <ul className='space-y-2'>
                {project.description.map((task, index) => (
                  <li key={index} className='flex items-start'>
                    <CheckCircle2 className='h-5 w-5 text-green-500 mr-3 mt-1 shrink-0' />
                    <span className='text-base md:text-lg lg:text-xl 2xl:text-[24px] text-gray-600 dark:text-gray-300'>
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectResult')}
              </h3>
              <p className='text-base md:text-lg lg:text-xl 2xl:text-[24px] text-gray-600 dark:text-gray-300'>
                {project.result}
              </p>
            </div>
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
    summary: string;
    role: string;
    description: string[];
    result: string;
    tags?: string[];
    className: string;
    videoSrc: string;
  } | null>(null);

  // Get project data from translations
  const projectData = [
    {
      src: '/img/projects/project-1.jpg',
      logo: '/img/logos/logo-1.svg',
      // tags: [
      //   'Video Production',
      //   'Creative Direction',
      //   'Social Media',
      //   'Anniversary Campaign',
      // ],
      className: '',
      ...t.raw('projects.project1'),
    },
    {
      src: '/img/projects/project-2.jpg',
      logo: '/airbnb-logo.png',
      // tags: ['UI/UX Design', 'Web Design', 'Landing Page', 'User Experience'],
      className: '',
      ...t.raw('projects.project2'),
    },
    {
      src: '/img/projects/project-3.jpg',
      logo: '/audi-logo.png',
      // tags: [
      //   'Web Development',
      //   'Interactive Design',
      //   'E-commerce',
      //   'Car Configurator',
      // ],
      className: '',
      ...t.raw('projects.project3'),
    },
    {
      src: '/img/projects/project-4.jpg',
      logo: '/paypal-logo.png',
      // tags: [
      //   'Payment Integration',
      //   'E-commerce',
      //   'Web Development',
      //   'API Integration',
      // ],
      className: '',
      ...t.raw('projects.project4'),
    },
    {
      src: '/img/projects/project-5.jpg',
      logo: '/sony-logo.png',
      // tags: ['Web Development', 'Interactive Design', 'Gaming', 'E-commerce'],
      className: '',
      ...t.raw('projects.project5'),
    },
    {
      src: '/img/projects/project-6.jpg',
      logo: '/under-armour-logo.png',
      // tags: ['Mobile App Design', 'UI/UX Design', 'Fitness', 'App Development'],
      className: '',
      ...t.raw('projects.project6'),
    },
    {
      src: '/img/projects/project-7.jpg',
      logo: '/redbull-logo.png',
      // tags: [
      //   'Digital Marketing',
      //   'Social Media Marketing',
      //   'Campaign Development',
      //   'Content Creation',
      // ],
      className: '',
      ...t.raw('projects.project7'),
    },
    {
      src: '/img/projects/project-8.png',
      logo: '/spalding-logo.png',
      // tags: [
      //   'Product Review',
      //   'Content Creation',
      //   'Collaboration',
      //   'Digital Marketing',
      // ],
      className: '',
      ...t.raw('projects.project8'),
    },
    {
      src: '/img/projects/project-9.jpg',
      logo: '/visa-logo.png',
      // tags: [
      //   'Payment Integration',
      //   'E-commerce',
      //   'Web Development',
      //   'API Integration',
      // ],
      className: '',
      ...t.raw('projects.project9'),
    },
    {
      src: '/img/projects/project-10.png',
      logo: '/nord-logo.png',
      // tags: [
      //   'E-commerce Design',
      //   'UI/UX Design',
      //   'Web Design',
      //   'User Experience',
      // ],
      className: '',
      ...t.raw('projects.project10'),
    },
    {
      src: '/img/projects/project-11.jpg',
      logo: '/nord-logo.png',
      // tags: [
      //   'E-commerce Design',
      //   'UI/UX Design',
      //   'Web Design',
      //   'User Experience',
      // ],
      className: '',
      ...t.raw('projects.project11'),
    },
  ];

  // Split project data into 3 rows
  const firstRow = projectData;
  const secondRow = [...projectData.slice(3), ...projectData.slice(0, 3)];
  const thirdRow = [...projectData.slice(6), ...projectData.slice(0, 6)];
  // const cols = 3;
  // const base = Math.ceil(projectData.length / cols);
  // const firstRow = projectData.slice(0, base);
  // const secondRow = projectData.slice(base, base * 2);
  // const thirdRow = projectData.slice(base * 2, base * 3);

  return (
    <section
      id='my-works'
      className='w-full bg-white dark:bg-gray-900 py-16 md:px-6'
    >
      <div className='mx-auto max-w-7xl px-4 md:px-8'>
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
            {firstRow.map((project, index) => (
              <ProjectPreviewCard
                key={index}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Marquee>

          <Marquee
            vertical
            pauseOnHover
            className='[--duration:75s]'
            paused={selectedProject !== null}
          >
            {secondRow.map((project, index) => (
              <ProjectPreviewCard
                key={index}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Marquee>

          <Marquee
            vertical
            pauseOnHover
            className='[--duration:85s] hidden md:flex'
            paused={selectedProject !== null}
          >
            {thirdRow.map((project, index) => (
              <ProjectPreviewCard
                key={index}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
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
