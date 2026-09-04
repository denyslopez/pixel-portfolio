"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function KineticPractice({ eyebrow, statement, words, body }: {
  eyebrow: string;
  statement: string;
  words: readonly string[];
  body: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dispatchStage = (stage: number) => {
      rootRef.current?.setAttribute("data-stage", String(stage));
      window.dispatchEvent(new CustomEvent("portfolio:stage", { detail: { stage } }));
    };

    if (reduce) {
      dispatchStage(0);
      return;
    }

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-practice-stage]");
      stages.forEach((stage, index) => {
        const word = stage.querySelector("[data-practice-word]");
        if (!word) return;

        gsap.fromTo(word,
          { xPercent: index % 2 === 0 ? -7 : 7, scaleX: .86, opacity: .2, fontStyle: "normal" },
          {
            xPercent: 0,
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 78%",
              end: "center 42%",
              scrub: .55,
              onEnter: () => dispatchStage(index),
              onEnterBack: () => dispatchStage(index),
            },
          }
        );

        gsap.to(word, {
          xPercent: index % 2 === 0 ? 4 : -4,
          opacity: .13,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "center 38%",
            end: "bottom 12%",
            scrub: .55,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="practice-section" data-stage="0">
      <div className="practice-intro">
        <span className="label">{eyebrow}</span>
        <h2>{statement}</h2>
      </div>

      <div className="practice-sequence">
        {words.map((word, index) => {
          const lengthClass = word.length >= 10
            ? " practice-stage--long"
            : word.length >= 8
              ? " practice-stage--medium"
              : "";

          return (
            <article
              className={`practice-stage${lengthClass}`}
              data-practice-stage
              data-stage-index={index}
              key={word}
            >
              <span className="label">0{index + 1}</span>
              <strong data-practice-word>{word}</strong>
            </article>
          );
        })}
      </div>

      <p className="practice-copy">{body}</p>
    </section>
  );
}
