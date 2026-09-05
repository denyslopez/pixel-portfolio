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

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

const report = {};
const persist = () => writeFile(`${outputDir}/case-studies-diagnostics.json`, JSON.stringify(report, null, 2));

try {
  await waitForServer(`${baseUrl}/en/work/baltica-salon`);
  const browser = await chromium.launch({ headless: true });
  const slugs = ["baltica-salon", "taller-express", "mastertax"];

  for (const slug of slugs) {
    for (const spec of [
      { locale: "en", width: 1200, height: 900, suffix: "desktop" },
      { locale: "es", width: 390, height: 844, suffix: "mobile" },
    ]) {
      const name = `${spec.locale}-case-${slug}-${spec.suffix}`;
      const context = await browser.newContext({
        viewport: { width: spec.width, height: spec.height },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

      const response = await page.goto(`${baseUrl}/${spec.locale}/work/${slug}`, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
      invariant(response?.status() === 200, `${name}: expected HTTP 200`);
      await page.waitForTimeout(650);

      const result = await page.evaluate(() => {
        const images = [...document.images].map((image) => ({
          src: image.currentSrc || image.src,
          complete: image.complete,
          naturalWidth: image.naturalWidth,
        }));
        const offenders = [...document.querySelectorAll("body *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 140),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth,
              overflowX: style.overflowX,
              whiteSpace: style.whiteSpace,
              fontSize: style.fontSize,
              fontFamily: style.fontFamily,
            };
          })
          .filter((item) => item.width > 0 && (
            item.right > innerWidth + 2 ||
            item.left < -2 ||
            item.scrollWidth > item.clientWidth + 2
          ))
          .sort((a, b) => {
            const bOverflow = Math.max(b.right - innerWidth, b.scrollWidth - b.clientWidth);
            const aOverflow = Math.max(a.right - innerWidth, a.scrollWidth - a.clientWidth);
            return bOverflow - aOverflow;
          })
          .slice(0, 24);
        return {
          lang: document.documentElement.lang,
          viewport: [innerWidth, innerHeight],
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          overflowX: document.documentElement.scrollWidth > innerWidth + 1,
          offenders,
          decisions: document.querySelectorAll(".case-decision-grid article").length,
          flowItems: document.querySelectorAll(".case-flow li").length,
          switchHref: document.querySelector(".locale-switch a")?.getAttribute("href") ?? null,
          imageFailures: images.filter((image) => image.complete && image.naturalWidth === 0),
          reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        };
      });

      report[name] = { ...result, errors, pass: false };
      await persist();

      invariant(result.lang === spec.locale, `${name}: document language drift`);
      invariant(
        !result.overflowX,
        `${name}: horizontal overflow html=${result.scrollWidth} body=${result.bodyScrollWidth} offenders=${JSON.stringify(result.offenders)}`,
      );
      invariant(result.decisions === 3, `${name}: expected 3 key decisions`);
      invariant(result.flowItems >= 4, `${name}: expected bounded case flow`);
      invariant(result.imageFailures.length === 0, `${name}: broken images ${JSON.stringify(result.imageFailures)}`);
      invariant(result.reduced, `${name}: reduced motion not active`);
      invariant(errors.length === 0, `${name}: browser errors ${JSON.stringify(errors)}`);

      const opposite = spec.locale === "en" ? "es" : "en";
      invariant(result.switchHref === `/${opposite}/work/${slug}`, `${name}: locale switch lost case route (${result.switchHref})`);

      await page.screenshot({
        path: `${outputDir}/${name}.png`,
        fullPage: true,
        animations: "disabled",
      });
      report[name].pass = true;
      await persist();
      await context.close();
    }
  }

  await browser.close();
  report.caseVisualGate = { pass: true, screenshots: 6, profile: "R3_CASE_STUDIES" };
  await persist();
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
  await writeFile(`${outputDir}/case-server.log`, serverLog);
  await persist();
}
