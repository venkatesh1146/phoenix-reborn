// next.config.js
/** @type {import('next').NextConfig} */
// next-linaria.config.js
const withLinaria = require('next-linaria')

const webpackConfig = withLinaria({
  // settings from next.config.js
  reactStrictMode: true,
  swcMinify: true,
  //base path
})
module.exports = webpackConfig
