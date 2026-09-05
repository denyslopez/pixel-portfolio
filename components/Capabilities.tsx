export function Capabilities({ eyebrow, title, groups }: {
  eyebrow: string;
  title: string;
  groups: readonly (readonly string[])[];
}) {
  return (
    <section className="section capabilities" id="capabilities">
      <div className="section-heading">
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="cap-grid">
        {groups.map(([name, ...skills], index) => (
          <article className="cap-group" key={name}>
            <span className="label">0{index + 1}</span>
            <h3>{name}</h3>
            <p>{skills.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
