import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3100";
const outputDir = "qa/browser";

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
  throw new Error(`QA server did not become ready: ${url}`);
}

async function captureViaCdp(page, path, timeoutMs = 8_000) {
  const session = await page.context().newCDPSession(page);
  try {
    const result = await Promise.race([
      session.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false,
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error(`Screenshot timeout: ${path}`)), timeoutMs)),
    ]);
    await writeFile(path, Buffer.from(result.data, "base64"));
  } finally {
    await session.detach().catch(() => {});
  }
}

async function captureViewport(page, path, preferStatic = false) {
  if (preferStatic) {
    await page.evaluate(() => {
      const immersive = document.querySelector(".immersive-field");
      if (immersive instanceof HTMLElement) immersive.style.visibility = "hidden";
    });
    await page.waitForTimeout(80);
    await captureViaCdp(page, path);
    return "gpu-hidden-for-scrolled-capture";
  }

  try {
    await captureViaCdp(page, path, 7_000);
    return "gpu-visible";
  } catch {
    await page.evaluate(() => {
      const immersive = document.querySelector(".immersive-field");
      if (immersive instanceof HTMLElement) immersive.style.visibility = "hidden";
    });
    await page.waitForTimeout(80);
    await captureViaCdp(page, path, 8_000);
    return "gpu-hidden-fallback";
  }
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

const report = {};
const persistReport = () => writeFile(`${outputDir}/diagnostics.json`, JSON.stringify(report, null, 2));

try {
  await waitForServer(`${baseUrl}/en`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
  });

  async function runCase({ name, path, width, height, locale, reducedMotion = false, scrollTo = null, expectWork = false, expectCaseMedia = false, expectHeroFit = false }) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: reducedMotion ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const browserErrors = [];

    page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message }));
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push({ type: "console", text: message.text() });
    });

    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    invariant(response?.status() === 200, `${name}: expected HTTP 200, received ${response?.status()}`);

    await page.waitForTimeout(1800);
    if (scrollTo) {
      await page.locator(scrollTo).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
    }

    if (expectCaseMedia) {
      await page.waitForFunction(() => {
        const image = document.querySelector(".case-media img");
        return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
      }, null, { timeout: 15_000 });
    }

    const diagnostics = await page.evaluate(() => {
      const immersive = document.querySelector(".immersive-field");
      const canvas = immersive?.querySelector("canvas");
      const localeSwitch = document.querySelector(".locale-switch a");
      const images = [...document.images].map((image) => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      }));
      const heroLines = [...document.querySelectorAll(".hero-line")].map((line) => ({
        clientWidth: line.clientWidth,
        scrollWidth: line.scrollWidth,
        text: line.textContent?.trim() ?? "",
      }));

      return {
        url: location.href,
        lang: document.documentElement.lang,
        title: document.title,
        viewport: [innerWidth, innerHeight],
        scroll: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
        overflowX: document.documentElement.scrollWidth > innerWidth,
        canvas: Boolean(canvas),
        fallback: immersive?.dataset?.fallback ?? null,
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        switchHref: localeSwitch?.getAttribute("href") ?? null,
        h1: document.querySelector("h1")?.textContent?.trim() ?? null,
        workRows: document.querySelectorAll(".work-row").length,
        caseMedia: document.querySelectorAll(".case-media img").length,
        imageFailures: images.filter((image) => image.complete && image.naturalWidth === 0),
        heroLines,
      };
    });

    invariant(diagnostics.lang === locale, `${name}: document language drift (${diagnostics.lang} !== ${locale})`);
    invariant(!diagnostics.overflowX, `${name}: horizontal overflow detected (${diagnostics.scroll[0]} > ${width})`);
    invariant(browserErrors.length === 0, `${name}: browser errors: ${JSON.stringify(browserErrors)}`);

    if (reducedMotion) {
      invariant(diagnostics.reduced, `${name}: reduced-motion media query not active`);
      invariant(!diagnostics.canvas, `${name}: GPU canvas should not initialize under reduced motion`);
    } else {
      invariant(diagnostics.canvas, `${name}: immersive GPU canvas did not initialize`);
    }

    if (expectHeroFit) {
      const clipped = diagnostics.heroLines.filter((line) => line.scrollWidth > line.clientWidth + 2);
      invariant(clipped.length === 0, `${name}: clipped kinetic hero lines: ${JSON.stringify(clipped)}`);
    }

    if (expectWork) invariant(diagnostics.workRows === 3, `${name}: expected 3 selected-work rows`);
    if (expectCaseMedia) {
      invariant(diagnostics.caseMedia === 1, `${name}: expected one case-study media image`);
      invariant(diagnostics.imageFailures.length === 0, `${name}: case-study media failed to load`);
    }

    report[name] = { ...diagnostics, browserErrors, screenshotMode: "pending" };
    await persistReport();

    const screenshotMode = await captureViewport(page, `${outputDir}/${name}.png`, Boolean(scrollTo));
    report[name].screenshotMode = screenshotMode;
    await persistReport();
    await context.close();
  }

  await runCase({ name: "en-home-desktop", path: "/en", width: 1440, height: 1000, locale: "en", expectWork: true, expectHeroFit: true });
  await runCase({ name: "en-work-desktop", path: "/en", width: 1440, height: 1000, locale: "en", scrollTo: "#work", expectWork: true });
  await runCase({ name: "en-home-mobile", path: "/en", width: 390, height: 844, locale: "en", expectWork: true, expectHeroFit: true });
  await runCase({ name: "es-home-desktop", path: "/es", width: 1440, height: 1000, locale: "es", expectWork: true, expectHeroFit: true });
  await runCase({ name: "reveal-desktop", path: "/en/work/reveal-studio", width: 1440, height: 1000, locale: "en", expectCaseMedia: true });
  await runCase({ name: "taller-desktop", path: "/en/work/taller-express", width: 1440, height: 1000, locale: "en", expectCaseMedia: true });
  await runCase({ name: "villas-desktop", path: "/en/work/villas-de-san-luis", width: 1440, height: 1000, locale: "en", expectCaseMedia: true });
  await runCase({ name: "reveal-mobile", path: "/en/work/reveal-studio", width: 390, height: 844, locale: "en", expectCaseMedia: true });
  await runCase({ name: "en-reduced-motion", path: "/en", width: 1440, height: 1000, locale: "en", reducedMotion: true, expectWork: true, expectHeroFit: true });

  const switchContext = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const switchPage = await switchContext.newPage();
  await switchPage.goto(`${baseUrl}/en/work/reveal-studio`, { waitUntil: "domcontentloaded" });
  const before = switchPage.url();
  const href = await switchPage.locator(".locale-switch a").getAttribute("href");
  invariant(href === "/es/work/reveal-studio", `Locale switch does not preserve case-study route: ${href}`);
  await switchPage.locator(".locale-switch a").click();
  await switchPage.waitForLoadState("domcontentloaded");
  const after = switchPage.url();
  const lang = await switchPage.evaluate(() => document.documentElement.lang);
  invariant(after.endsWith("/es/work/reveal-studio"), `Locale switch navigated to unexpected route: ${after}`);
  invariant(lang === "es", `Locale switch did not update document lang: ${lang}`);
  report.localeSwitch = { before, href, after, lang };
  await persistReport();
  await switchContext.close();

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
  await writeFile(`${outputDir}/server.log`, serverLog);
  await persistReport();
}
