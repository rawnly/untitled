/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
  images: {
    domains: ["https://github.com", "https://linkedin.com"],
  },
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: 'https://app.posthog.com/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
