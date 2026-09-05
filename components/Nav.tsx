import Link from "next/link";
import type { Locale } from "@/lib/content";
import { LocaleSwitch } from "./LocaleSwitch";

type NavLabels = {
  work: string;
  axom: string;
  about: string;
  contact: string;
};

export function Nav({ locale, labels }: { locale: Locale; labels: NavLabels }) {
  const home = `/${locale}`;
  const items = [
    { href: `${home}#work`, label: labels.work },
    { href: `${home}#axom`, label: labels.axom },
    { href: `${home}#about`, label: labels.about },
    { href: `${home}#contact`, label: labels.contact },
  ];

  return (
    <header className="site-nav">
      <Link href={home} className="brand" aria-label="Denys Lopez home">
        <span>DENYS LOPEZ</span>
        <small>EDITION 001 / R4</small>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {items.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>

      <LocaleSwitch locale={locale} />

      <nav className="r3-mobile-nav" aria-label={locale === "en" ? "Mobile navigation" : "Navegación móvil"}>
        {items.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
}
