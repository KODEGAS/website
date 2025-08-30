/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kodegas.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    const customPriorities = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/about': { priority: 0.8, changefreq: 'weekly' },
      '/services': { priority: 0.9, changefreq: 'weekly' },
      '/projects': { priority: 0.7, changefreq: 'monthly' },
      '/contact': { priority: 0.6, changefreq: 'monthly' },
    };

    const customConfig = customPriorities[path] || {
      priority: 0.5,
      changefreq: 'monthly',
    };

    return {
      loc: path,
      changefreq: customConfig.changefreq,
      priority: customConfig.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    // Add any additional dynamic paths if needed
    return [];
  },
};