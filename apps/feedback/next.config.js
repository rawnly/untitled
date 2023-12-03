/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/back",
        destination: "https://untitled.dev",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
