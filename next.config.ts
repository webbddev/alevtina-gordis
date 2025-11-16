import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    qualities: [75, 90],
  },
  serverExternalPackages: ['pdf-parse'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
