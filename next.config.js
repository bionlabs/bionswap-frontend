/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "raw.githubusercontent.com",
      "gemini.com",
      "assets.coingecko.com",
      "s2.coinmarketcap.com",
      "jpyc.jp",
      "pbs.twimg.com",
      "bscscan.com",
      "shibawallet.pro",
    ],
  },
};

module.exports = nextConfig;
