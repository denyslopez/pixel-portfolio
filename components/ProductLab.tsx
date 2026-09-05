import Link from "next/link";
import type { Locale } from "@/lib/content";

export function ProductLab({ eyebrow, title, body, items, locale }: {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly { index: string; title: string; category: string; description: string; url?: string; slug?: string }[];
  locale: Locale;
}) {
  return (
    <section className="section lab-section" id="lab">
      <div className="section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p className="lab-intro">{body}</p>
      <div className="lab-index">
        {items.map((item) => {
          const content = (
            <>
              <span className="label">{item.index}</span>
              <div>
                <strong>{item.title}</strong>
                <span className="label lab-category">{item.category}</span>
              </div>
              <p>{item.description}</p>
              <span className="lab-arrow" aria-hidden="true">{item.url || item.slug ? "↗" : "●"}</span>
            </>
          );

          if (item.slug) {
            return <Link className="lab-row" href={`/${locale}/work/${item.slug}`} key={item.index}>{content}</Link>;
          }
          if (item.url) {
            return <a className="lab-row" href={item.url} target="_blank" rel="noreferrer" key={item.index}>{content}</a>;
          }
          return <article className="lab-row lab-row--static" key={item.index}>{content}</article>;
        })}
      </div>
    </section>
  );
}
