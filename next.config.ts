import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Keep optimized images for 31 days (default 4 h) to save Vercel image
    // transformations. Sanity images get a new URL when replaced; for files
    // in public/, give a replacement a new filename.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    // Brand images, icons and the hero video: browsers keep them for 7 days
    // instead of re-checking on every visit (Next serves public/ files with
    // max-age=0 by default). Rename a file when replacing it.
    const weekCache = [
      { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
    ]
    return [
      { source: "/brand/:path*", headers: weekCache },
      { source: "/icons/:path*", headers: weekCache },
      { source: "/hero_bg.mp4", headers: weekCache },
    ]
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
