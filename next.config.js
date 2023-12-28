/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
        port: '',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
