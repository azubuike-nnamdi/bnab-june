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
    ],
  }
};

export default nextConfig;
