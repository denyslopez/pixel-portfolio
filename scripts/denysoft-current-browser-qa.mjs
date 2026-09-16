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
    const homeHeroTitle = document.querySelector('[data-qa="home-hero"] h1');
    const pageHeroTitle = document.querySelector('[data-qa="page-hero"] h1');
    const homeHeroSpans = homeHeroTitle ? [...homeHeroTitle.querySelectorAll(":scope > span")] : [];
    const homeHeroVisualLines = homeHeroSpans.reduce((total, span) => {
      const style = getComputedStyle(span);
      const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) || 1;
      const height = span.getBoundingClientRect().height;
      return total + Math.max(1, Math.round(height / lineHeight));
    }, 0);
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
      homeHeroVisualLines,
      homeHeroTitleHeight: homeHeroTitle?.getBoundingClientRect().height ?? 0,
      pageHeroTitleHeight: pageHeroTitle?.getBoundingClientRect().height ?? 0,
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
          if (locale === "es") {
            const maxLines = viewport.name === "desktop" ? 4 : 5;
            const maxHeight = viewport.height * (viewport.name === "desktop" ? 0.48 : 0.42);
            invariant(state.homeHeroVisualLines <= maxLines, `${url} ${viewport.name}: Spanish hero expanded to ${state.homeHeroVisualLines} visual lines (max ${maxLines})`);
            invariant(state.homeHeroTitleHeight <= maxHeight, `${url} ${viewport.name}: Spanish hero title consumes ${Math.round(state.homeHeroTitleHeight)}px of ${viewport.height}px viewport`);
          }
        } else {
          invariant(state.pageHero === 1, `${url} ${viewport.name}: page hero missing`);
          if (locale === "es") {
            const maxHeight = viewport.height * (viewport.name === "desktop" ? 0.44 : 0.38);
            invariant(state.pageHeroTitleHeight <= maxHeight, `${url} ${viewport.name}: Spanish page hero title consumes ${Math.round(state.pageHeroTitleHeight)}px of ${viewport.height}px viewport`);
          }
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

  for (const locale of ["en", "es"]) {
    const legacyPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await legacyPage.goto(`${baseUrl}/${locale}/creative-burst`, { waitUntil: "networkidle" });
    invariant(new URL(legacyPage.url()).pathname === `/${locale}`, `${locale}: creative-burst did not retire to locale home`);
    await legacyPage.close();
  }

  for (const locale of ["en", "es"]) {
    const formPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await formPage.goto(`${baseUrl}/${locale}/discuss`, { waitUntil: "networkidle" });
    const form = formPage.locator('form[data-commercial-intake="email-handoff"]');
    invariant(await form.count() === 1, `${locale}: commercial intake handoff not mounted`);
    invariant(await form.locator('input[name="name"][required]').count() === 1, `${locale}: name must be required`);
    invariant(await form.locator('input[name="email"][required]').count() === 1, `${locale}: email must be required`);
    invariant(await form.locator('textarea[name="challenge"][required]').count() === 1, `${locale}: challenge must be required`);
    const buttonName = locale === "en" ? "Prepare email" : "Preparar correo";
    invariant(await formPage.getByRole("button", { name: buttonName }).count() === 1, `${locale}: commercial intake submit label missing`);
    const note = locale === "en"
      ? "This intake prepares an email in your email app. Denysoft receives it only after you send it."
      : "Este intake prepara un correo en tu aplicación de email. Denysoft lo recibe únicamente cuando tú lo envías.";
    invariant(await formPage.getByText(note).count() === 1, `${locale}: governed email handoff disclosure missing`);
    invariant(await formPage.getByText(/Preview confirmed|Preview intake only|Intake de Preview únicamente/).count() === 0, `${locale}: preview-only intake language still exposed`);
    await formPage.close();
  }

  await writeFile(`${outputDir}/report.json`, JSON.stringify({ status: "PASS", routes: results.length, results }, null, 2));
  console.log(`Denysoft current browser QA PASS — ${results.length} route/viewport checks with Spanish visual-fit and commercial-readiness guards.`);
} catch (error) {
  await writeFile(`${outputDir}/server.log`, serverLog);
  await writeFile(`${outputDir}/failure.txt`, String(error?.stack ?? error));
  throw error;
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
