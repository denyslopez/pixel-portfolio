const DEFAULT_PRODUCTION_SITE_URL = "https://denysoft.net";

export function getSiteUrl() {
  const configuredSiteUrl = process.env.SITE_URL?.trim();
  if (configuredSiteUrl) return new URL(configuredSiteUrl);

  if (process.env.VERCEL_ENV === "production") {
    return new URL(DEFAULT_PRODUCTION_SITE_URL);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return new URL(`https://${vercelUrl}`);

  return new URL("http://localhost:3000");
}
