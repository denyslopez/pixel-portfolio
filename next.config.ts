import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel packages the Next.js output itself. Keep standalone artifacts for
  // local QA without making Vercel's build hook process them a second time.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
