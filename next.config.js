// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules');
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // Replace with your Cloudinary domain
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1536, 2048],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
    ];
  },
};
const transpiledModules = [
  'next-auth',
  'zustand',
  'formik',
  'react-hook-form',
  'react-query',
  'swr',
  'react-beautiful-dnd',
];
const withNextTranspileModules = withTM(nextConfig, transpiledModules);

// Sentry integration for error tracking and monitoring
const sentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see: https://github.com/getsentry/sentry-webpack-plugin#options
};

const nextConfigWithSentry = withSentryConfig(withNextTranspileModules, sentryWebpackPluginOptions);

module.exports = nextConfigWithSentry;