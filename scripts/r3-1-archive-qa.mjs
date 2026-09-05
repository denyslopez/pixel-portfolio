import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const canonicalBase = process.env.QA_CANONICAL_BASE || (base.includes("127.0.0.1") ? "http://localhost:3000" : base);
const output = process.env.QA_OUTPUT || "qa/r3-1/local";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const report = [];
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    for (const locale of ["en", "es"]) {
      await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
      assert.deepEqual(await page.locator(".r3-work-card h3").allTextContents(), ["Baltica Salon", "Taller Express", "MasterTax"]);
      const cta = page.getByRole("link", { name: locale === "en" ? "View all work" : "Ver todos los trabajos" });
      await cta.click();
      await page.waitForURL(`**/${locale}/work`);
      assert.equal(await page.locator("h1").innerText(), locale === "en" ? "Work / Portfolio" : "Trabajo / Portafolio");
      assert.equal(await page.locator(".work-archive-card").count(), 14);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${canonicalBase}/${locale}/work`);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute("href"), `${canonicalBase}/en/work`);
      await page.locator(".locale-switch a").click();
      await page.waitForURL(`**/${locale === "en" ? "es" : "en"}/work`);
      await page.locator(".locale-switch a").click();
      await page.waitForURL(`**/${locale}/work`);
      await page.evaluate(async () => { for (const img of document.images) { img.loading = "eager"; await img.decode(); } });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, "Archive horizontal overflow");
      await page.screenshot({ path: `${output}/${locale}-${width}-archive.png`, fullPage: true });
      const links = await page.locator(".work-archive-card h3 a").evaluateAll(nodes => nodes.map(n => n.getAttribute("href")));
      for (const path of links) {
        const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200, path);
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.locator("html").getAttribute("lang"), locale);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${canonicalBase}${path}`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, path);
        assert.equal(await page.evaluate(() => [...document.images].some(img => img.complete && img.naturalWidth === 0)), false, `Broken image: ${path}`);
        const back = page.locator(`footer a[href="/${locale}/work"]`);
        assert.equal(await back.count(), 1, `Return path: ${path}`);
        if (path.endsWith("all-star-restoration")) {
          await page.screenshot({ path: `${output}/${locale}-${width}-entry.png`, fullPage: true });
          await page.locator(".locale-switch a").click();
          await page.waitForURL(`**/${locale === "en" ? "es" : "en"}/work/all-star-restoration`);
        }
      }
      await page.goto(`${base}/${locale}/work`);
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2; }), true, "Keyboard focus must be visible");
      const missing = await page.goto(`${base}/${locale}/work/not-a-project`);
      assert.equal(missing.status(), 404);
      report.push({ locale, width, projects: links.length, status: "PASS" });
    }
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(`${output}/report.json`, JSON.stringify({ base, report, errors }, null, 2));
  console.log(JSON.stringify({ base, report, errors }, null, 2));
} finally { await browser.close(); }
