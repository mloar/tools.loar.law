import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['test.internal.loar.network'],
  output: 'export',
};

export default nextConfig;
