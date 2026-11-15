import { chromium } from "playwright";
import { mkdir, rename } from "node:fs/promises";
const out = "docs/reviews/tear-open";
await mkdir(`${out}/motion-raw`, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: `${out}/motion-raw`, size: { width: 1440, height: 900 } },
});
try {
  const page = await context.newPage();
  await page.goto(process.argv[2] || "http://127.0.0.1:5173/");
  await page.waitForTimeout(1100);
  await page.locator(".pop-control").click();
  await page.waitForTimeout(1250);
  await page.mouse.move(0, 0);
  for (const direction of [1, -1, 1]) {
    for (let i = 0; i <= 36; i++) {
      await page.evaluate(
        (p) => {
          const s = document.querySelector("[data-tear-scene]");
          scrollTo({
            top:
              (s.offsetHeight - s.querySelector(".scene-stage").offsetHeight) *
              p,
            behavior: "instant",
          });
        },
        direction === 1 ? i / 36 : 1 - i / 36,
      );
      await page.waitForTimeout(45);
    }
    await page.waitForTimeout(500);
  }
  await page.locator("#ootd-details").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('[data-preview-action="start"][data-piece="indigo"]').click();
  await page.waitForTimeout(950);
  await page.locator('[data-preview-action="vary"]').click();
  await page.waitForTimeout(950);
  await page.locator('[data-preview-action="save"]').click();
  await page.waitForTimeout(950);
  await page.locator("#studio").scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  const video = page.video();
  await page.close();
  await context.close();
  await rename(await video.path(), `${out}/tear-open-motion.webm`);
  console.log(`${out}/tear-open-motion.webm`);
} finally {
  await browser.close();
}
