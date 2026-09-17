import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel packages the Next.js output itself. Keep standalone artifacts for
  // local QA without making Vercel's build hook process them a second time.
  output: process.env.VERCEL ? undefined : "standalone",

  // TEMPORARY: serve the lab.html prototype at the site root instead of the
  // real homepage while denysoft.net's direction is being decided. beforeFiles
  // is required here because "/" already resolves to app/(root)/page.tsx
  // (which redirects to /en) — a default afterFiles rewrite would never fire.
  // Revert by deleting this rewrites() block.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/lab.html" },
      ],
    };
  },
};

export default nextConfig;

