import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  redirects: () => [
    {
      source: "/rafla",
      destination: "https://rafla.xyz",
      permanent: false,
    },
    {
      source: "/whitepaper",
      destination: "/docs/whitepaper.pdf",
      permanent: false,
    },
  ],
};

export default nextConfig;
