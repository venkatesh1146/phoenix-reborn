// next.config.js
/** @type {import('next').NextConfig} */
// next-linaria.config.js
const withLinaria = require('next-linaria')

const webpackConfig = withLinaria({
  // settings from next.config.js
  reactStrictMode: true,
  assetPrefix: '/', //TODO: need to update this
  basePath: '/',
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
  module: {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  },
  //base path
})
module.exports = webpackConfig
