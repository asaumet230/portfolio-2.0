
module.exports = {
  siteUrl: 'https://www.andressaumet.com',
  generateRobotsTxt: true,
  exclude: ['/dashboard/**'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', disallow: ['/dashboard/*'] },
    ],
  },
  sitemapSize: 7000, 
  outDir: './public',
  additionalPaths: async (config) => [
    await config.transform(config, '/blog'),
    await config.transform(config, '/contactame'),
    await config.transform(config, '/politica-privacidad-y-proteccion-datos'),
    await config.transform(config, '/proyectos-desarrollo-web-y-aplicaciones-moviles'),
    await config.transform(config, '/terminos-y-condiciones'),
    await config.transform(config, '/login'),
    await config.transform(config, '/registro'),

  ],
}