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
  const home = `/${locale}`;

  return (
    <header className="site-nav">
      <Link href={home} className="brand" aria-label="Denys Lopez home">
        <span>DENYS LOPEZ</span>
        <small>EDITION 001 / 09.2026</small>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href={`${home}#work`}>{labels.work}</Link>
        <Link href={`${home}#practice`}>{labels.lab}</Link>
        <Link href={`${home}#about`}>{labels.about}</Link>
        <Link href={`${home}#contact`}>{labels.contact}</Link>
      </nav>
      <LocaleSwitch locale={locale} />
    </header>
  );
}
