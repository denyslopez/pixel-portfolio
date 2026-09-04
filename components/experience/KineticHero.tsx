"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 72,
        rotateX: -16,
        opacity: 0,
        duration: 1.05,
        stagger: .11,
        ease: "power4.out",
      });

      gsap.from("[data-hero-meta]", {
        opacity: 0,
        y: 14,
        duration: .75,
        delay: .5,
        stagger: .07,
        ease: "power2.out",
      });

      gsap.to("[data-kinetic-primary]", {
        letterSpacing: "-0.055em",
        scaleX: 1.012,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero"
      aria-labelledby="hero-title"
      style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
    >
      <div className="hero-meta label" data-hero-meta style={{ minWidth: 0 }}>{eyebrow}</div>
      <div className="hero-title-wrap" style={{ width: "100%", minWidth: 0, maxWidth: "100%" }}>
        <h1
          id="hero-title"
          className="hero-title"
          data-kinetic-primary
          style={{ width: "100%", minWidth: 0, maxWidth: "100%" }}
        >
          {lines.map((line, i) => {
            const lengthClass = line.length >= 17
              ? " hero-line--long"
              : line.length >= 8
                ? " hero-line--medium"
                : "";
            const accentClass = i === 1 ? " hero-line--accent" : "";
            const lineStyle = line.length >= 17
              ? { fontSize: "clamp(44px, 8.8vw, 158px)" }
              : line.length >= 10
                ? { fontSize: i === 2 ? "clamp(46px, 9.8vw, 174px)" : "clamp(48px, 11.2vw, 178px)" }
                : line.length >= 8
                  ? { fontSize: "clamp(44px, 11.2vw, 178px)" }
                  : undefined;

            return (
              <span
                className={`hero-line${accentClass}${lengthClass}`}
                style={lineStyle}
                key={line}
              >
                <span data-hero-line>{line}</span>
              </span>
            );
          })}
        </h1>
      </div>
      <div className="hero-bottom" data-hero-meta style={{ minWidth: 0 }}>
        <p style={{ maxWidth: "min(100%, 34ch)", minWidth: 0 }}>{supporting}</p>
        <div className="hero-actions">
          <a className="text-link" href="#work">{cta} ↘</a>
          <a className="text-link text-link--muted" href={contactHref}>{secondary} ↗</a>
        </div>
      </div>
    </section>
  );
}
