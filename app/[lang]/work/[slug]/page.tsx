import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentLocale } from "@/components/DocumentLocale";
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

  return {
    title: project.title,
    description: project.summary,
    alternates: { languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}` } },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const project = getProject(locale, slug);
  if (!project) notFound();
  const c = getContent(locale);

  const labels = locale === "en" ? {
    back: "Back to selected work",
    challenge: "The challenge",
    approach: "The approach",
    highlights: "What the experience demonstrates",
    stack: "Focus / Technology",
    live: "View live project",
    next: "Explore more work",
  } : {
    back: "Volver al trabajo seleccionado",
    challenge: "El reto",
    approach: "El enfoque",
    highlights: "Lo que demuestra la experiencia",
    stack: "Enfoque / Tecnología",
    live: "Ver proyecto en vivo",
    next: "Explorar más trabajo",
  };

  return (
    <main className="case-study">
      <DocumentLocale locale={locale} />
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

      <section className="case-evidence">
        <div>
          <span className="label">03 / {labels.highlights}</span>
          <ul>
            {project.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <span className="label">04 / {labels.stack}</span>
          <ul className="case-stack">
            {project.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="case-live">
        <p>{project.statement}</p>
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-live-link">{labels.live} ↗</a>
      </section>

      <footer className="case-footer">
        <Link href={`/${locale}#work`}>{labels.next} ↙</Link>
        <span>DENYS LOPEZ / PORTFOLIO 001</span>
      </footer>
    </main>
  );
}
