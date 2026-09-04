import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3101";
function invariant(condition, message) { if (!condition) throw new Error(message); }
async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`R1 structure QA server did not become ready: ${url}`);
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3101", HOSTNAME: "127.0.0.1" },
  stdio: "ignore",
});

try {
  await waitForServer(`${baseUrl}/en`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();

  for (const locale of ["en", "es"]) {
    const response = await page.goto(`${baseUrl}/${locale}`, { waitUntil: "domcontentloaded" });
    invariant(response?.status() === 200, `${locale}: home must return 200`);
    invariant(await page.locator(".work-row").count() === 3, `${locale}: expected 3 flagship work rows`);
    invariant(await page.locator(".archive-row").count() === 8, `${locale}: expected 8 client archive rows`);
    invariant(await page.locator(".lab-row").count() === 3, `${locale}: expected 3 lab rows`);
    invariant(await page.locator(".cap-group").count() === 5, `${locale}: expected 5 capability groups`);
  }

  const cases = [
    ["reveal-studio", 6, 0],
    ["taller-express", 4, 0],
    ["villas-de-san-luis", 4, 3],
  ];
  for (const [slug, flowCount, galleryCount] of cases) {
    const response = await page.goto(`${baseUrl}/en/work/${slug}`, { waitUntil: "domcontentloaded" });
    invariant(response?.status() === 200, `${slug}: case study must return 200`);
    invariant(await page.locator(".case-flow li").count() === flowCount, `${slug}: unexpected product-flow count`);
    invariant(await page.locator(".case-decision-grid article").count() === 3, `${slug}: expected 3 key decisions`);
    invariant(await page.locator(".case-gallery figure").count() === galleryCount, `${slug}: unexpected evidence gallery count`);
  }

  await context.close();
  await browser.close();
  console.log("R1 structure QA: PASS");
} finally {
  server.kill("SIGTERM");
}
