import type { NextConfig } from "next";
import { baseURL } from "./lib/base-url";

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
  async headers() {
    return [
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
