import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { fontVariables } from "../fonts";
import "../globals.css";
import "../experience.css";
import "../accessibility.css";
import "../r1.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
};

export default function RedirectRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
