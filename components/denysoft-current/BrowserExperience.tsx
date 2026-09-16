"use client";

import { useEffect } from "react";

export function BrowserExperience() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-design-authority="denysoft-run001"]');
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.dataset.motionReady = reduced.matches ? "reduced" : "true";

    const sections = Array.from(root.querySelectorAll<HTMLElement>("#main-content > section"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const pointer = { x: window.innerWidth * 0.74, y: window.innerHeight * 0.28 };
    const applyPointer = () => {
      frame = 0;
      root.style.setProperty("--pointer-x", `${pointer.x}px`);
      root.style.setProperty("--pointer-y", `${pointer.y}px`);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };

    const applyScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, window.scrollY / max))));
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", applyScroll, { passive: true });
    applyPointer();
    applyScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", applyScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
