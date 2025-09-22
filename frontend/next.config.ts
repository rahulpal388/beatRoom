import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com"
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      }
    ]
  }
};

export default nextConfig;
