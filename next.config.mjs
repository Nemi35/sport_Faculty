/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,  // Enable the app directory feature for Next.js 13+
  },
  images: {
    domains: ['sports-faculty.s3.eu-north-1.amazonaws.com'], // Add your S3 bucket domain here
  },
};

export default nextConfig;
