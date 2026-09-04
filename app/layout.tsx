import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import "./accessibility.css";

const title = "Denys Lopez — AI Product Engineer & Design Engineer";
const description = "AI Product Engineer and Design Engineer building intelligent digital products across Canada, the United States and El Salvador.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Denys Lopez",
  },
  description,
  applicationName: "Denys Lopez Portfolio",
  authors: [{ name: "Denys Lopez" }],
  creator: "Denys Lopez",
  publisher: "Denys Lopez",
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Denys Lopez",
    title,
    description,
    locale: "en_CA",
    alternateLocale: ["es_SV"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
