import Link from "next/link";
import type { Locale } from "@/lib/content";
import { LocaleSwitch } from "./LocaleSwitch";

type NavLabels = {
  work: string;
  lab: string;
  about: string;
  contact: string;
};

export function Nav({ locale, labels }: { locale: Locale; labels: NavLabels }) {
  return (
    <header className="site-nav">
      <Link href={`/${locale}`} className="brand" aria-label="Denys Lopez home">
        <span>DENYS LOPEZ</span>
        <small>EDITION 001 / 09.2026</small>
      </Link>
      <nav aria-label="Primary navigation">
        <a href="#work">{labels.work}</a>
        <a href="#lab">{labels.lab}</a>
        <a href="#about">{labels.about}</a>
        <a href="#contact">{labels.contact}</a>
      </nav>
      <LocaleSwitch locale={locale} />
    </header>
  );
}
