import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run without disturbing a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75] },
};

export default nextConfig;
