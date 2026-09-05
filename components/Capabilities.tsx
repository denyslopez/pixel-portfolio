export function Capabilities({ eyebrow, title, groups }: {
  eyebrow: string;
  title: string;
  groups: readonly (readonly string[])[];
}) {
  return (
    <section className="r3-capabilities" id="capabilities" aria-labelledby="capabilities-title">
      <div className="r3-section-heading">
        <span className="label">{eyebrow}</span>
        <h2 id="capabilities-title">{title}</h2>
      </div>
      <div className="r3-cap-grid">
        {groups.map(([name, ...skills], index) => (
          <article className="r3-cap-group" key={name}>
            <span className="label">{String(index + 1).padStart(2, "0")}</span>
            <h3>{name}</h3>
            <p>{skills.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
