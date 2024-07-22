const { hostname } = require("os");

module.exports = {
  siteUrl: 'https://www.andressaumet.com',
  generateRobotsTxt: true,
  exclude: ['/dashboard/**', 'https://www.andressaumet.com/api/downloadcv' ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', disallow: ['/dashboard/*'] },
    ],
  },
  sitemapSize: 7000, 
  outDir: './public',
  additionalSitemaps: [
    'https://www.andressaumet.com/sitemap-0.xml',
  ],
}