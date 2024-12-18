import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products?page=1",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/products",
        has: [
          {
            type: "query",
            key: "page",
            value: "(?<id>.*)",
          },
        ],
        destination: "/products/:id",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
