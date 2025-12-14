import type { NextConfig } from "next";
import { baseURL } from "./lib/base-url";

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
  async headers() {
    return [
      // CORS for assets/fonts when embedded in ChatGPT widget sandbox.
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
      {
        source: "/widgets/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://apps-sdk-everything.vercel.app; frame-ancestors *;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
