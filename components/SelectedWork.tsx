import Link from "next/link";
import type { Locale } from "@/lib/content";
import { projectPresentation } from "@/lib/projects";

export function SelectedWork({ eyebrow, title, items, locale }: {
  eyebrow: string;
  title: string;
  items: readonly { index: string; title: string; category: string; url: string }[];
  locale: Locale;
}) {
  return (
    <section className="section work-section" id="work">
      <div className="section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="work-index">
        {items.map((item) => {
          const presentation = projectPresentation[item.url as keyof typeof projectPresentation];
          const href = presentation ? `/${locale}/work/${presentation.slug}` : item.url;

          return (
            <Link href={href} className="work-row" key={item.index}>
              <span className="work-preview" aria-hidden="true">
                {presentation ? <img src={presentation.media} alt="" loading="lazy" /> : null}
              </span>
              <span className="work-index-no label">{item.index}</span>
              <span className="work-title">{item.title}</span>
              <span className="work-category label">{item.category}</span>
              <span className="work-arrow" aria-hidden="true">↗</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
