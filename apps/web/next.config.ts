import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@ivba/api-client",
    "@ivba/store",
    "@ivba/domain",
    "@ivba/design-tokens",
  ],
};

export default nextConfig;
