import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreativeBurst } from "@/components/creative-burst/CreativeBurst";
import { isLocale, locales, type Locale } from "@/lib/content";
import { getArchiveEntries } from "@/lib/work-archive";
import { getProject, getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const title = lang === "en"
    ? "Denysoft — Strategy, Design, Engineering, Growth & AI"
    : "Denysoft — Estrategia, Diseño, Ingeniería, Crecimiento e IA";
  const description = lang === "en"
    ? "Denysoft finds what is slowing growth down and builds the digital systems that move the business forward."
    : "Denysoft identifica qué está frenando el crecimiento y construye los sistemas digitales que hacen avanzar el negocio.";
  const canonicalPath = `/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      locale: lang === "en" ? "en_CA" : "es_SV",
      alternateLocale: [lang === "en" ? "es_SV" : "en_CA"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Denysoft" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
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

  return (
    <>
      <style>{`
        .selected-work-effects [class*="workMedia"] {
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
        }

        .selected-work-effects [class*="workCase"]:hover [class*="workMedia"],
        .selected-work-effects [class*="workCase"]:focus-within [class*="workMedia"] {
          transform: translateY(-6px);
          box-shadow:
            0 28px 64px rgba(0, 0, 0, 0.34),
            0 0 0 1px rgba(254, 81, 47, 0.22),
            0 0 38px rgba(254, 81, 47, 0.07);
        }

        @media (prefers-reduced-motion: reduce) {
          .selected-work-effects [class*="workMedia"] {
            transition: box-shadow 160ms ease;
          }

          .selected-work-effects [class*="workCase"]:hover [class*="workMedia"],
          .selected-work-effects [class*="workCase"]:focus-within [class*="workMedia"] {
            transform: none;
          }
        }
      `}</style>
      <div className="selected-work-effects">
        <CreativeBurst locale={locale} selected={selected} archive={archive} />
      </div>
    </>
  );
}
