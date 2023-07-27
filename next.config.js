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
            hostname: '18.213.34.154',
            port: '',
            pathname: '/wp-content/**',
          },
        ],
      },
}

module.exports = nextConfig
