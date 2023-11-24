/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
  images: {
    domains: ["https://github.com", "https://linkedin.com"],
  },
};

module.exports = nextConfig;
