import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import assert from "node:assert/strict";
import { chromium } from "playwright";
const root = resolve("dist"),
  prefix = "/diet-code/";
const errors = [];
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".svg": "image/svg+xml",
};
const server = createServer(async (req, res) => {
  try {
    const path = new URL(req.url, "http://localhost").pathname;
    if (!path.startsWith(prefix)) throw new Error("outside base");
    const relative =
      decodeURIComponent(path.slice(prefix.length)) || "index.html";
    const file = resolve(root, relative);
    if (!file.startsWith(root + "/")) throw new Error("outside root");
    const data = await readFile(file);
    res.writeHead(200, {
      "content-type": types[extname(file)] || "application/octet-stream",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(`http://127.0.0.1:${server.address().port}${prefix}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  assert.ok(
    await page.evaluate(() => document.fonts.check("900 20px Archivo")),
  );
  assert.ok(
    await page
      .locator("html")
      .evaluate((e) => e.classList.contains("enhanced")),
  );
  assert.ok(
    await page.evaluate(() =>
      [...document.querySelectorAll("[data-bottle] img")].every(
        (i) => i.complete && i.naturalWidth > 0,
      ),
    ),
  );
  await page.locator(".button-dark").click();
  assert.ok(
    await page
      .locator("#work-title")
      .evaluate((e) => e === document.activeElement),
  );
  await page.evaluate(() =>
    Promise.all(
      [...document.querySelectorAll(".wardrobe-plate img")].map((i) =>
        i.decode(),
      ),
    ),
  );
  for (const tab of await page.locator('[role="tab"]').all()) {
    await tab.click();
    await page
      .locator(".feature-panel:not([hidden]) img")
      .evaluateAll((images) => Promise.all(images.map((i) => i.decode())));
  }
  assert.ok(
    await page.evaluate(() =>
      [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    ),
  );
  assert.deepEqual(errors, []);
  console.log(
    "Production build passes nested-base asset, font, enhancement, navigation and error checks.",
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
