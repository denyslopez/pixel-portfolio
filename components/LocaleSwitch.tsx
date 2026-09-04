"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const other = locale === "en" ? "es" : "en";
  return (
    <div className="locale-switch" aria-label="Language selector">
      <span aria-current="page">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <Link href={`/${other}`}>{other.toUpperCase()}</Link>
    </div>
  );
}
