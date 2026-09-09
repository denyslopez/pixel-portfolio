import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3150";
const outputDir = "qa/browser/creative-burst";
await mkdir(outputDir, { recursive: true });

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Creative Burst QA server did not become ready: ${url}`);
}

async function revealFullPage(page) {
  const revealNodes = page.locator("[data-burst-reveal]");
  const count = await revealNodes.count();

  for (let index = 0; index < count; index += 1) {
    await revealNodes.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(75);
  }

  // The reveal animation lasts 800ms. Wait long enough for the last observed node
  // to settle before treating the page as visual evidence.
  await page.waitForTimeout(1000);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(180);
}

async function resetCaptureState(page) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    scrollTo(0, 0);
  });
  await page.waitForTimeout(180);
}

async function diagnostics(page) {
  return page.evaluate(() => {
    const elements = [...document.querySelectorAll("body *")];
    const overflowElements = elements
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.width > 0 && (item.right > innerWidth + 2 || item.left < -2))
      .slice(0, 20);

    const images = [...document.images].map((image) => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));

    const hero = document.querySelector("h1");
    const canvas = document.querySelector("canvas");
    const symptomButtons = [...document.querySelectorAll("#navigator button")];
    const selectedWorkArticles = [...document.querySelectorAll("#work article")];
    const archiveCards = [...document.querySelectorAll('[class*="archiveGrid"] > a')];
    const productPanels = [...document.querySelectorAll('[class*="productGrid"] > article')];
    const revealNodes = [...document.querySelectorAll("[data-burst-reveal]")].map((node) => ({
      opacity: Number.parseFloat(getComputedStyle(node).opacity || "1"),
      text: (node.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
    }));

    return {
      url: location.href,
      lang: document.documentElement.lang,
      viewport: [innerWidth, innerHeight],
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      overflowElements,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null,
      hero: hero ? {
        clientWidth: hero.clientWidth,
        scrollWidth: hero.scrollWidth,
        clientHeight: hero.clientHeight,
        scrollHeight: hero.scrollHeight,
        text: hero.textContent?.trim() ?? "",
      } : null,
      canvas: canvas ? {
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        width: canvas.width,
        height: canvas.height,
      } : null,
      symptomButtons: symptomButtons.length,
      selectedWorkArticles: selectedWorkArticles.length,
      archiveCards: archiveCards.length,
      productPanels: productPanels.length,
      unrevealedNodes: revealNodes.filter((item) => item.opacity < 0.95),
      imageFailures: images.filter((image) => image.complete && (image.naturalWidth === 0 || image.naturalHeight === 0)),
    };
  });
}

function assertCandidate(name, result, locale) {
  invariant(result.lang === locale, `${name}: document language drift (${result.lang} !== ${locale})`);
  invariant(!result.overflowX, `${name}: horizontal overflow viewport=${result.viewport[0]} html=${result.scrollWidth} body=${result.bodyScrollWidth} ${JSON.stringify(result.overflowElements)}`);
  invariant(result.robots?.includes("noindex"), `${name}: creative candidate must remain noindex`);
  invariant(result.hero, `${name}: hero h1 missing`);
  invariant(result.hero.scrollWidth <= result.hero.clientWidth + 2, `${name}: hero title horizontal clipping`);
  invariant(result.canvas && result.canvas.width > 0 && result.canvas.height > 0, `${name}: executable canvas medium missing or zero-sized`);
  invariant(result.symptomButtons === 4, `${name}: expected 4 deterministic Navigator symptoms`);
  invariant(result.selectedWorkArticles === 3, `${name}: expected 3 selected-work evidence cases`);
  invariant(result.archiveCards === 11, `${name}: expected 11 archive entries`);
  invariant(result.productPanels === 3, `${name}: expected 3 Products + Labs panels`);
  invariant(result.unrevealedNodes.length === 0, `${name}: full-page visual capture still contains unrevealed sections ${JSON.stringify(result.unrevealedNodes)}`);
  invariant(result.imageFailures.length === 0, `${name}: image failures ${JSON.stringify(result.imageFailures)}`);
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3150", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

const report = {};
const persist = () => writeFile(`${outputDir}/diagnostics.json`, JSON.stringify(report, null, 2));

try {
  await waitForServer(`${baseUrl}/en/creative-burst`);
  const browser = await chromium.launch({ headless: true });

  const specs = [
    { name: "en-desktop", locale: "en", width: 1440, height: 1000, reduced: false },
    { name: "en-tablet", locale: "en", width: 768, height: 1024, reduced: true },
    { name: "en-mobile", locale: "en", width: 390, height: 844, reduced: true },
    { name: "es-desktop", locale: "es", width: 1440, height: 1000, reduced: false },
    { name: "es-tablet", locale: "es", width: 768, height: 1024, reduced: true },
    { name: "es-mobile", locale: "es", width: 390, height: 844, reduced: true },
  ];

  for (const spec of specs) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      reducedMotion: spec.reduced ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

    const response = await page.goto(`${baseUrl}/${spec.locale}/creative-burst`, { waitUntil: "networkidle", timeout: 30_000 });
    invariant(response?.status() === 200, `${spec.name}: expected HTTP 200`);
    await page.waitForTimeout(500);
    await revealFullPage(page);

    const result = await diagnostics(page);
    report[spec.name] = { ...result, errors, pass: false };
    await persist();
    assertCandidate(spec.name, result, spec.locale);
    invariant(result.reduced === spec.reduced, `${spec.name}: reduced-motion state mismatch`);
    invariant(errors.length === 0, `${spec.name}: browser errors ${JSON.stringify(errors)}`);

    const before = await page.locator("#navigator [aria-live=polite] h3").textContent();
    await page.locator("#navigator button").nth(2).click();
    const after = await page.locator("#navigator [aria-live=polite] h3").textContent();
    invariant(Boolean(before && after && before !== after), `${spec.name}: Navigator interaction did not change hypothesis`);

    await resetCaptureState(page);
    await page.screenshot({ path: `${outputDir}/${spec.name}.png`, fullPage: true, animations: "disabled" });
    report[spec.name].navigatorInteraction = true;
    report[spec.name].fullPageRevealVerified = true;
    report[spec.name].captureStateReset = true;
    report[spec.name].pass = true;
    await persist();
    await context.close();
  }

  await browser.close();
  report.gate = {
    pass: true,
    candidate: "VD6_WHOLE_PAGE_CREATIVE_BURST",
    screenshots: specs.length,
    viewports: [390, 768, 1440],
    locales: ["en", "es"],
    fullPageRevealVerified: true,
    captureStateReset: true,
    productionTouched: false,
  };
  await persist();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
  await writeFile(`${outputDir}/server.log`, serverLog);
  await persist();
}
