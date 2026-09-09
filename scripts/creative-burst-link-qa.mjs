import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3151";

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
  throw new Error(`VD6 link QA server did not become ready: ${url}`);
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3151", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

try {
  await waitForServer(`${baseUrl}/en/creative-burst`);
  const browser = await chromium.launch({ headless: true });

  for (const locale of ["en", "es"]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const home = await page.goto(`${baseUrl}/${locale}/creative-burst`, { waitUntil: "networkidle" });
    invariant(home?.status() === 200, `${locale}: creative-burst route must return 200`);

    const selectedHref = await page.locator("#work article a").first().getAttribute("href");
    invariant(selectedHref === `/${locale}/work/baltica-salon`, `${locale}: selected work canonical href drifted (${selectedHref})`);
    const selectedResponse = await page.goto(`${baseUrl}${selectedHref}`, { waitUntil: "networkidle" });
    invariant(selectedResponse?.status() === 200, `${locale}: selected work detail must return 200`);
    invariant(await page.locator('[data-qa-surface="creative-burst-work-detail"]').count() === 1, `${locale}: selected work fell back to legacy visual surface`);
    invariant(await page.locator(".r3-site, .case-study").count() === 0, `${locale}: legacy R3 case-study surface is still rendered`);
    const selectedBack = await page.locator('a[href*="creative-burst#work"]').first().getAttribute("href");
    invariant(selectedBack === `/${locale}/creative-burst#work`, `${locale}: selected detail back-link escaped VD6 (${selectedBack})`);

    const otherLocale = locale === "en" ? "es" : "en";
    const languageHref = await page.locator(`a[href="/${otherLocale}/work/baltica-salon"]`).getAttribute("href");
    invariant(Boolean(languageHref), `${locale}: work-detail language switch missing`);

    await page.goto(`${baseUrl}/${locale}/creative-burst`, { waitUntil: "networkidle" });
    const archiveHref = await page.locator('[class*="archiveGrid"] > a').first().getAttribute("href");
    invariant(archiveHref === `/${locale}/work/all-star-restoration`, `${locale}: archive href drifted (${archiveHref})`);
    const archiveResponse = await page.goto(`${baseUrl}${archiveHref}`, { waitUntil: "networkidle" });
    invariant(archiveResponse?.status() === 200, `${locale}: archive detail must return 200`);
    invariant(await page.locator('[data-qa-surface="creative-burst-work-detail"]').count() === 1, `${locale}: archive work fell back to legacy visual surface`);
    invariant(await page.locator(".r3-site, .case-study").count() === 0, `${locale}: legacy archive surface is still rendered`);

    const internalNav = await page.locator(`a[href^="/${locale}/creative-burst"]`).count();
    invariant(internalNav >= 5, `${locale}: detail navigation is not bound back to VD6 (${internalNav} links)`);
    await page.close();
  }

  await browser.close();
  console.log("VD6 work-link continuity QA: PASS");
} catch (error) {
  console.error(serverLog);
  throw error;
} finally {
  server.kill("SIGTERM");
}
