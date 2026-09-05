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

async function readFocus(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement)) return null;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      tag: element.tagName.toLowerCase(),
      href: element.getAttribute("href"),
      text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 100),
      focusVisible: element.matches(":focus-visible"),
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      outlineColor: style.outlineColor,
      rect: {
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
    };
  });
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: ".next/standalone",
  env: { ...process.env, PORT: "3100", HOSTNAME: "127.0.0.1" },
  stdio: "ignore",
});

const report = {};
const persist = () => writeFile(`${outputDir}/focus-diagnostics.json`, JSON.stringify(report, null, 2));

try {
  await waitForServer(`${baseUrl}/en`);
  const browser = await chromium.launch({ headless: true });

  const specs = [
    { name: "en-home-desktop", path: "/en", width: 1440, height: 1000 },
    { name: "es-home-mobile", path: "/es", width: 390, height: 844 },
    { name: "en-case-desktop", path: "/en/work/baltica-salon", width: 1200, height: 900 },
    { name: "es-case-mobile", path: "/es/work/mastertax", width: 390, height: 844 },
  ];

  for (const spec of specs) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const response = await page.goto(`${baseUrl}${spec.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    invariant(response?.status() === 200, `${spec.name}: expected HTTP 200`);
    await page.waitForTimeout(250);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });

    const sequence = [];
    for (let index = 0; index < 3; index += 1) {
      await page.keyboard.press("Tab");
      const state = await readFocus(page);
      invariant(state, `${spec.name}: no active element after Tab ${index + 1}`);
      const interactive = ["a", "button", "input", "select", "textarea"].includes(state.tag);
      const outlineWidth = Number.parseFloat(state.outlineWidth);
      invariant(interactive, `${spec.name}: Tab ${index + 1} did not land on an interactive element (${state.tag})`);
      invariant(state.focusVisible, `${spec.name}: Tab ${index + 1} is not :focus-visible`);
      invariant(state.outlineStyle !== "none" && outlineWidth >= 1.5, `${spec.name}: Tab ${index + 1} lacks a visible focus outline ${JSON.stringify(state)}`);
      invariant(state.rect.width > 0 && state.rect.height > 0, `${spec.name}: focused control has no visible box`);
      sequence.push(state);
    }

    report[spec.name] = { pass: true, sequence };
    await page.screenshot({
      path: `${outputDir}/focus-${spec.name}.png`,
      fullPage: false,
      animations: "disabled",
    });
    await persist();
    await context.close();
  }

  await browser.close();
  report.focusGate = { pass: true, profiles: specs.length, tabsPerProfile: 3 };
  await persist();
  console.log("Keyboard/focus QA: PASS");
} finally {
  server.kill("SIGTERM");
  await persist();
}
