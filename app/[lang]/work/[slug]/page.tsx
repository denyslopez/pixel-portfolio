import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreativeBurstWorkDetail } from "@/components/creative-burst/CreativeBurstWorkDetail";
import { isLocale, locales, type Locale } from "@/lib/content";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { getArchiveEntries, getArchiveEntry } from "@/lib/work-archive";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    [...getProjectSlugs(), ...getArchiveEntries(lang).map((entry) => entry.slug)].map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = getProject(lang, slug) ?? getArchiveEntry(lang, slug);
  if (!project) return {};

  const title = `${project.title} — Denysoft`;
  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}` },
    },
    openGraph: {
      title,
      description: project.summary,
      locale: lang === "en" ? "en_CA" : "es_SV",
      alternateLocale: [lang === "en" ? "es_SV" : "en_CA"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const project = getProject(locale, slug);
  if (project) {
    const image =
      slug === "taller-express"
        ? "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg"
        : `/work/${slug}.jpg`;

    return (
      <CreativeBurstWorkDetail
        locale={locale}
        slug={slug}
        kind="selected"
        item={{ ...project, image }}
      />
    );
  }

  const archive = getArchiveEntry(locale, slug);
  if (!archive) notFound();
  return <CreativeBurstWorkDetail locale={locale} slug={slug} kind="archive" item={archive} />;
}
