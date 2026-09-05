import Link from "next/link";
import type { Locale } from "@/lib/content";

export function SelectedWork({ eyebrow, title, items, locale }: {
  eyebrow: string;
  title: string;
  items: readonly {
    index: string;
    title: string;
    category: string;
    location: string;
    summary: string;
    slug: string;
    media?: string;
  }[];
  locale: Locale;
}) {
  return (
    <section className="r3-work" id="work">
      <div className="r3-section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>

      <div className="r3-work-grid">
        {items.map((item) => (
          <Link href={`/${locale}/work/${item.slug}`} className="r3-work-card" key={item.slug}>
            <div className={`r3-work-media r3-work-media--${item.slug}`}>
              {item.media ? <img src={item.media} alt="" loading="lazy" /> : null}
              <span className="r3-work-overlay" aria-hidden="true" />
              <div className="r3-work-meta">
                <span>{item.index}</span>
                <span>{item.location}</span>
              </div>
            </div>

            <div className="r3-work-copy">
              <span className="label">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="r3-work-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
