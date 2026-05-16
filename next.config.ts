import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.*'],
  images: {
    remotePatterns: [],
  }
};

export default nextConfig;
