/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
  images: {
    domains: ["github.com", "www.google.com", "google.com", "linkedin.com"],
  },
  async rewrites() {
    return [
      {
        "source": "/favicon.ico",
        destination: "https://github.com/rawnly.png?size=32"
      },
      {
        source: '/ingest/:path*',
        destination: 'https://app.posthog.com/:path*'
      },
    ]
  }
};

module.exports = nextConfig;
