import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { getContent, isLocale } from "@/lib/content";
import { archiveLabels, getWorkItems } from "@/lib/work-archive";
import "./work.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const labels = archiveLabels[lang];
  return {
    title: labels.title, description: labels.intro,
    alternates: { canonical: `/${lang}/work`, languages: { en: "/en/work", es: "/es/work" } },
    openGraph: { title: `${labels.title} — Denys Lopez`, description: labels.intro, url: `/${lang}/work`, locale: lang === "en" ? "en_CA" : "es_SV", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${labels.title} — Denys Lopez`, description: labels.intro, images: ["/twitter-image"] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const labels = archiveLabels[lang];
  const items = getWorkItems(lang);
  const groups = [
    { title: labels.selected, items: items.filter(item => item.selected) },
    { title: labels.historical, items: items.filter(item => !item.selected && !item.exploration) },
    { title: labels.experiments, items: items.filter(item => item.exploration) },
  ];
  return <main className="r3-site work-archive">
    <Nav locale={lang} labels={getContent(lang).nav} />
    <header className="work-intro">
      <Link href={`/${lang}#work`} className="label">← {labels.home}</Link>
      <h1>{labels.title}</h1><p>{labels.intro}</p>
    </header>
    {groups.map(group => <section className="work-group" key={group.title}>
      <h2>{group.title}</h2>
      <div className="work-archive-grid">{group.items.map(item => <article className="work-archive-card" key={item.slug}>
        {item.image ? <img src={item.image} alt={`${item.title} — ${lang === "en" ? "website screenshot" : "captura del sitio web"}`} width={1440} height={item.slug === "lost-connection-games" ? 650 : 1000} loading="lazy" /> : null}
        <div className="work-archive-copy">
          <span className="label">{item.category}</span>
          <h3><Link href={`/${lang}/work/${item.slug}`}>{item.title}<span aria-hidden="true"> ↗</span></Link></h3>
          <p>{item.summary}</p>
          <span className="label">{item.selected ? labels.case : item.exploration ? labels.experiments : labels.entry}</span>
        </div>
      </article>)}</div>
    </section>)}
    <footer className="case-footer"><Link href={`/${lang}#work`}>← {labels.home}</Link><span>DENYS LOPEZ / PORTFOLIO 001</span></footer>
  </main>;
}
