/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/@:user',
        destination: '/user/:user'
      },
      {
        source: '/@:user/:repl',
        destination: '/user/:user/:repl'
      }
    ]
  },
  images: {
    domains: ['storage.googleapis.com'],
  }
}

module.exports = nextConfig;
