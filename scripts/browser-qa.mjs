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
      .slice(0, 16);

    const internalOverflowElements = elements
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className : "",
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        overflowX: getComputedStyle(element).overflowX,
        whiteSpace: getComputedStyle(element).whiteSpace,
        text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
      }))
      .filter((item) => item.clientWidth > 0 && item.scrollWidth > item.clientWidth + 2)
      .sort((a, b) => (b.scrollWidth - b.clientWidth) - (a.scrollWidth - a.clientWidth))
      .slice(0, 20);

    const criticalTextOverflows = [...document.querySelectorAll(
      ".r3-section-heading h2, .r3-axom-copy h2, .r3-products-heading h2, .r3-about h2, .r3-close h2, .r3-visual-meta > span",
    )]
      .map((element) => ({
        text: (element.textContent ?? "").trim().replace(/\s+/g, " "),
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }))
      .filter((item) => item.clientWidth > 0 && item.scrollWidth > item.clientWidth + 2);

    const heroLines = [...document.querySelectorAll(".r3-hero-line")].map((line) => ({
      clientWidth: line.clientWidth,
      scrollWidth: line.scrollWidth,
      text: line.textContent?.trim() ?? "",
    }));

    const images = [...document.images].map((image) => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    }));

    return {
      url: location.href,
      lang: document.documentElement.lang,
      viewport: [innerWidth, innerHeight],
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      overflowElements,
      internalOverflowElements,
      criticalTextOverflows,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      heroLines,
      workCards: document.querySelectorAll(".r3-work-card").length,
      capabilities: document.querySelectorAll(".r3-capability-item").length,
      axomProducts: document.querySelectorAll(".r3-product").length,
      immersiveField: Boolean(document.querySelector(".immersive-field")),
      lab: Boolean(document.querySelector(".lab-section")),
      practice: Boolean(document.querySelector(".practice-section")),
      switchHref: document.querySelector(".locale-switch a")?.getAttribute("href") ?? null,
      imageFailures: images.filter((image) => image.complete && image.naturalWidth === 0),
    };
  });
}

function assertHome(name, result, locale) {
  invariant(result.lang === locale, `${name}: document language drift (${result.lang} !== ${locale})`);
  invariant(
    !result.overflowX,
    `${name}: horizontal overflow. viewport=${result.viewport[0]} html=${result.scrollWidth} body=${result.bodyScrollWidth} rect=${JSON.stringify(result.overflowElements)} internal=${JSON.stringify(result.internalOverflowElements)}`,
  );
  invariant(
    result.criticalTextOverflows.length === 0,
    `${name}: critical R3 display text clips its own column ${JSON.stringify(result.criticalTextOverflows)}`,
  );
  invariant(result.heroLines.length === 3, `${name}: expected 3 R3 hero lines`);
  invariant(result.heroLines.every((line) => line.scrollWidth <= line.clientWidth + 2), `${name}: clipped R3 hero line`);
  invariant(result.workCards === 3, `${name}: expected 3 selected-work cards`);
  invariant(result.capabilities === 5, `${name}: expected 5 business-readable capabilities`);
  invariant(result.axomProducts === 3, `${name}: expected 3 AXOM product-evidence items`);
  invariant(!result.immersiveField, `${name}: retired global immersive GPU field reappeared`);
  invariant(!result.lab, `${name}: deferred Lab reappeared`);
  invariant(!result.practice, `${name}: retired Practice section reappeared`);
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
const persist = () => writeFile(`${outputDir}/diagnostics.json`, JSON.stringify(report, null, 2));

try {
  await waitForServer(`${baseUrl}/en`);
  const browser = await chromium.launch({ headless: true });

  for (const spec of [
    { name: "en-home-desktop", path: "/en", locale: "en", width: 1440, height: 1000 },
    { name: "en-home-mobile", path: "/en", locale: "en", width: 390, height: 844 },
    { name: "es-home-desktop", path: "/es", locale: "es", width: 1440, height: 1000 },
    { name: "es-home-mobile", path: "/es", locale: "es", width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

    const response = await page.goto(`${baseUrl}${spec.path}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    invariant(response?.status() === 200, `${spec.name}: expected HTTP 200`);
    await page.waitForTimeout(700);
    const result = await diagnostics(page);
    report[spec.name] = { ...result, errors, pass: false };
    await persist();

    assertHome(spec.name, result, spec.locale);
    invariant(result.reduced, `${spec.name}: reduced motion not active`);
    invariant(errors.length === 0, `${spec.name}: browser errors ${JSON.stringify(errors)}`);

    await page.screenshot({ path: `${outputDir}/${spec.name}.png`, fullPage: true, animations: "disabled" });
    report[spec.name].pass = true;
    await persist();
    await context.close();
  }

  const caseContext = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
  const casePage = await caseContext.newPage();
  for (const slug of ["baltica-salon", "taller-express", "mastertax"]) {
    const response = await casePage.goto(`${baseUrl}/en/work/${slug}`, { waitUntil: "domcontentloaded" });
    invariant(response?.status() === 200, `${slug}: case study must return 200`);
    invariant(await casePage.locator(".case-decision-grid article").count() === 3, `${slug}: expected 3 key decisions`);
    invariant(await casePage.locator(".case-flow li").count() >= 4, `${slug}: expected bounded case flow`);
  }

  await casePage.goto(`${baseUrl}/en/work/baltica-salon`, { waitUntil: "domcontentloaded" });
  const switchHref = await casePage.locator(".locale-switch a").getAttribute("href");
  invariant(switchHref === "/es/work/baltica-salon", `Locale switch must preserve R3 case route, got ${switchHref}`);
  await caseContext.close();

  const tallerContext = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
  const tallerPage = await tallerContext.newPage();
  await tallerPage.goto(`${baseUrl}/en/work/taller-express`, { waitUntil: "domcontentloaded" });
  await tallerPage.waitForTimeout(900);
  const tallerImage = tallerPage.locator(".case-media img");
  invariant(await tallerImage.count() === 1, "Taller Express: expected real project media image");
  await tallerContext.close();

  await browser.close();
  report.browserGate = { pass: true, profile: "R3_STANDARD_PRODUCT", screenshots: 4, fullPage: true };
  await persist();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
  await writeFile(`${outputDir}/server.log`, serverLog);
  await persist();
}
