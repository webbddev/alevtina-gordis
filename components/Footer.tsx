import { useTranslations } from 'next-intl';
import { SmoothLink } from './SmoothLink';

// A simple SVG icon for the external links
const ExternalLinkIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='inline-block w-4 h-4 text-gray-500 dark:text-gray-400'
  >
    <path d='M7 17l10-10' />
    <path d='M8 7h9v9' />
  </svg>
);

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <>
      {/* Main Footer Content */}
      <footer id='contact' className='bg-white dark:bg-gray-900 text-black dark:text-white py-16 md:px-8'>
        {/* Consistent max-width container based on your Hero component */}
        <div className='max-w-340 mx-auto px-4 '>
          {/* Top Section: Contact & Links */}
          {/* Stacks vertically on mobile, row on large screens */}
          <div className='flex flex-col lg:flex-row justify-between gap-12 mb-16'>
            {/* Contact Info */}
            <div>
              <a
                href='tel:+11202330123'
                className='block text-2xl font-medium hover:text-gray-700 dark:hover:text-gray-300'
              >
                +373 (78) 585-585
              </a>
              <a
                href='mailto:yo@alevtinagordienko.com'
                className='block text-2xl font-medium hover:text-gray-700 dark:hover:text-gray-300'
              >
                alevtina.gordienko@gmail.com
              </a>
            </div>

            {/* Navigation & Social Links */}
            {/* --- REFACTOR --- */}
            {/* This is now 'flex-row' by default for the mobile 2-column layout */}
            <div className='flex flex-row gap-12 sm:gap-20'>
              {/* Navigate Links */}
              <div>
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4'>
                  {t('navigate')}
                </h3>
                <ul className='space-y-3'>
                  <li>
                    <SmoothLink
                      href='#'
                      className='text-xl font-medium hover:underline'
                    >
                      {t('home')}
                    </SmoothLink>
                  </li>

                  <li>
                    <SmoothLink
                      href='#my-works'
                      className='text-xl font-medium hover:underline'
                    >
                      {t('projects')}
                    </SmoothLink>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4'>
                  {t('social')}
                </h3>
                <ul className='space-y-3'>
                  <li>
                    <a
                      href='#'
                      className='text-xl font-medium hover:underline flex items-center gap-1.5'
                    >
                      {t('mySeoBlog')} <ExternalLinkIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-xl font-medium hover:underline flex items-center gap-1.5'
                    >
                      Twitter <ExternalLinkIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-xl font-medium hover:underline flex items-center gap-1.5'
                    >
                      Facebook <ExternalLinkIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Large Brand Name */}
          <div className='my-16 text-left md:-ml-8'>
            <h1 className='font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter wrap-break-word'>
              Alevtina Gordienko
              <sup className='text-2xl sm:text-3xl lg:text-4xl font-bold -top-8 sm:-top-12 lg:-top-16 ml-1'>
                &reg;
              </sup>
            </h1>
          </div>
        </div>
      </footer>

      {/* Bottom Bar: Copyright & Legal */}
      {/* --- REFACTOR --- */}
      {/* Outer div is full-width, inner div matches the 'max-w-7xl' container */}
      <div className='bg-black/20 text-white text-sm py-5 px-4 md:px-8'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2'>
          <p className='text-center md:text-left'>
            &copy;{new Date().getFullYear()} Alevtina Gordienko All rights
            reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
