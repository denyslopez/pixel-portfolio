import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE_URL ?? "http://localhost:3000";
const OUT = "qa/r4";
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const pages = ["/en", "/es"];

const errors = [];

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const path of pages) {
    const page = await context.newPage();
    page.on("pageerror", (err) => errors.push(`${vp.name} ${path}: ${err.message}`));
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(`${vp.name} ${path} console: ${msg.text()}`); });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const lang = path.replace("/", "");
    await page.screenshot({ path: `${OUT}/${lang}-${vp.name}.png` });
    if (vp.name === "desktop") {
      await page.screenshot({ path: `${OUT}/${lang}-desktop-full.png`, fullPage: true });
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) errors.push(`${vp.name} ${path}: horizontal overflow detected`);
    await page.close();
  }
  await context.close();
}
await browser.close();

if (errors.length) {
  console.log("R4 QA ISSUES:");
  for (const e of errors) console.log(" - " + e);
  process.exitCode = 1;
} else {
  console.log("R4 visual QA complete. No console errors or overflow detected.");
}
