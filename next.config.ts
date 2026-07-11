import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin fonts and external images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fonts.googleapis.com" },
      { protocol: "https", hostname: "fonts.gstatic.com" },
    ],
  },
};

export default nextConfig;
