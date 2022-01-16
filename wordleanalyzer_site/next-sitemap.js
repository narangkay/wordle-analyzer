module.exports = {
    siteUrl: process.env.VERCEL_URL ? ('https://' + process.env.VERCEL_URL) : ('http://localhost:' + (process.env.PORT ?? 3000)),
    generateRobotsTxt: true,
}