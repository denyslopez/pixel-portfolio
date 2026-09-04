import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ImmersiveField } from "@/components/experience/ImmersiveField";
import { getContent, isLocale, locales, type Locale } from "@/lib/content";
import { getProject, getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return locales.flatMap((lang) => getProjectSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = getProject(lang, slug);
  if (!project) return {};

  const title = `${project.title} — Denys Lopez`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}` } },
    openGraph: {
      title,
      description: project.summary,
      locale: lang === "en" ? "en_CA" : "es_SV",
      alternateLocale: [lang === "en" ? "es_SV" : "en_CA"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Denys Lopez portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: ["/twitter-image"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const project = getProject(locale, slug);
  if (!project) notFound();
  const c = getContent(locale);
  const liveReady = slug !== "villas-de-san-luis";

  const labels = locale === "en" ? {
    back: "Back to selected work",
    challenge: "The challenge",
    approach: "The approach",
    flow: "Product flow",
    decisions: "Key decisions",
    gallery: "Evidence views",
    highlights: "What the experience demonstrates",
    stack: "Focus / Technology",
    live: "View live project",
    evolving: "Live project evolving",
    next: "Explore more work",
  } : {
    back: "Volver al trabajo seleccionado",
    challenge: "El reto",
    approach: "El enfoque",
    flow: "Flujo del producto",
    decisions: "Decisiones clave",
    gallery: "Vistas de evidencia",
    highlights: "Lo que demuestra la experiencia",
    stack: "Enfoque / Tecnología",
    live: "Ver proyecto en vivo",
    evolving: "Proyecto en evolución",
    next: "Explorar más trabajo",
  };

  return (
    <main className="case-study">
      <ImmersiveField />
      <Nav locale={locale} labels={c.nav} />

      <header className="case-hero">
        <Link href={`/${locale}#work`} className="case-back label">← {labels.back}</Link>
        <div className="case-kicker label">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-statement">{project.statement}</p>
        <p className="case-summary">{project.summary}</p>
      </header>

      <section className="case-media" aria-label={`${project.title} project media`}>
        <div className="case-media-frame">
          <img src={project.media} alt={`${project.title} interface preview`} />
        </div>
      </section>

      <section className="case-body">
        <article className="case-block">
          <span className="label">01 / {labels.challenge}</span>
          <p>{project.challenge}</p>
        </article>
        <article className="case-block case-block--offset">
          <span className="label">02 / {labels.approach}</span>
          <p>{project.approach}</p>
        </article>
      </section>

      <section className="case-flow-section">
        <span className="label">03 / {labels.flow}</span>
        <ol className="case-flow">
          {project.flow.map((item, index) => (
            <li key={item}>
              <span className="label">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-decisions">
        <span className="label">04 / {labels.decisions}</span>
        <div className="case-decision-grid">
          {project.decisions.map((decision, index) => (
            <article key={decision.title}>
              <span className="label">D{String(index + 1).padStart(2, "0")}</span>
              <h2>{decision.title}</h2>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="case-gallery" aria-label={labels.gallery}>
          <div className="case-gallery-heading"><span className="label">{labels.gallery}</span></div>
          {project.gallery.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </section>
      ) : null}

      <section className="case-evidence">
        <div>
          <span className="label">05 / {labels.highlights}</span>
          <ul>
            {project.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <span className="label">06 / {labels.stack}</span>
          <ul className="case-stack">
            {project.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="case-live">
        <p>{project.statement}</p>
        {liveReady ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-live-link">{labels.live} ↗</a>
        ) : (
          <span className="case-live-link" aria-label={labels.evolving}>{labels.evolving}</span>
        )}
      </section>

      <footer className="case-footer">
        <Link href={`/${locale}#work`}>{labels.next} ↙</Link>
        <span>DENYS LOPEZ / PORTFOLIO 001</span>
      </footer>
    </main>
  );
}
