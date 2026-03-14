import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    providerCatalog: {
      stale: 300,
      revalidate: 172800,
      expire: 604800,
    },
    seoManaged: {
      stale: 300,
      revalidate: 2592000,
      expire: 31536000,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  analyzerMode: "static",
  openAnalyzer: false,
})(nextConfig);
