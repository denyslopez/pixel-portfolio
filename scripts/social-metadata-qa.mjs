import { spawn } from "node:child_process";

const baseUrl = "http://127.0.0.1:3100";

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
  stdio: "ignore",
});

try {
  await waitForServer(`${baseUrl}/en`);

  for (const path of ["/opengraph-image", "/twitter-image"]) {
    const response = await fetch(`${baseUrl}${path}`);
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.arrayBuffer();

    invariant(response.status === 200, `${path}: expected HTTP 200, got ${response.status}`);
    invariant(contentType.startsWith("image/png"), `${path}: expected image/png, got ${contentType}`);
    invariant(body.byteLength > 1000, `${path}: image response unexpectedly small (${body.byteLength} bytes)`);
  }

  console.log("Social metadata route QA: PASS");
} finally {
  server.kill("SIGTERM");
}
