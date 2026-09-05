export function RangeSection({ eyebrow, title, body, note }: {
  eyebrow: string;
  title: string;
  body: string;
  note: string;
}) {
  return (
    <section className="r3-range" aria-labelledby="range-title">
      <div className="r3-range-inner">
        <span className="label">{eyebrow}</span>
        <h2 id="range-title">{title}</h2>
        <div className="r3-range-foot">
          <p>{body}</p>
          <span className="r3-range-note">{note}</span>
        </div>
      </div>
    </section>
  );
}
