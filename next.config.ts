import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.117','10.152.36.72'],
  images: {
    domains: ["picsum.photos"],
  }
};

export default nextConfig;
