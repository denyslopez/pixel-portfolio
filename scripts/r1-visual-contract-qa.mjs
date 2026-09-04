import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3102";
function invariant(condition, message) { if (!condition) throw new Error(message); }
async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`R2 visual-contract server did not become ready: ${url}`);
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3102", HOSTNAME: "127.0.0.1" },
  stdio: "ignore",
});

async function railContract(page, label, contentSelector) {
  const state = await page.evaluate((selector) => {
    const rail = document.querySelector(".mobile-rail");
    const content = document.querySelector(selector);
    if (!rail || !content) return null;
    const railStyle = getComputedStyle(rail);
    const railRect = rail.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    return {
      display: railStyle.display,
      position: railStyle.position,
      links: rail.querySelectorAll("a").length,
      railTop: Math.round(railRect.top),
      contentBottom: Math.round(contentRect.bottom),
      overlap: contentRect.bottom > railRect.top - 8,
    };
  }, contentSelector);
  invariant(state, `${label}: missing rail or ${contentSelector}`);
  invariant(state.display === "grid", `${label}: mobile rail must render as grid, got ${state.display}`);
  invariant(state.position === "fixed", `${label}: mobile rail must be fixed, got ${state.position}`);
  invariant(state.links === 4, `${label}: mobile rail must expose 4 destinations, got ${state.links}`);
  invariant(!state.overlap, `${label}: fixed rail overlaps ${contentSelector} (${state.contentBottom} > ${state.railTop - 8})`);
}

async function typographyContract(page, label) {
  const state = await page.evaluate(() => {
    const rects = (selector) => [...document.querySelectorAll(selector)].map((node) => {
      const rect = node.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
    });
    const overlaps = (items) => items.slice(0, -1).some((item, index) => item.bottom > items[index + 1].top + 2);
    const heroLines = rects("[data-hero-line]");
    const contactLines = rects(".contact-title-line");
    const heroOverflow = [...document.querySelectorAll(".hero-line")].map((node) => getComputedStyle(node).overflowY);
    const contact = document.querySelector(".contact");
    const contactStyle = contact ? getComputedStyle(contact) : null;
    return {
      heroLines,
      contactLines,
      heroOverlap: overlaps(heroLines),
      contactOverlap: overlaps(contactLines),
      heroOverflow,
      orbitPresent: Boolean(document.querySelector(".hero-orbit")),
      contactBackgroundColor: contactStyle?.backgroundColor ?? null,
      contactBackgroundImage: contactStyle?.backgroundImage ?? null,
    };
  });

  invariant(state.heroLines.length === 3, `${label}: expected 3 hero lines, got ${state.heroLines.length}`);
  invariant(!state.heroOverlap, `${label}: hero title lines overlap`);
  invariant(state.contactLines.length >= 2, `${label}: contact title lines missing`);
  invariant(!state.contactOverlap, `${label}: contact title lines overlap`);
  invariant(state.heroOverflow.every((value) => value !== "hidden"), `${label}: hero line still clips glyphs with overflow:hidden`);
  invariant(!state.orbitPresent, `${label}: ornamental hero orbit must not exist in R2`);
  invariant(state.contactBackgroundColor !== "rgb(200, 255, 26)", `${label}: contact still uses flat signal-lime background`);
  invariant(state.contactBackgroundImage && state.contactBackgroundImage !== "none", `${label}: contact requires controlled signal field background`);
}

try {
  await waitForServer(`${baseUrl}/en`);
  const browser = await chromium.launch({ headless: true });

  for (const locale of ["en", "es"]) {
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    const desktopPage = await desktop.newPage();
    await desktopPage.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });
    const desktopState = await desktopPage.evaluate(() => ({
      rail: getComputedStyle(document.querySelector(".mobile-rail")).display,
      desktop: getComputedStyle(document.querySelector(".desktop-nav")).display,
    }));
    invariant(desktopState.rail === "none", `${locale}-desktop: mobile rail leaked into desktop (${desktopState.rail})`);
    invariant(desktopState.desktop !== "none", `${locale}-desktop: primary navigation is hidden`);
    await typographyContract(desktopPage, `${locale}-desktop`);
    await desktop.close();
  }

  for (const locale of ["en", "es"]) {
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await mobile.newPage();
    await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });
    await railContract(page, `${locale}-home-mobile`, ".hero-actions");
    await typographyContract(page, `${locale}-mobile`);
    await mobile.close();
  }

  const caseMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const casePage = await caseMobile.newPage();
  await casePage.goto(`${baseUrl}/en/work/reveal-studio`, { waitUntil: "domcontentloaded" });
  await railContract(casePage, "reveal-mobile", ".case-summary");
  await caseMobile.close();

  await browser.close();
  console.log("R2 visual contract QA: PASS");
} finally {
  server.kill("SIGTERM");
}
