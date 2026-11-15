import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { chromium } from "playwright";
const out = "screenshots/tear-open/preview";
await mkdir(out, { recursive: true });
const server = await createServer({
  server: { host: "127.0.0.1", port: 5190, strictPort: false },
});
await server.listen();
const url = `http://127.0.0.1:${server.httpServer.address().port}`;
const browser = await chromium.launch();
const result = { checks: [], errors: [] };
const check = (value, label) => {
  assert.ok(value, label);
  result.checks.push(label);
};
async function imageReady(page, panel) {
  await page
    .locator(`${panel} img`)
    .evaluateAll((images) => Promise.all(images.map((i) => i.decode())));
  await page.waitForTimeout(720);
}
try {
  for (const [w, h] of [
    [1440, 900],
    [768, 1024],
    [390, 844],
    [320, 844],
    [375, 667],
  ]) {
    const context = await browser.newContext({
        viewport: { width: w, height: h },
      }),
      page = await context.newPage();
    page.on("pageerror", (e) => result.errors.push(e.message));
    await page.goto(url);
    await page.evaluate(() => {
      localStorage.setItem("dietcode.preview-test-sentinel", "keep");
    });
    check(
      (await page.locator('[data-preview-action="start"]').count()) === 4,
      `${w}: four source pieces available`,
    );
    await page
      .locator('[data-preview-action="start"][data-piece="olive"]')
      .focus();
    await page.keyboard.press("Enter");
    check(
      await page.locator("#panel-today").isVisible(),
      `${w}: keyboard starting piece opens Today`,
    );
    check(
      await page
        .locator("#panel-today")
        .evaluate((e) => e === document.activeElement),
      `${w}: result panel receives focus`,
    );
    check(
      await page.locator("#panel-today").evaluate((panel) => {
        const kept = panel.querySelector(".preview-locked");
        return kept.getAnimations().length === 0 &&
          [...panel.querySelectorAll(".preview-dealt")].filter(
            (piece) => piece.getAnimations().some((a) => a.playState === "running"),
          ).length === 3;
      }),
      `${w}: remaining outfit assembles around the stationary starting piece`,
    );
    if (w <= 560) {
      check(
        await page.locator("#panel-today").evaluate((panel) => {
          const result = panel.querySelector(".outfit-assembly").getBoundingClientRect();
          const actions = panel.querySelector(".preview-action-row").getBoundingClientRect();
          return result.top >= 0 && result.bottom <= innerHeight &&
            actions.top >= 0 && actions.bottom <= innerHeight;
        }),
        `${w}: complete result and actions share the phone viewport`,
      );
    }
    const before = await page
      .locator('#panel-today [data-preview-slot="top"]')
      .getAttribute("data-piece");
    await page.locator('[data-preview-action="vary"]').focus();
    await page.keyboard.press("Space");
    check(
      (await page
        .locator('#panel-today [data-preview-slot="outer"]')
        .getAttribute("data-piece")) === "olive",
      `${w}: chosen jacket remains kept`,
    );
    const after = await page
      .locator('#panel-today [data-preview-slot="top"]')
      .getAttribute("data-piece");
    check(after !== before, `${w}: alternative changes the other piece`);
    check(
      await page
        .locator('[data-preview-action="vary"]')
        .evaluate((e) => e === document.activeElement),
      `${w}: varying preserves visible control focus`,
    );
    await imageReady(page, "#panel-today");
    await page.screenshot({ path: `${out}/${w}-today.png` });
    await page.locator('[data-preview-action="save"]').click();
    check(
      await page.locator("#panel-looks").isVisible(),
      `${w}: keep opens Looks`,
    );
    if (w <= 560) {
      check(
        await page.locator("#panel-looks").evaluate((panel) => {
          const result = panel.querySelector(".outfit-assembly").getBoundingClientRect();
          const actions = panel.querySelector(".preview-action-row").getBoundingClientRect();
          return result.top >= 0 && result.bottom <= innerHeight &&
            actions.top >= 0 && actions.bottom <= innerHeight;
        }),
        `${w}: kept result and next actions share the phone viewport`,
      );
    }
    check(
      (await page
        .locator('#panel-looks [data-preview-slot="top"]')
        .getAttribute("data-piece")) === after,
      `${w}: kept look matches selected pieces`,
    );
    await imageReady(page, "#panel-looks");
    await page.screenshot({ path: `${out}/${w}-kept.png` });
    await page.reload();
    await page.locator("#tab-looks").click();
    check(
      (await page
        .locator(".project-notebook")
        .getAttribute("data-preview-saved")) === "true",
      `${w}: saved preview survives reload`,
    );
    check(
      (await page
        .locator('#panel-looks [data-preview-slot="top"]')
        .getAttribute("data-piece")) === after,
      `${w}: persistence restores exact piece`,
    );
    await page.locator('[data-preview-action="reset"]').click();
    check(
      await page.locator("#panel-wardrobe").isVisible(),
      `${w}: reset returns to Wardrobe`,
    );
    check(
      (await page
        .locator(".project-notebook")
        .getAttribute("data-preview-saved")) === "false",
      `${w}: reset clears kept preview`,
    );
    check(
      await page.evaluate(
        () => localStorage.getItem("dietcode.preview-test-sentinel") === "keep",
      ),
      `${w}: reset preserves unrelated storage`,
    );
    await imageReady(page, "#panel-wardrobe");
    await page.screenshot({ path: `${out}/${w}-wardrobe.png` });
    if (w <= 560) {
      check(
        await page.locator('#panel-wardrobe .preview-piece').evaluateAll((pieces) =>
          pieces.every((piece) => {
            const r = piece.getBoundingClientRect();
            return r.top >= 6 && r.bottom <= innerHeight - 6;
          }),
        ),
        `${w}: all starting pieces are visible together when entering the chooser`,
      );
    }
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${w}: no preview overflow`,
    );
    const clipped = await page
      .locator("#panel-wardrobe .preview-piece")
      .evaluateAll((buttons) =>
        buttons.some((b) => {
          const r = b.getBoundingClientRect(),
            v = b.closest(".feature-visual").getBoundingClientRect();
          return (
            r.top < v.top - 0.5 ||
            r.bottom > v.bottom + 0.5 ||
            r.left < v.left - 0.5 ||
            r.right > v.right + 0.5
          );
        }),
      );
    check(
      !clipped,
      `${w}: complete starting-piece controls fit their paper panel`,
    );
    if (w <= 560) {
      await page.locator('[data-preview-action="start"][data-piece="indigo"]').focus();
      await page.waitForTimeout(700);
      for (const id of ["cream", "linen"]) {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(700);
        check(
          await page.locator(`[data-preview-action="start"][data-piece="${id}"]`).evaluate((e) => {
            const r = e.getBoundingClientRect();
            return e === document.activeElement && r.top >= 6 && r.bottom <= innerHeight - 6;
          }),
          `${w}: ${id} card focus outline fits the viewport`,
        );
      }
    }
    await context.close();
  }
  const denied = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await denied.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage unavailable", "SecurityError");
      },
    });
  });
  const page = await denied.newPage();
  page.on("pageerror", (e) => result.errors.push(e.message));
  await page.goto(url);
  await page
    .locator('[data-preview-action="start"][data-piece="cream"]')
    .click();
  await page.locator('[data-preview-action="vary"]').click();
  await page.locator('[data-preview-action="save"]').click();
  check(
    await page
      .locator("#panel-looks .outfit-label")
      .innerText()
      .then((t) => t.includes("KEPT FOR THIS VISIT")),
    "denied storage keeps an honest session-only look",
  );
  check(
    (await page
      .locator(".project-notebook")
      .getAttribute("data-preview-saved")) === "true",
    "storage denial does not break preview state",
  );
  check(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length === 0,
    ),
    "reduced motion preview rests",
  );
  await denied.close();
  const plain = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    }),
    p = await plain.newPage();
  await p.goto(url);
  check(
    (await p.locator("[data-preview-action]").count()) === 0,
    "no-JS fallback has no dummy preview controls",
  );
  check(
    (await p.locator("#panel-wardrobe").isVisible()) &&
      (await p.locator("#panel-today").isVisible()) &&
      (await p.locator("#panel-looks").isVisible()),
    "no-JS fallback preserves all factual case content",
  );
  await plain.close();
  check(result.errors.length === 0, "no preview page errors");
  result.passed = true;
} finally {
  await writeFile(`${out}/report.json`, JSON.stringify(result, null, 2));
  await browser.close();
  await server.close();
  console.log(
    JSON.stringify({
      passed: result.passed,
      checks: result.checks.length,
      errors: result.errors,
      output: out,
    }),
  );
}
