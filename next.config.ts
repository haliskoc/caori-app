import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.openfoodfacts.org",
      },
      {
        protocol: "https",
        hostname: "world.openfoodfacts.org",
      },
      {
        protocol: "https",
        hostname: "tr.openfoodfacts.org",
      },
      {
        protocol: "https",
        hostname: "www.foodrepo.org",
      },
      {
        protocol: "https",
        hostname: "cdn.foodrepo.org",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "cdn.auth0.com",
      },
    ],
  },
};

export default nextConfig;
