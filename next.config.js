/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: process.env.WP_PROTOCOL,
            hostname: process.env.WP_DOMAIN, 
            port: '',
            pathname: '/wp-content/**',
          },
        ],
      },
}

module.exports = nextConfig
