import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.90'],
  images: {
    domains: ["picsum.photos"],
  }
};

export default nextConfig;
