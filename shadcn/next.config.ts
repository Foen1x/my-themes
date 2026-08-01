import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@my-themes/theme-contract"],
};

export default nextConfig;
