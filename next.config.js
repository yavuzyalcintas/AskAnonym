/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["ui-avatars.com", "bbjytqpuidiyojcvwhsd.supabase.co"],
    minimumCacheTTL: 3600
  }
};

module.exports = nextConfig;
