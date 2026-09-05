export function ClientArchive({ eyebrow, title, items }: {
  eyebrow: string;
  title: string;
  items: readonly { index: string; title: string; category: string; url: string }[];
}) {
  return (
    <section className="section archive-section" id="archive">
      <div className="section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="archive-index">
        {items.map((item) => (
          <a className="archive-row" href={item.url} target="_blank" rel="noreferrer" key={item.index}>
            <span className="label archive-no">{item.index}</span>
            <strong>{item.title}</strong>
            <span className="label archive-category">{item.category}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
