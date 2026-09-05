import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3102";
function invariant(condition, message) { if (!condition) throw new Error(message); }
async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`R3 visual-contract server did not become ready: ${url}`);
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3102", HOSTNAME: "127.0.0.1" },
  stdio: "ignore",
});

try {
  await waitForServer(`${baseUrl}/en`);
  const browser = await chromium.launch({ headless: true });

  for (const locale of ["en", "es"]) {
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    const page = await desktop.newPage();
    await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });

    const state = await page.evaluate(() => {
      const hero = document.querySelector(".r3-hero");
      const visual = document.querySelector(".r3-hero-visual");
      const close = document.querySelector(".r3-close");
      const signal = getComputedStyle(document.documentElement).getPropertyValue("--signal").trim().toLowerCase();
      return {
        desktopNav: getComputedStyle(document.querySelector(".desktop-nav")).display,
        mobileNav: getComputedStyle(document.querySelector(".r3-mobile-nav")).display,
        hero: Boolean(hero),
        visual: Boolean(visual),
        closeBackground: close ? getComputedStyle(close).backgroundImage : "none",
        signal,
        immersiveField: Boolean(document.querySelector(".immersive-field")),
        lab: Boolean(document.querySelector(".lab-section")),
        practice: Boolean(document.querySelector(".practice-section")),
      };
    });

    invariant(state.desktopNav !== "none", `${locale}-desktop: desktop navigation hidden`);
    invariant(state.mobileNav === "none", `${locale}-desktop: mobile navigation leaked into desktop`);
    invariant(state.hero && state.visual, `${locale}-desktop: R3 hero composition incomplete`);
    invariant(state.signal === "#ff4a1c" || state.signal === "rgb(255, 74, 28)", `${locale}-desktop: Signal Vermilion drift (${state.signal})`);
    invariant(state.closeBackground && state.closeBackground !== "none", `${locale}-desktop: cinematic commercial close missing`);
    invariant(!state.immersiveField, `${locale}-desktop: retired GPU field reintroduced`);
    invariant(!state.lab, `${locale}-desktop: deferred Lab reintroduced`);
    invariant(!state.practice, `${locale}-desktop: retired Practice reintroduced`);
    await desktop.close();
  }

  for (const locale of ["en", "es"]) {
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await mobile.newPage();
    await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });

    const state = await page.evaluate(() => {
      const heroTitle = document.querySelector(".r3-hero-title");
      const heroVisual = document.querySelector(".r3-hero-visual");
      return {
        mobileNav: getComputedStyle(document.querySelector(".r3-mobile-nav")).display,
        desktopNav: getComputedStyle(document.querySelector(".desktop-nav")).display,
        titleWidth: heroTitle?.scrollWidth ?? 0,
        titleClient: heroTitle?.clientWidth ?? 0,
        visualHeight: heroVisual?.getBoundingClientRect().height ?? 0,
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      };
    });

    invariant(state.mobileNav !== "none", `${locale}-mobile: mobile navigation missing`);
    invariant(state.desktopNav === "none", `${locale}-mobile: desktop navigation should collapse`);
    invariant(state.titleWidth <= state.titleClient + 2, `${locale}-mobile: hero title overflows`);
    invariant(state.visualHeight > 240, `${locale}-mobile: cinematic visual aperture collapsed`);
    invariant(state.reduced, `${locale}-mobile: reduced-motion preference not active`);
    await mobile.close();
  }

  const workContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const workPage = await workContext.newPage();
  await workPage.goto(`${baseUrl}/en`, { waitUntil: "domcontentloaded" });
  const workTitles = await workPage.locator(".r3-work-card h3").allTextContents();
  invariant(JSON.stringify(workTitles) === JSON.stringify(["Baltica Salon", "Taller Express", "MasterTax"]), `Selected Work drift: ${JSON.stringify(workTitles)}`);
  const statuses = await workPage.locator(".r3-status").allTextContents();
  invariant(statuses.length === 3 && statuses.every(Boolean), "AXOM product evidence must expose explicit status");
  await workContext.close();

  await browser.close();
  console.log("R3 visual contract QA: PASS");
} finally {
  server.kill("SIGTERM");
}
