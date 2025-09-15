import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com"
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net"
      }
    ]
  }
};

export default nextConfig;
