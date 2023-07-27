/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'ec2-18-213-34-154.compute-1.amazonaws.com', 
            port: '',
            pathname: '/wp-content/**',
          },
        ],
      },
}

module.exports = nextConfig
