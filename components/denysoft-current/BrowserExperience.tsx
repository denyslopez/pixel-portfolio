"use client";

import { useEffect } from "react";

const CONTACT_EMAIL = "denys.lopez@gmail.com";

function prepareCommercialIntake(root: ParentNode) {
  const form = root.querySelector<HTMLFormElement>('form:has(textarea[name="challenge"])');
  if (!form) return;

  const locale = document.documentElement.lang === "es" ? "es" : "en";
  form.dataset.commercialIntake = "email-handoff";

  for (const name of ["name", "email", "challenge"]) {
    const field = form.elements.namedItem(name);
    if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) && !field.required) field.required = true;
  }

  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = locale === "es" ? "Preparar correo" : "Prepare email";
  if (submit && submit.textContent !== submitLabel) submit.textContent = submitLabel;

  const note = form.querySelector<HTMLParagraphElement>("p:last-of-type");
  const disclosure = locale === "es"
    ? "Este intake prepara un correo en tu aplicación de email. Denysoft lo recibe únicamente cuando tú lo envías."
    : "This intake prepares an email in your email app. Denysoft receives it only after you send it.";
  if (note && note.textContent !== disclosure) note.textContent = disclosure;
}

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

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.dataset.commercialIntake !== "email-handoff") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (!form.reportValidity()) return;

      const locale = document.documentElement.lang === "es" ? "es" : "en";
      const data = new FormData(form);
      const read = (name: string) => String(data.get(name) ?? "").trim();
      const name = read("name");
      const email = read("email");
      const context = read("context");
      const challenge = read("challenge");
      const value = read("value");
      const subject = locale === "es"
        ? `Reto Denysoft — ${context || name || "nueva consulta"}`
        : `Denysoft challenge — ${context || name || "new inquiry"}`;
      const body = locale === "es"
        ? [
            `Nombre: ${name}`,
            `Email: ${email}`,
            `Empresa / contexto: ${context || "—"}`,
            "",
            "Reto:",
            challenge,
            "",
            "Qué lo haría valioso:",
            value || "—",
          ].join("\n")
        : [
            `Name: ${name}`,
            `Email: ${email}`,
            `Company / context: ${context || "—"}`,
            "",
            "Challenge:",
            challenge,
            "",
            "What would make this valuable:",
            value || "—",
          ].join("\n");

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const intakeObserver = new MutationObserver(() => prepareCommercialIntake(document));
    prepareCommercialIntake(document);
    intakeObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", applyScroll, { passive: true });
    document.addEventListener("submit", onSubmit, true);
    applyPointer();
    applyScroll();

    return () => {
      observer.disconnect();
      intakeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", applyScroll);
      document.removeEventListener("submit", onSubmit, true);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
