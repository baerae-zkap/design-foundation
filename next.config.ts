import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/design-foundation',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
