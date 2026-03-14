const siteOrigin =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

if (!siteOrigin) {
  throw new Error("NEXT_PUBLIC_SITE_URL or VERCEL_URL is not defined");
}

export const siteUrl = new URL(
  siteOrigin.includes("http") ? siteOrigin : `https://${siteOrigin}`,
);
