/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // 로컬 테스트 하기위함,cors에러 방지
  async rewrites() {
    return [
      {
        source: "/oauth2.0/:path*", // url이 source에 해당될 경우
        destination: "https://nid.naver.com/oauth2.0/:path*", // destination으로 redirect
      },
    ];
  },
};

module.exports = nextConfig;
