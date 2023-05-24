// next.config.js
/** @type {import('next').NextConfig} */
// next-linaria.config.js
const withLinaria = require('next-linaria')

const webpackConfig = withLinaria({
  // settings from next.config.js
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.wlycdn.com',
        port: '',
        pathname: '**/**/**/**',
      },
    ],
  },
  //base path
})
module.exports = webpackConfig
