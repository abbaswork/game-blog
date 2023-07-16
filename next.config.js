/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn2.whatoplay.com',
            port: '',
            pathname: '/news/**',
          },
          {
            protocol: 'http',
            hostname: 'gameblog.local',
            port: '',
            pathname: '/wp-content/**',
          },
        ],
      },
}

module.exports = nextConfig
