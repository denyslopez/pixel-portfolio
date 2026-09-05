import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "../globals.css";
import "../experience.css";
import "../accessibility.css";
import "../r1.css";

function getMetadataBase() {
  const vercelUrl = process.env.VERCEL_URL;
  return new URL(vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
};

export default function RedirectRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
