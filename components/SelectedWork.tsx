export function SelectedWork({ eyebrow, title, items }: {
  eyebrow: string;
  title: string;
  items: readonly { index: string; title: string; category: string; url: string }[];
}) {
  return (
    <section className="section work-section" id="work">
      <div className="section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="work-index">
        {items.map((item) => (
          <a href={item.url} target="_blank" rel="noreferrer" className="work-row" key={item.index}>
            <span className="work-index-no label">{item.index}</span>
            <span className="work-title">{item.title}</span>
            <span className="work-category label">{item.category}</span>
            <span className="work-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
