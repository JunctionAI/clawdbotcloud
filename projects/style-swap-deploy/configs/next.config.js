/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Add your image domains here
    domains: [
      'res.cloudinary.com', // Cloudinary
      's3.amazonaws.com',   // AWS S3
    ],
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', 'lodash', 'date-fns'],
  },
  
  // Compression
  compress: true,
  
  // Production optimization
  productionBrowserSourceMaps: false,
  
  // Powered by header (disable for security)
  poweredByHeader: false,
  
  // Custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for API routes or proxying
  async rewrites() {
    return [
      // Example: Proxy to external API
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://api.external.com/:path*',
      // },
    ];
  },
};

// Sentry configuration (if using Sentry)
// const { withSentryConfig } = require('@sentry/nextjs');
// 
// module.exports = withSentryConfig(
//   nextConfig,
//   {
//     silent: true,
//     org: process.env.SENTRY_ORG,
//     project: process.env.SENTRY_PROJECT,
//   },
//   {
//     widenClientFileUpload: true,
//     transpileClientSDK: true,
//     tunnelRoute: '/monitoring',
//     hideSourceMaps: true,
//     disableLogger: true,
//   }
// );

// PWA configuration (if using next-pwa)
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// });
// 
// module.exports = withPWA(nextConfig);

// Bundle analyzer (development only)
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// 
// module.exports = withBundleAnalyzer(nextConfig);

module.exports = nextConfig;
