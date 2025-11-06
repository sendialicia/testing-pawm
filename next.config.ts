import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Explicit Turbopack root directory to avoid "inferred workspace root" warnings
  turbopack: {
    root: path.resolve(__dirname)
  } as any,
};

export default nextConfig;
