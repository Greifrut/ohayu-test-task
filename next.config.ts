import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    providerCatalog: {
      stale: 300,
      revalidate: 43200,
      expire: 604800,
    },
    seoManaged: {
      stale: 300,
      revalidate: 2592000,
      expire: 31536000,
    },
  },
};

export default nextConfig;
