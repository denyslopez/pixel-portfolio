import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3102";
function invariant(condition, message) { if (!condition) throw new Error(message); }
async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`VD6 visual-contract server did not become ready: ${url}`);
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
      const root = document.querySelector('main[class*="root"]');
      const hero = document.querySelector('[data-qa-section="hero"]');
      const finalCta = document.querySelector('[data-qa-section="final-cta"]');
      const heroBefore = hero ? getComputedStyle(hero, "::before") : null;
      const signal = root ? getComputedStyle(root).getPropertyValue("--signal").trim().toLowerCase() : "";
      return {
        hero: Boolean(hero),
        finalCta: Boolean(finalCta),
        heroBackground: heroBefore?.backgroundImage ?? "none",
        signal,
        qaSections: document.querySelectorAll("[data-qa-section]").length,
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        immersiveField: Boolean(document.querySelector(".immersive-field")),
        practice: Boolean(document.querySelector(".practice-section")),
      };
    });

    invariant(state.hero, `${locale}-desktop: VD6 hero missing`);
    invariant(state.finalCta, `${locale}-desktop: final CTA missing`);
    invariant(state.heroBackground.includes("denysoft-hero-system-spatial.svg"), `${locale}-desktop: authored hero world missing`);
    invariant(state.signal === "#fe512f" || state.signal === "rgb(254, 81, 47)", `${locale}-desktop: Signal Vermilion drift (${state.signal})`);
    invariant(state.qaSections >= 9, `${locale}-desktop: incomplete VD6 section surface`);
    invariant(state.reduced, `${locale}-desktop: reduced-motion preference not active`);
    invariant(!state.immersiveField, `${locale}-desktop: retired GPU field reintroduced`);
    invariant(!state.practice, `${locale}-desktop: retired Practice surface reintroduced`);
    await desktop.close();
  }

  for (const locale of ["en", "es"]) {
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await mobile.newPage();
    await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });

    const state = await page.evaluate(() => {
      const heroTitle = document.querySelector('[data-qa-section="hero"] h1');
      const hero = document.querySelector('[data-qa-section="hero"]');
      const heroBefore = hero ? getComputedStyle(hero, "::before") : null;
      return {
        titleWidth: heroTitle?.scrollWidth ?? 0,
        titleClient: heroTitle?.clientWidth ?? 0,
        heroHeight: hero?.getBoundingClientRect().height ?? 0,
        heroBackground: heroBefore?.backgroundImage ?? "none",
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      };
    });

    invariant(state.titleWidth <= state.titleClient + 2, `${locale}-mobile: hero title overflows`);
    invariant(state.heroHeight >= 700, `${locale}-mobile: hero composition collapsed`);
    invariant(state.heroBackground.includes("denysoft-hero-system-spatial.svg"), `${locale}-mobile: authored hero world missing`);
    invariant(state.reduced, `${locale}-mobile: reduced-motion preference not active`);
    await mobile.close();
  }

  const workContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const workPage = await workContext.newPage();
  await workPage.goto(`${baseUrl}/en`, { waitUntil: "domcontentloaded" });
  const workTitles = await workPage.locator('[data-qa-section="selected-work"] article h3').allTextContents();
  invariant(JSON.stringify(workTitles) === JSON.stringify(["Baltica Salon", "Taller Express", "MasterTax"]), `Selected Work drift: ${JSON.stringify(workTitles)}`);
  const productTitles = await workPage.locator('[data-qa-section="products-labs"] article h3').allTextContents();
  invariant(JSON.stringify(productTitles) === JSON.stringify(["CARVIS", "AXOM Client Hub", "Growth Navigator"]), `Products + Labs drift: ${JSON.stringify(productTitles)}`);
  await workContext.close();

  await browser.close();
  console.log("VD6 visual contract QA: PASS");
} finally {
  server.kill("SIGTERM");
}
