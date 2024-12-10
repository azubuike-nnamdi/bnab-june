/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bnab-june.s3.amazonaws.com',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'egotickets-core-cdn.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/production/uploads/**',
      },
    ],
  }
};

export default nextConfig;
