import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['test.internal.loar.network'],
  basePath: '/cook-county-order-builder',
};

export default nextConfig;
