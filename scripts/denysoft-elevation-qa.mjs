import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3101";
const outputDir = "qa/browser-elevation";
await mkdir(outputDir, { recursive: true });

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer(url, attempts = 80) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`QA server did not become ready: ${url}`);
}

async function inspect(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-design-authority="denysoft-run001"]');
    const hero = document.querySelector('[data-qa="home-hero"]');
    const heroSplit = document.querySelector('[class*="__heroSplit"]');
    const heroTitle = hero?.querySelector("h1");
    const signal = document.querySelector('[class*="__signalField"]');
    const all = [...document.querySelectorAll("body *")];
    const overflow = all
      .map((node) => {
        const rect = node.getBoundingClientRect();
        return { tag: node.tagName.toLowerCase(), className: typeof node.className === "string" ? node.className : "", left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
      })
      .filter((item) => item.width > 0 && (item.left < -2 || item.right > innerWidth + 2))
      .slice(0, 20);
    const heroSplitRect = heroSplit?.getBoundingClientRect();
    const signalRect = signal?.getBoundingClientRect();
    const heroTitleRect = heroTitle?.getBoundingClientRect();
    const heroSpans = heroTitle ? [...heroTitle.querySelectorAll(":scope > span")] : [];
    const heroVisualLines = heroSpans.reduce((total, span) => {
      const style = getComputedStyle(span);
      const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) || 1;
      return total + Math.max(1, Math.round(span.getBoundingClientRect().height / lineHeight));
    }, 0);
    return {
      viewport: [innerWidth, innerHeight],
      lang: document.documentElement.lang,
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      overflow,
      motionReady: root?.getAttribute("data-motion-ready") ?? null,
      revealedSections: root?.querySelectorAll('#main-content > section[data-revealed="true"]').length ?? 0,
      heroTitleSize: heroTitle ? Number.parseFloat(getComputedStyle(heroTitle).fontSize) : 0,
      heroTitleHeight: heroTitleRect?.height ?? 0,
      heroVisualLines,
      heroSplitWidth: heroSplitRect?.width ?? 0,
      heroSplitLeft: heroSplitRect?.left ?? 0,
      heroSplitRight: heroSplitRect?.right ?? 0,
      signalWidth: signalRect?.width ?? 0,
      signalHeight: signalRect?.height ?? 0,
    };
  });
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3101", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

let browser;
const results = [];

try {
  await waitForServer(`${baseUrl}/en`);
  browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "desktop-1440", width: 1440, height: 1000 },
    { name: "wide-1920", width: 1920, height: 1080 },
    { name: "wide-2560", width: 2560, height: 1440 },
    { name: "mobile-390", width: 390, height: 844 },
  ];

  for (const locale of ["en", "es"]) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await page.goto(`${baseUrl}/${locale}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(120);
      const state = await inspect(page);
      invariant(state.lang === locale, `${locale}/${viewport.name}: lang drift ${state.lang}`);
      invariant(!state.overflowX, `${locale}/${viewport.name}: horizontal overflow ${JSON.stringify(state.overflow)}`);
      invariant(state.motionReady !== null, `${locale}/${viewport.name}: browser experience layer did not mount`);
      const minimumTitleSize = locale === "es" ? (viewport.width >= 1440 ? 76 : 40) : (viewport.width >= 1440 ? 82 : 44);
      invariant(state.heroTitleSize >= minimumTitleSize, `${locale}/${viewport.name}: hero title lost visual authority (${state.heroTitleSize}px < ${minimumTitleSize}px)`);
      if (viewport.width >= 1440) {
        const minimumCompositionWidth = Math.min(1500, viewport.width * 0.72);
        invariant(state.heroSplitWidth >= minimumCompositionWidth, `${locale}/${viewport.name}: hero composition behaves like a narrow fixed canvas (${state.heroSplitWidth}px < ${minimumCompositionWidth}px)`);
        invariant(state.heroSplitLeft >= 0 && state.heroSplitRight <= viewport.width + 2, `${locale}/${viewport.name}: hero composition escaped viewport`);
        invariant(state.signalWidth >= 520, `${locale}/${viewport.name}: signature signal is visually undersized (${state.signalWidth}px)`);
      }
      if (locale === "es") {
        const maxLines = viewport.width >= 1440 ? 4 : 5;
        const maxHeight = viewport.height * (viewport.width >= 1440 ? 0.48 : 0.42);
        invariant(state.heroVisualLines <= maxLines, `${locale}/${viewport.name}: Spanish hero expanded to ${state.heroVisualLines} visual lines (max ${maxLines})`);
        invariant(state.heroTitleHeight <= maxHeight, `${locale}/${viewport.name}: Spanish hero title consumes ${Math.round(state.heroTitleHeight)}px of ${viewport.height}px viewport`);
      }
      await page.screenshot({ path: `${outputDir}/${locale}-${viewport.name}.png`, fullPage: true });
      results.push({ locale, viewport: viewport.name, state });
      await page.close();
    }
  }

  const interactionPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await interactionPage.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  await interactionPage.mouse.move(1100, 260);
  await interactionPage.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await interactionPage.waitForTimeout(100);
  const interactionState = await inspect(interactionPage);
  invariant(interactionState.revealedSections >= 1, "Intersection reveal system did not activate");
  const pointerX = await interactionPage.locator('[data-design-authority="denysoft-run001"]').evaluate((node) => getComputedStyle(node).getPropertyValue("--pointer-x").trim());
  invariant(pointerX.length > 0, "Pointer-reactive visual variable was not applied");
  await interactionPage.close();

  const reducedPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  await reducedPage.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  const reducedState = await inspect(reducedPage);
  invariant(reducedState.motionReady === "reduced", `Reduced motion mode not respected (${reducedState.motionReady})`);
  invariant(!reducedState.overflowX, "Reduced-motion home overflowed");
  await reducedPage.close();

  await writeFile(`${outputDir}/report.json`, JSON.stringify({ status: "PASS", results }, null, 2));
  console.log("Denysoft browser elevation QA PASS — EN/ES responsive composition, wide viewports, Spanish visual fit, motion layer and reduced-motion fallback verified.");
} catch (error) {
  await writeFile(`${outputDir}/server.log`, serverLog);
  await writeFile(`${outputDir}/failure.txt`, String(error?.stack ?? error));
  throw error;
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
