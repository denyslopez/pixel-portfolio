import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreativeBurst } from "@/components/creative-burst/CreativeBurst";
import { isLocale, type Locale } from "@/lib/content";
import { getArchiveEntries } from "@/lib/work-archive";
import { getProject, getProjectSlugs } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Denysoft Creative Burst",
  description: "Isolated whole-page visual exploration for Denysoft.",
  robots: { index: false, follow: false },
};

export default async function CreativeBurstPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const selected = getProjectSlugs().map((slug) => {
    const project = getProject(locale, slug)!;
    return {
      slug,
      title: project.title,
      category: project.category,
      summary: project.summary,
      image:
        slug === "taller-express"
          ? "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg"
          : `/work/${slug}.jpg`,
    };
  });

  const archive = getArchiveEntries(locale).map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    summary: entry.summary,
    image: entry.image,
    exploration: entry.exploration ?? false,
  }));

  return <CreativeBurst locale={locale} selected={selected} archive={archive} />;
}
