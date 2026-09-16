import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";

const locales = ["en", "es"] as const;
const primaryRoutes = ["", "/solutions", "/work", "/axom", "/partners", "/about", "/discuss"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    primaryRoutes.map((route) => ({
      url: new URL(`/${locale}${route}`, site).toString(),
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/work" || route === "/solutions" || route === "/discuss" ? 0.9 : 0.7,
    })),
  );

  const selectedWork = locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      url: new URL(`/${locale}/work/${slug}`, site).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  );

  return [...pages, ...selectedWork];
}
