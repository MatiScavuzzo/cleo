/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ADMIN_USER: process.env.ADMIN_USER,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mirrcnwpobmbrlaxjyuj.supabase.co',
      }
    ]
  }
}

module.exports = nextConfig
