import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3100";
const outputDir = "qa/browser-current";
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
    const all = [...document.querySelectorAll("body *")];
    const overflow = all.map((node) => {
      const rect = node.getBoundingClientRect();
      return { tag: node.tagName.toLowerCase(), className: typeof node.className === "string" ? node.className : "", left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
    }).filter((item) => item.width > 0 && (item.left < -2 || item.right > innerWidth + 2)).slice(0, 20);
    const images = [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
    return {
      lang: document.documentElement.lang,
      authority: Boolean(root),
      pageName: root?.getAttribute("data-page") ?? null,
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      overflow,
      brokenImages: images,
      header: document.querySelectorAll('[data-qa="site-header"]').length,
      homeHero: document.querySelectorAll('[data-qa="home-hero"]').length,
      pageHero: document.querySelectorAll('[data-qa="page-hero"]').length,
      evidence: document.querySelectorAll('[data-qa="evidence-grid"] article').length,
      machineRoom: document.querySelectorAll('[data-qa="machine-room"]').length,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      navText: document.querySelector('[data-qa="site-header"]')?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      bodyFont: getComputedStyle(document.body).fontFamily,
    };
  });
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

const routes = ["", "/solutions", "/work", "/axom", "/partners", "/about", "/discuss"];
const results = [];
let browser;

try {
  await waitForServer(`${baseUrl}/en`);
  browser = await chromium.launch({ headless: true });

  for (const locale of ["en", "es"]) {
    for (const suffix of routes) {
      const pageName = suffix ? suffix.slice(1) : "home";
      for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 390, height: 844 }]) {
        const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
        const url = `${baseUrl}/${locale}${suffix}`;
        await page.goto(url, { waitUntil: "networkidle" });
        const state = await inspect(page);
        invariant(state.lang === locale, `${url} ${viewport.name}: lang drift ${state.lang}`);
        invariant(state.authority, `${url} ${viewport.name}: current design authority root missing`);
        invariant(state.pageName === pageName, `${url} ${viewport.name}: page marker ${state.pageName} != ${pageName}`);
        invariant(!state.overflowX, `${url} ${viewport.name}: horizontal overflow ${JSON.stringify(state.overflow)}`);
        invariant(state.brokenImages.length === 0, `${url} ${viewport.name}: broken images ${JSON.stringify(state.brokenImages)}`);
        invariant(state.header === 1, `${url} ${viewport.name}: site header missing`);
        invariant(state.h1.length > 8, `${url} ${viewport.name}: primary heading missing`);
        if (pageName === "home") {
          invariant(state.homeHero === 1, `${url} ${viewport.name}: home hero missing`);
          invariant(state.evidence === 4, `${url} ${viewport.name}: expected four governed evidence cards`);
          invariant(state.machineRoom >= 1, `${url} ${viewport.name}: AXOM machine room missing on home`);
        } else {
          invariant(state.pageHero === 1, `${url} ${viewport.name}: page hero missing`);
        }
        if (pageName === "work") invariant(state.evidence === 4, `${url} ${viewport.name}: work evidence set incomplete`);
        if (pageName === "axom") invariant(state.machineRoom === 1, `${url} ${viewport.name}: AXOM machine room missing`);
        if (viewport.name === "desktop") {
          const expected = locale === "en" ? ["Solutions", "Work", "AXOM", "Partners", "About"] : ["Soluciones", "Trabajo", "AXOM", "Partners", "Perfil"];
          expected.forEach((label) => invariant(state.navText.includes(label), `${url}: desktop nav missing ${label}`));
        } else {
          const menu = page.getByRole("button", { name: "MENU" });
          await menu.click();
          invariant(await page.locator("#denysoft-mobile-menu").count() === 1, `${url}: mobile menu failed to open`);
        }
        const shouldCapture = (pageName === "home" && ["desktop", "mobile"].includes(viewport.name)) || (locale === "en" && ["axom", "discuss"].includes(pageName) && viewport.name === "mobile");
        if (shouldCapture) await page.screenshot({ path: `${outputDir}/${locale}-${pageName}-${viewport.name}.png`, fullPage: true });
        results.push({ locale, pageName, viewport: viewport.name, state });
        await page.close();
      }
    }
  }

  const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await reducedPage.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });
  const reducedState = await inspect(reducedPage);
  invariant(!reducedState.overflowX, "Reduced-motion mobile home overflowed");
  await reducedPage.close();

  const formPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await formPage.goto(`${baseUrl}/en/discuss`, { waitUntil: "networkidle" });
  await formPage.locator('input[name="name"]').fill("Preview QA");
  await formPage.locator('input[name="email"]').fill("qa@example.com");
  await formPage.locator('textarea[name="challenge"]').fill("Validate preview intake behavior");
  await formPage.getByRole("button", { name: "Discuss a Challenge" }).last().click();
  invariant(await formPage.getByText("Preview confirmed: no data was sent or stored.").count() === 1, "Preview-only intake guard missing");
  await formPage.close();

  await writeFile(`${outputDir}/report.json`, JSON.stringify({ status: "PASS", routes: results.length, results }, null, 2));
  console.log(`Denysoft current browser QA PASS — ${results.length} route/viewport checks.`);
} catch (error) {
  await writeFile(`${outputDir}/server.log`, serverLog);
  await writeFile(`${outputDir}/failure.txt`, String(error?.stack ?? error));
  throw error;
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
