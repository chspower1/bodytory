module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["toriai.s3.ap-northeast-2.amazonaws.com"],
  },
};
