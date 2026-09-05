import Link from "next/link";
import { Nav } from "./Nav";
import { getContent, type Locale } from "@/lib/content";
import { archiveLabels, getArchiveEntry } from "@/lib/work-archive";
import "@/app/[lang]/work/work.css";

export function ArchiveEntry({ locale, entry }: { locale: Locale; entry: NonNullable<ReturnType<typeof getArchiveEntry>> }) {
  const labels = archiveLabels[locale];
  return <main className="r3-site work-archive">
    <Nav locale={locale} labels={getContent(locale).nav} />
    <header className="work-intro">
      <Link href={`/${locale}/work`} className="label">← {labels.back}</Link>
      <h1>{entry.title}</h1>
      <span className="label">{entry.category} / {entry.exploration ? labels.experiments : labels.entry}</span>
      <p>{entry.summary}</p>
    </header>
    {entry.image ? <figure className="work-entry-figure">
      <img src={entry.image} alt={`${entry.title} — ${locale === "en" ? "website screenshot" : "captura del sitio web"}`} width={1440} height={entry.slug === "lost-connection-games" ? 650 : 1000} />
      <figcaption>{labels.capture}</figcaption>
    </figure> : null}
    <div className="work-entry-note"><p>{labels.scope}</p>
      {entry.url ? <a href={entry.url} target="_blank" rel="noreferrer">{labels.visit} ↗</a> : null}
    </div>
    <footer className="case-footer"><Link href={`/${locale}/work`}>← {labels.back}</Link><span>DENYS LOPEZ / PORTFOLIO 001</span></footer>
  </main>;
}
