"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function KineticHero({ eyebrow, lines, supporting, cta, secondary }: {
  eyebrow: string;
  lines: readonly string[];
  supporting: string;
  cta: string;
  secondary: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        rotateX: -22,
        opacity: 0,
        duration: 1.15,
        stagger: .1,
        ease: "power4.out",
      });

      gsap.from("[data-hero-meta]", {
        opacity: 0,
        y: 18,
        duration: .8,
        delay: .55,
        stagger: .07,
        ease: "power2.out",
      });

      gsap.to("[data-kinetic-primary]", {
        letterSpacing: "-0.075em",
        scaleX: 1.025,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-orbit]", {
        rotate: 180,
        yPercent: 70,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-meta label" data-hero-meta>{eyebrow}</div>
      <div className="hero-title-wrap">
        <h1 id="hero-title" className="hero-title" data-kinetic-primary>
          {lines.map((line, i) => {
            const lengthClass = line.length >= 17
              ? " hero-line--long"
              : line.length >= 12
                ? " hero-line--medium"
                : "";
            const accentClass = i === 1 ? " hero-line--accent" : "";
            const longLineStyle = line.length >= 17
              ? { fontSize: "clamp(56px, 9.4vw, 170px)" }
              : undefined;

            return (
              <span
                className={`hero-line${accentClass}${lengthClass}`}
                style={longLineStyle}
                key={line}
              >
                <span data-hero-line>{line}</span>
              </span>
            );
          })}
        </h1>
      </div>
      <div className="hero-orbit" data-hero-orbit aria-hidden="true"><span /></div>
      <div className="hero-bottom" data-hero-meta>
        <p>{supporting}</p>
        <div className="hero-actions">
          <a className="text-link" href="#work">{cta} ↘</a>
          <a className="text-link text-link--muted" href="#contact">{secondary} ↗</a>
        </div>
      </div>
    </section>
  );
}
