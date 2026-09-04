"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locale === "en" ? "es" : "en";
  const segments = pathname.split("/");
  segments[1] = other;
  const href = segments.join("/") || `/${other}`;

  return (
    <div className="locale-switch" aria-label="Language selector">
      <span aria-current="page">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <Link href={href} hrefLang={other}>{other.toUpperCase()}</Link>
    </div>
  );
}
