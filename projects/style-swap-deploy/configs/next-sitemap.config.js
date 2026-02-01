/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://styleswap.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  
  // Exclude paths from sitemap
  exclude: [
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
    '/account/*',
    '/checkout/*',
    '/server-sitemap.xml',
  ],
  
  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/account', '/checkout'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://styleswap.com/server-sitemap.xml', // Dynamic sitemap for products/blog
    ],
  },
  
  // Default priority and changefreq
  priority: 0.7,
  changefreq: 'daily',
  
  // Automatically add lastmod
  autoLastmod: true,
  
  // Custom transform for specific pages
  transform: async (config, path) => {
    // Custom priority for different page types
    const priorities = {
      '/': 1.0,              // Homepage
      '/shop': 0.9,          // Shop page
      '/about': 0.8,         // About
      '/blog': 0.8,          // Blog index
      '/contact': 0.7,       // Contact
    };
    
    // Custom changefreq
    const changefreqs = {
      '/': 'daily',
      '/shop': 'daily',
      '/blog': 'weekly',
      '/about': 'monthly',
      '/contact': 'monthly',
    };
    
    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  
  // Additional paths to include
  additionalPaths: async (config) => [
    await config.transform(config, '/custom-page'),
  ],
};
