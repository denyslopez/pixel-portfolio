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

async function diagnostics(page) {
  return page.evaluate(() => {
    const immersive = document.querySelector(".immersive-field");
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
    const overflowElements = [...document.querySelectorAll("body *")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const className = typeof element.className === "string" ? element.className : "";
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || null,
          className: className || null,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90),
        };
      })
      .filter((item) => item.width > 0 && (item.right > innerWidth + 1 || item.left < -1))
      .sort((a, b) => Math.max(b.right - innerWidth, -b.left) - Math.max(a.right - innerWidth, -a.left))
      .slice(0, 12);

    return {
      url: location.href,
      lang: document.documentElement.lang,
      title: document.title,
      viewport: [innerWidth, innerHeight],
      scroll: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      overflowX: document.documentElement.scrollWidth > innerWidth,
      overflowElements,
      canvas: Boolean(immersive?.querySelector("canvas")),
      gpuStage: immersive?.getAttribute("data-stage") ?? null,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      switchHref: document.querySelector(".locale-switch a")?.getAttribute("href") ?? null,
      h1: document.querySelector("h1")?.textContent?.trim() ?? null,
      workRows: document.querySelectorAll(".work-row").length,
      caseMedia: document.querySelectorAll(".case-media img").length,
      imageFailures: images.filter((image) => image.complete && image.naturalWidth === 0),
      heroLines,
    };
  });
}

function assertCore(name, result, locale) {
  invariant(result.lang === locale, `${name}: document language drift (${result.lang} !== ${locale})`);
  invariant(
    !result.overflowX,
    `${name}: horizontal overflow detected (${result.scroll[0]} > ${result.viewport[0]}). Offenders: ${JSON.stringify(result.overflowElements)}`,
  );
}

function assertHeroFit(name, result) {
  const clipped = result.heroLines.filter((line) => line.scrollWidth > line.clientWidth + 2);
  invariant(clipped.length === 0, `${name}: clipped kinetic hero lines: ${JSON.stringify(clipped)}`);
}

async function waitForCaseMedia(page) {
  await page.waitForFunction(() => {
    const image = document.querySelector(".case-media img");
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
  }, null, { timeout: 15_000 });
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

  // Pass A: validate the real GPU/kinetic runtime. No screenshots are taken
  // from this browser because headless Chromium can deadlock while capturing
  // an actively composited WebGL surface after scroll.
  const gpuBrowser = await chromium.launch({
    headless: true,
    args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
  });

  for (const spec of [
    { name: "gpu-en-desktop", path: "/en", locale: "en", width: 1440, height: 1000 },
    { name: "gpu-en-mobile", path: "/en", locale: "en", width: 390, height: 844 },
    { name: "gpu-es-desktop", path: "/es", locale: "es", width: 1440, height: 1000 },
  ]) {
    const context = await gpuBrowser.newContext({ viewport: { width: spec.width, height: spec.height } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

    const response = await page.goto(`${baseUrl}${spec.path}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    invariant(response?.status() === 200, `${spec.name}: expected HTTP 200`);
    await page.waitForTimeout(1600);
    const result = await diagnostics(page);
    report[spec.name] = { ...result, browserErrors: errors, pass: false };
    await persistReport();
    assertCore(spec.name, result, spec.locale);
    assertHeroFit(spec.name, result);
    invariant(result.canvas, `${spec.name}: immersive GPU canvas did not initialize`);
    invariant(result.workRows === 3, `${spec.name}: expected 3 selected-work rows`);
    invariant(errors.length === 0, `${spec.name}: browser errors: ${JSON.stringify(errors)}`);
    report[spec.name].pass = true;
    await persistReport();
    await context.close();
  }

  const kineticContext = await gpuBrowser.newContext({ viewport: { width: 1200, height: 900 } });
  const kineticPage = await kineticContext.newPage();
  await kineticPage.goto(`${baseUrl}/en`, { waitUntil: "domcontentloaded" });
  await kineticPage.waitForTimeout(1200);
  const initialStage = await kineticPage.locator(".immersive-field").getAttribute("data-stage");
  await kineticPage.locator("[data-practice-stage]").nth(0).scrollIntoViewIfNeeded();
  await kineticPage.waitForTimeout(350);
  await kineticPage.locator("[data-practice-stage]").nth(2).scrollIntoViewIfNeeded();
  await kineticPage.waitForTimeout(650);
  const receivedStage = await kineticPage.locator(".immersive-field").getAttribute("data-stage");
  invariant(initialStage === "0", `GPU stage should initialize at 0, received ${initialStage}`);
  invariant(Number(receivedStage) >= 2, `Kinetic practice did not drive GPU stage, received ${receivedStage}`);
  report.kineticGpuBridge = { initialStage, receivedStage, pass: true };
  await persistReport();
  await kineticContext.close();

  const switchContext = await gpuBrowser.newContext({ viewport: { width: 1200, height: 900 } });
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
  report.localeSwitch = { before, href, after, lang, pass: true };
  await persistReport();
  await switchContext.close();
  await gpuBrowser.close();

  // Pass B: static visual evidence under the accessibility/reduced-motion mode.
  // This keeps screenshots deterministic while also validating the required fallback.
  const visualBrowser = await chromium.launch({ headless: true });

  async function visualCase({ name, path, locale, width, height, scrollTo = null, caseMedia = false }) {
    const context = await visualBrowser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    invariant(response?.status() === 200, `${name}: expected HTTP 200`);
    await page.waitForTimeout(900);
    if (caseMedia) await waitForCaseMedia(page);
    if (scrollTo) {
      await page.locator(scrollTo).scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
    }

    const result = await diagnostics(page);
    assertCore(name, result, locale);
    invariant(result.reduced, `${name}: reduced-motion mode not active`);
    invariant(!result.canvas, `${name}: GPU canvas must not initialize under reduced motion`);
    if (path === "/en" || path === "/es") assertHeroFit(name, result);
    if (caseMedia) {
      invariant(result.caseMedia === 1, `${name}: expected one case-study media image`);
      invariant(result.imageFailures.length === 0, `${name}: case-study media failed to load`);
    }
    invariant(errors.length === 0, `${name}: browser errors: ${JSON.stringify(errors)}`);

    await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: false, animations: "disabled", timeout: 15_000 });
    report[name] = { ...result, browserErrors: errors, screenshotMode: "reduced-motion-static", pass: true };
    await persistReport();
    await context.close();
  }

  await visualCase({ name: "en-home-desktop", path: "/en", locale: "en", width: 1440, height: 1000 });
  await visualCase({ name: "en-work-desktop", path: "/en", locale: "en", width: 1440, height: 1000, scrollTo: "#work" });
  await visualCase({ name: "en-home-mobile", path: "/en", locale: "en", width: 390, height: 844 });
  await visualCase({ name: "es-home-desktop", path: "/es", locale: "es", width: 1440, height: 1000 });
  await visualCase({ name: "reveal-desktop", path: "/en/work/reveal-studio", locale: "en", width: 1440, height: 1000, caseMedia: true });
  await visualCase({ name: "taller-desktop", path: "/en/work/taller-express", locale: "en", width: 1440, height: 1000, caseMedia: true });
  await visualCase({ name: "villas-desktop", path: "/en/work/villas-de-san-luis", locale: "en", width: 1440, height: 1000, caseMedia: true });
  await visualCase({ name: "reveal-mobile", path: "/en/work/reveal-studio", locale: "en", width: 390, height: 844, caseMedia: true });
  await visualCase({ name: "reveal-media-desktop", path: "/en/work/reveal-studio", locale: "en", width: 1440, height: 1000, scrollTo: ".case-media", caseMedia: true });

  await visualBrowser.close();
  report.browserGate = { pass: true, gpuRuntime: true, reducedMotionFallback: true, screenshots: 9 };
  await persistReport();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
  await writeFile(`${outputDir}/server.log`, serverLog);
  await persistReport();
}
