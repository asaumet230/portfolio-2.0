
module.exports = {
    siteUrl: 'https://www.andressaumet.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
          { userAgent: '*', allow: '/' },
          // Puedes agregar más políticas según tus necesidades
        ],
      },

}