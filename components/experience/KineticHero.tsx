"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function KineticHero({ eyebrow, lines, supporting, cta, secondary, contactHref }: {
  eyebrow: string;
  lines: readonly string[];
  supporting: string;
  cta: string;
  secondary: string;
  contactHref: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-r3-hero-line]", {
        yPercent: 78,
        opacity: 0,
        duration: .95,
        stagger: .09,
        ease: "power4.out",
      });

      gsap.from("[data-r3-hero-meta]", {
        opacity: 0,
        y: 16,
        duration: .7,
        delay: .36,
        stagger: .06,
        ease: "power2.out",
      });

      gsap.from("[data-r3-hero-visual]", {
        opacity: 0,
        scale: .975,
        duration: 1.15,
        delay: .18,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="r3-hero" aria-labelledby="hero-title">
      <div className="r3-hero-eyebrow label" data-r3-hero-meta>{eyebrow}</div>

      <h1 id="hero-title" className="r3-hero-title">
        {lines.map((line, index) => (
          <span className={`r3-hero-line${index === 1 ? " r3-hero-line--accent" : ""}`} key={line}>
            <span data-r3-hero-line>{line}</span>
          </span>
        ))}
      </h1>

      <div className="r3-hero-visual" data-r3-hero-visual aria-hidden="true">
        <div className="r3-visual-meta">
          <span>CONTROLLED ENERGY</span>
          <span>PRODUCT / DESIGN / ENGINEERING / AI</span>
        </div>
      </div>

      <div className="r3-hero-bottom" data-r3-hero-meta>
        <p>{supporting}</p>
        <div className="r3-hero-actions">
          <a className="r3-link r3-link--signal" href="#work">{cta} ↘</a>
          <a className="r3-link" href={contactHref}>{secondary} ↗</a>
        </div>
      </div>
    </section>
  );
}
