const defaultSiteOrigin = "http://localhost:3000";

export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteOrigin;
export const siteUrl = new URL(siteOrigin);
