/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://graphql.anilist.co', 's4.anilist.co'],
  },
}

module.exports = nextConfig
