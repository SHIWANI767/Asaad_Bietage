// next.config.js
// const path = require("path");

/**  @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: process.env.BASE_URL,
    REDIRECT_URI: process.env.REDIRECT_URI,
    NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
      process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
    DOCUSEAL_SRC_URL: process.env.DOCUSEAL_SRC_URL,
    NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },

  // compiler: {
  //   removeConsole: true,
  // },
};

module.exports = nextConfig;
