import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern, smaller formats where the browser supports them.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for 31 days.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      // Photos uploaded through the admin portal (Supabase storage).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
