const million = require("million/compiler");
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/feedback",
        destination: "https://feedback.untitled.dev",
      },
    ];
  },
};

module.exports = million.next(withContentlayer(config), {
  auto: { rsc: true },
});
