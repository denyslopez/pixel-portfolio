export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div>
        <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: ".1em" }}>404 / Not Found</p>
        <a href="/en" style={{ textDecoration: "underline" }}>Return to portfolio</a>
      </div>
    </main>
  );
}
