import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home directory above this project contains its own package.json, which
  // Turbopack would otherwise infer as the workspace root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
