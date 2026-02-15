/** @type {import('next').NextConfig} */
const nextConfig = {
  // ========================================
  // IMAGE OPTIMIZATION
  // ========================================
  images: {
    // Modern formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow external image domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
    // Minimize image size
    minimumCacheTTL: 31536000, // 1 year
  },

  // ========================================
  // COMPILER OPTIMIZATIONS
  // ========================================
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ========================================
  // EXPERIMENTAL FEATURES FOR PERFORMANCE
  // ========================================
  experimental: {
    // Optimize package imports (tree-shaking)
    optimizePackageImports: ['framer-motion', 'gsap', '@studio-freight/lenis'],
  },

  // ========================================
  // HEADERS FOR CACHING & SECURITY
  // ========================================
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // ========================================
  // PRODUCTION BUILD SETTINGS
  // ========================================
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Separate vendor chunks
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 20,
            },
            // Framer motion separate chunk (large library)
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 30,
            },
            // GSAP separate chunk
            gsap: {
              test: /[\\/]node_modules[\\/](gsap)[\\/]/,
              name: 'gsap',
              chunks: 'all',
              priority: 30,
            },
            // Common chunk for shared code
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
