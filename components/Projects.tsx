'use client';

import { Marquee } from './ui/marquee';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HeroVideoDialog } from './ui/hero-video-dialog';
import { XIcon, CheckCircle2 } from 'lucide-react';

// Type definition for video links
interface VideoLink {
  url: string;
  thumbnail: string;
}
// Type definition for project data structure
interface ProjectData {
  src: string;
  logo: string;
  videoSrc: string;
  videoLinks?: VideoLink[];
  name: string;
  summary: string;
  role: string;
  description: string[];
  result: string;
}

// Individual card component for project preview
// Displays project image with overlay containing name and description
const ProjectPreviewCard = ({
  src,
  name,
  summary,
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

// Sliding panel component that shows detailed project information
// Appears when a project card is clicked
const ProjectDetailsSlider = ({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) => {
  const t = useTranslations('Projects');

  useEffect(() => {
    // Lock body scroll when slider is open
    document.body.style.overflow = 'hidden';

    // Cleanup: unlock body scroll when slider closes
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
      <div className='relative p-6 md:px-6 xl:px-14'>
        <button
          onClick={onClose}
          className='sticky top-4 float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10'
          aria-label='Close project details'
        >
          <XIcon className='h-6 w-6' />
        </button>
        <div className='clear-both mt-8'>
          <h2 className='text-2xl font-bold mb-4'>{project.name}</h2>

          {/* Video dialog component */}
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
            {/* Role section */}
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectRole')}
              </h3>
              <p className='text-base md:text-lg lg:text-xl 2xl:text-[24px] text-gray-600 dark:text-gray-300'>
                {project.role}
              </p>
            </div>

            {/* Tasks section */}
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectTasks')}
              </h3>
              <ul className='space-y-2 xl:px-14'>
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

            {/* Result section */}
            <div>
              <h3 className='font-semibold text-lg 2xl:text-[25px] mb-2'>
                {t('projectResult')}
              </h3>
              <p className='text-base md:text-lg lg:text-xl 2xl:text-[24px] text-gray-600 dark:text-gray-300'>
                {project.result}
              </p>
            </div>

            {/* Additional Videos */}
            {project.videoLinks && project.videoLinks.length > 0 && (
              <div>
                <h3 className='font-semibold text-lg 2xl:text-[25px] mb-4 mt-6'>
                  {t('additionalVideos')}
                </h3>
                <div className='grid grid-cols-2 xl:grid-cols-3  gap-4 xl:gap-6'>
                  {project.videoLinks.map((video, index) => (
                    <HeroVideoDialog
                      key={index}
                      className='block'
                      animationStyle='from-center'
                      videoSrc={video.url}
                      thumbnailSrc={video.thumbnail}
                      thumbnailAlt={`${project.name} - Additional Video ${
                        index + 1
                      }`}
                      aspectRatio='aspect-video'
                    />
                  ))}
                </div>
              </div>
            )}
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
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  // Get all project data from translations
  // Using t.raw() to get the full object structure including arrays
  const projects = t.raw('projects');
  const projectKeys = Object.keys(projects).sort(
    (a, b) =>
      parseInt(a.substring('project'.length)) -
      parseInt(b.substring('project'.length))
  );

  const projectData: ProjectData[] = projectKeys.map((key) => projects[key]);

  // Split project data into 3 rows for the marquee effect
  // Each row has a different starting point to create visual variety
  const firstRow = projectData;
  const secondRow = [...projectData.slice(3), ...projectData.slice(0, 3)];
  const thirdRow = [...projectData.slice(6), ...projectData.slice(0, 6)];

  return (
    <section
      id='my-works'
      className='w-full bg-white dark:bg-gray-900 py-16 md:px-6'
    >
      <div className='mx-auto max-w-7xl px-4 md:px-8'>
        {/* Section header */}
        <div className='mb-12 md:-ml-8'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            {t('title')}
          </h2>
          <p className='text-muted-foreground text-lg'>{t('subtitle')}</p>
        </div>

        {/* Marquee container with three columns */}
        <div className='w-full h-[800px] 2xl:h-[1000px] flex items-center justify-center overflow-hidden py-8'>
          {/* First column - base speed */}
          <Marquee
            vertical
            pauseOnHover
            className='[--duration:60s]'
            paused={selectedProject !== null}
          >
            {firstRow.map((project, index) => (
              <ProjectPreviewCard
                key={`first-${index}`}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Marquee>

          {/* Second column - slightly slower */}
          <Marquee
            vertical
            pauseOnHover
            className='[--duration:75s]'
            paused={selectedProject !== null}
          >
            {secondRow.map((project, index) => (
              <ProjectPreviewCard
                key={`second-${index}`}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Marquee>

          {/* Third column - slowest, hidden on mobile */}
          <Marquee
            vertical
            pauseOnHover
            className='[--duration:85s] hidden md:flex'
            paused={selectedProject !== null}
          >
            {thirdRow.map((project, index) => (
              <ProjectPreviewCard
                key={`third-${index}`}
                src={project.src}
                name={project.name}
                summary={project.summary}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Project details slider with backdrop */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black z-40'
              onClick={() => setSelectedProject(null)}
            />
            {/* Details slider */}
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
