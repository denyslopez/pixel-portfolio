import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Denys Lopez — AI Product Engineer & Design Engineer",
    template: "%s — Denys Lopez",
  },
  description:
    "AI Product Engineer and Design Engineer building intelligent digital products across Canada, the United States and El Salvador.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
