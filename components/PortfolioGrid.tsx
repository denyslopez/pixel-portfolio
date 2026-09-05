import Link from "next/link";
import type { Locale } from "@/lib/content";
import { getPortfolioGridEntries, archiveLabels } from "@/lib/work-archive";

export function PortfolioGrid({ eyebrow, title, lead, cta, locale }: {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  locale: Locale;
}) {
  const entries = getPortfolioGridEntries(locale);
  const labels = archiveLabels[locale];

  return (
    <section className="r3-portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div className="r3-section-heading r3-portfolio-heading">
        <span className="label">{eyebrow}</span>
        <div>
          <h2 id="portfolio-title">{title}</h2>
          <p className="r3-portfolio-lead">{lead}</p>
        </div>
      </div>

      <div className="r3-portfolio-grid">
        {entries.map((entry) => (
          <Link href={`/${locale}/work/${entry.slug}`} className={`r3-portfolio-card${entry.image ? "" : " r3-portfolio-card--text"}`} key={entry.slug}>
            <div className="r3-portfolio-media">
              {entry.image ? (
                <img src={entry.image} alt="" loading="lazy" />
              ) : (
                <span className="r3-portfolio-noimage">{labels.noImage}</span>
              )}
              <span className="r3-portfolio-overlay" aria-hidden="true" />
            </div>
            <div className="r3-portfolio-copy">
              <span className="label">{entry.category}</span>
              <h3>{entry.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <Link href={`/${locale}/work`} className="r3-work-all">
        {cta} <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
