import { ImageResponse } from "next/og";

export const alt = "Denys Lopez — AI Product Engineer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          color: "#f3f2ed",
          padding: "64px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 20 }}>
          <span>DENYS LOPEZ</span>
          <span style={{ color: "#c8ff1a" }}>EDITION 001 / 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: .82, letterSpacing: "-0.055em", textTransform: "uppercase" }}>
          <span>I build</span>
          <span style={{ fontStyle: "italic", color: "#c8ff1a" }}>intelligent</span>
          <span>digital products.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "sans-serif", fontSize: 24 }}>
          <span>AI Product Engineer & Design Engineer</span>
          <span style={{ fontFamily: "monospace", fontSize: 17 }}>CANADA / USA / EL SALVADOR</span>
        </div>
      </div>
    ),
    size,
  );
}
