import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { chromium } from "playwright";
const out = "screenshots/tear-open";
await mkdir(out, { recursive: true });
const server = await createServer({
  server: { host: "127.0.0.1", port: 5188, strictPort: false },
});
await server.listen();
const address = server.httpServer.address();
const url = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true });
const report = { checks: [], errors: [], sizes: [], motion: {}, url };
const check = (condition, label) => {
  assert.ok(condition, label);
  report.checks.push(label);
};
async function settle(page, ms = 80) {
  await page.waitForTimeout(ms);
}
async function at(page, p) {
  await page.evaluate((p) => {
    const s = document.querySelector("[data-tear-scene]");
    scrollTo({
      top:
        s.offsetTop +
        (s.offsetHeight - s.querySelector(".scene-stage").offsetHeight) * p,
      behavior: "instant",
    });
  }, p);
  await settle(page);
  return page.evaluate(() => {
    const s = document.querySelector("[data-tear-scene]");
    return {
      step: s.dataset.paperStep,
      mask: s.querySelector(".hero").style.maskImage,
      maskSize: s.querySelector(".hero").style.maskSize,
      maskPosition: s.querySelector(".hero").style.maskPosition,
      bottleVisibility: s.querySelector("[data-bottle-scroll]").style
        .visibility,
      bottle: s.querySelector("[data-bottle-scroll]").style.transform,
      work: s.querySelector("[data-work-pane]").style.transform,
    };
  });
}
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: `${out}/video`, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await settle(page, 1000);
  check(
    await page
      .locator("html")
      .evaluate((e) => e.classList.contains("enhanced")),
    "art-ready scroll enhancement",
  );
  await page.screenshot({ path: `${out}/desktop-hero.png` });
  await page.keyboard.press("Tab");
  check(
    await page
      .locator(".skip-link")
      .evaluate((e) => e === document.activeElement),
    "skip link is first keyboard target",
  );
  await page.keyboard.press("Enter");
  await settle(page);
  check(
    await page
      .locator("#hero-title")
      .evaluate((e) => e === document.activeElement),
    "skip link focuses content heading",
  );
  await page.keyboard.press("Tab");
  check(
    !(await page
      .locator("#main-nav")
      .evaluate((e) => e.contains(document.activeElement))),
    "skip link bypasses header links",
  );
  check(
    await page.locator("#work").evaluate(
      (e) => !e.inert && e.getAttribute("aria-hidden") !== "true",
    ),
    "Work summary remains in semantic document order before visual reveal",
  );
  await page.locator(".button-dark").focus();
  await page.keyboard.press("Tab");
  await settle(page);
  check(
    await page.locator('.work-intro-foot a').evaluate((e) => {
      const r = e.getBoundingClientRect();
      return e === document.activeElement && r.top >= 0 && r.bottom <= innerHeight;
    }),
    "keyboard entering Work reveals its focused link",
  );
  const tabs = page.locator(".project-tabs [role=tab]");
  check((await tabs.count()) === 3, "three real product-story tabs");
  check(
    (await page
      .locator('[role="tablist"]')
      .getAttribute("aria-orientation")) === "vertical",
    "desktop tabs expose vertical orientation",
  );
  check(
    (await page.locator(".project-enquiry").getAttribute("href")) ===
      "mailto:dietcode@sike.dev?subject=OOTD%20enquiry",
    "OOTD enquiry opens a correctly addressed project draft",
  );
  await tabs.nth(1).click();
  check(
    (await page.locator("#panel-today").isVisible()) &&
      !(await page.locator("#panel-wardrobe").isVisible()),
    "Today product story selected",
  );
  await page.keyboard.press("ArrowDown");
  check(
    await page.locator("#panel-looks").isVisible(),
    "product stories support arrow keyboard selection",
  );
  await page.keyboard.press("Home");
  check(
    await page.locator("#panel-wardrobe").isVisible(),
    "Home restores first product story",
  );
  const outlineContrast = await page.locator("#tab-wardrobe").evaluate((e) => {
    const lum = (s) =>
      s
        .match(/\d+/g)
        .slice(0, 3)
        .map(Number)
        .map((n) => n / 255)
        .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
        .reduce((a, n, i) => a + n * [0.2126, 0.7152, 0.0722][i], 0);
    const a = lum(getComputedStyle(e).outlineColor),
      b = lum(getComputedStyle(document.documentElement).backgroundColor);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  check(
    outlineContrast >= 3,
    "selected-tab focus outline contrasts with canvas",
  );
  await page.screenshot({ path: `${out}/product-notebook.png` });
  await page.goto(url);
  await settle(page, 1000);
  const pop = page.locator(".pop-control"),
    bottle = page.locator("[data-bottle]");
  await page.evaluate(() => {
    const root = document.querySelector("[data-bottle]");
    root._verificationStates = [];
    root._verificationObserver = new MutationObserver(() =>
      root._verificationStates.push({
        state: root.dataset.capState,
        time: performance.now(),
      }),
    );
    root._verificationObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-cap-state"],
    });
  });
  await pop.click();
  await pop.click({ clickCount: 4, delay: 30 });
  await page.waitForFunction(
    () => document.querySelector("[data-bottle]").dataset.capState === "open",
  );
  check(
    (await bottle.getAttribute("data-cap-state")) === "open",
    "rapid cap activation completes one pop",
  );
  report.motion.popMeasuredMs = await page.evaluate(() => {
    const root = document.querySelector("[data-bottle]");
    root._verificationObserver.disconnect();
    return (
      root._verificationStates.find((s) => s.state === "open").time -
      root._verificationStates.find((s) => s.state === "popping").time
    );
  });
  await pop.focus();
  await page.keyboard.press("Enter");
  await settle(page, 1400);
  check(
    (await bottle.getAttribute("data-cap-state")) === "open",
    "keyboard replay reseats and pops",
  );
  await page.screenshot({ path: `${out}/desktop-cap-open.png` });
  await page.reload();
  await settle(page, 1000);
  const hit = page.locator(".bottle-hit"),
    box = await hit.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2, {
    steps: 5,
  });
  await page.mouse.up();
  await settle(page, 700);
  check(
    (await bottle.getAttribute("data-cap-state")) === "closed",
    "drag suppresses subsequent click",
  );
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await hit.dispatchEvent("pointercancel", {
    pointerId: 1,
    pointerType: "mouse",
  });
  await page.mouse.up();
  await settle(page, 700);
  check(
    (await bottle.getAttribute("data-cap-state")) === "closed",
    "pointer cancellation does not pop",
  );
  await page.mouse.move(0, 0);
  await settle(page);
  const forward = {},
    forwardImages = {};
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    forward[p] = await at(page, p);
    await page.evaluate(() => document.activeElement.blur());
    forwardImages[p] = await page.screenshot({
      path: `${out}/forward-${p * 100}.png`,
    });
  }
  for (const p of [1, 0.75, 0.5, 0.25, 0]) {
    assert.deepEqual(await at(page, p), forward[p], `reverse pose at ${p}`);
    report.checks.push(`equal forward/reverse pose ${p}`);
    await page.evaluate(() => document.activeElement.blur());
    const pixels = await page.screenshot({
      path: `${out}/reverse-${p * 100}.png`,
    });
    const diff = await page.evaluate(
      async ({ a, b }) => {
        const read = async (src) => {
          const i = new Image();
          i.src = src;
          await i.decode();
          const c = document.createElement("canvas");
          c.width = i.width;
          c.height = i.height;
          const x = c.getContext("2d");
          x.drawImage(i, 0, 0);
          return x.getImageData(0, 0, c.width, c.height).data;
        };
        const first = await read(a),
          second = await read(b);
        let changed = 0,
          maxDelta = 0;
        for (let i = 0; i < first.length; i += 4) {
          let different = false;
          for (let c = 0; c < 3; c++) {
            const d = Math.abs(first[i + c] - second[i + c]);
            if (d) different = true;
            maxDelta = Math.max(maxDelta, d);
          }
          if (different) changed++;
        }
        return {
          changedPixels: changed,
          fraction: changed / (first.length / 4),
          maxDelta,
        };
      },
      {
        a: `data:image/png;base64,${forwardImages[p].toString("base64")}`,
        b: `data:image/png;base64,${pixels.toString("base64")}`,
      },
    );
    report.reversePixels ??= {};
    report.reversePixels[p] = diff;
    check(
      diff.fraction < 0.0001 && diff.maxDelta <= 12,
      `matching forward/reverse render ${p} within raster tolerance`,
    );
  }
  for (const p of [0.5, 0.25, 0.75, 0.5, 1, 0])
    assert.deepEqual(await at(page, p), forward[p]);
  report.checks.push("rapid mixed reversal stable");
  report.motion.frameIntervals = await page.evaluate(async () => {
    const samples = [];
    let prev = performance.now();
    const scene = document.querySelector("[data-tear-scene]"),
      travel =
        scene.offsetHeight - scene.querySelector(".scene-stage").offsetHeight;
    for (const direction of [1, -1, 1])
      for (let i = 0; i <= 40; i++) {
        await new Promise((r) =>
          requestAnimationFrame((t) => {
            samples.push(t - prev);
            prev = t;
            r();
          }),
        );
        scrollTo({
          top: travel * (direction === 1 ? i / 40 : 1 - i / 40),
          behavior: "instant",
        });
      }
    samples.sort((a, b) => a - b);
    return {
      count: samples.length,
      medianMs: samples[Math.floor(samples.length / 2)],
      p95Ms: samples[Math.floor(samples.length * 0.95)],
      maxMs: samples.at(-1),
    };
  });
  await at(page, 0);
  await page.locator(".button-dark").click();
  check(
    await page
      .locator("#work-title")
      .evaluate((e) => document.activeElement === e),
    "Work link focuses revealed OOTD heading",
  );
  check(
    await page.locator(".hero").evaluate((e) => e.inert),
    "covered hero inert",
  );
  await at(page, 0.25);
  check(
    (await page.locator(".hero").evaluate((e) => !e.inert)) &&
      (await page.locator("#work").evaluate((e) => !e.inert && e.getAttribute("aria-hidden") !== "true")),
    "reverse restores hero and covers project coherently",
  );
  check(
    await page
      .locator("[data-hero-pane]")
      .evaluate((e) => e.contains(document.activeElement)),
    "focus moves out of newly covered project",
  );
  await at(page, 0.5);
  await page.setViewportSize({ width: 1024, height: 768 });
  await settle(page);
  check(
    Number.isFinite(
      await page
        .locator("[data-tear-scene]")
        .evaluate((e) => Number(e.dataset.progress)),
    ),
    "resize mid-tear retains finite pose",
  );
  for (const [w, h] of [
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [320, 844],
    [375, 667],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(url);
    await settle(page, 1000);
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `no horizontal overflow ${w}`,
    );
    report.sizes.push({ width: w, height: h });
    check(
      (await page
        .locator('[role="tablist"]')
        .getAttribute("aria-orientation")) ===
        (w <= 560 ? "horizontal" : "vertical"),
      `tab orientation matches ${w}px layout`,
    );
    await page.screenshot({ path: `${out}/${w}-hero.png` });
    await page.evaluate(() =>
      document.querySelector("#studio").scrollIntoView({ behavior: "instant" }),
    );
    await settle(page);
    for (const name of ["Gowrish", "Jeswin", "Sabi"]) {
      const el = page.locator(".team-list h3", { hasText: name });
      check(
        (await el.isVisible()) &&
          (await el.evaluate((e) => e.getBoundingClientRect().width > 20)),
        `${name} visibly rendered at ${w}`,
      );
    }
    await page.screenshot({ path: `${out}/${w}-studio.png` });
    await page.evaluate(() =>
      document
        .querySelector("#contact")
        .scrollIntoView({ behavior: "instant" }),
    );
    await settle(page);
    check(
      (await page.locator(".contact-email").getAttribute("href")) ===
        "mailto:dietcode@sike.dev",
      `real contact route ${w}`,
    );
    const closing = await page.locator("#contact-title em").evaluate((e) => {
      const r = document.createRange();
      r.selectNodeContents(e);
      const section = e.closest("section"),
        style = getComputedStyle(section);
      return {
        lines: r.getClientRects().length,
        width: r.getBoundingClientRect().width,
        available:
          section.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight),
      };
    });
    check(
      closing.lines === 1 && closing.width <= closing.available + 0.5,
      `complete closing phrase fits one line at ${w}px`,
    );
    await page.screenshot({ path: `${out}/${w}-contact.png` });
    await page.goto(url);
    await settle(page, 100);
    await page.locator(".button-dark").click();
    await settle(page);
    await page.screenshot({ path: `${out}/${w}-work.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await settle(page, 1000);
  await page.locator(".menu-toggle").click();
  check(
    (await page.locator(".menu-toggle").getAttribute("aria-expanded")) ===
      "true",
    "mobile menu opens",
  );
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    check(
      await page
        .locator(".menu-layer")
        .evaluate((e) => e.contains(document.activeElement)),
      "forward menu cycle remains inside dialog",
    );
  }
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Shift+Tab");
    check(
      await page
        .locator(".menu-layer")
        .evaluate((e) => e.contains(document.activeElement)),
      "reverse menu cycle remains inside dialog",
    );
  }
  await page.keyboard.press("Escape");
  check(
    (await page.locator(".menu-toggle").getAttribute("aria-expanded")) ===
      "false",
    "Escape closes menu",
  );
  await page.locator(".menu-toggle").click();
  await page.locator('#main-nav a[href="#studio"]').click();
  check(
    (await page.locator(".menu-toggle").getAttribute("aria-expanded")) ===
      "false",
    "menu navigation closes overlay",
  );
  await page.locator('.site-footer a[href="#top"]:not(.brand)').click();
  await settle(page, 1500);
  check(
    await page.evaluate(() => scrollY < 2),
    "Back to top returns to hero origin",
  );
  check(
    await page.locator(".hero").evaluate((e) => !e.inert),
    "Back to top restores interactive hero",
  );
  await page.locator(".menu-toggle").click();
  await page.locator('#main-nav a[href="#work"]').click();
  check(
    await page
      .locator("#work-title")
      .evaluate((e) => document.activeElement === e),
    "mobile menu Work focuses revealed title",
  );
  await at(page, 0);
  await at(page, 0.6);
  await page.locator(".menu-toggle").click();
  for (const link of await page.locator(".menu-layer nav a").all())
    check(
      await link.evaluate((e) => {
        const r = e.getBoundingClientRect();
        return e.contains(
          document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2),
        );
      }),
      "partial-tear menu link has visible hit target",
    );
  await page.keyboard.press("Escape");
  await at(page, 0);
  await page.locator(".button-dark").click();
  await at(page, 0.6);
  check(
    await page
      .locator(".brand")
      .first()
      .evaluate((e) => document.activeElement === e),
    "mobile reverse focuses visible home link",
  );
  await page.evaluate(() => (location.hash = "top"));
  await settle(page, 200);
  check(
    await page.evaluate(() => scrollY < 2),
    "same-document top hash restores origin",
  );
  await page.evaluate(() => (location.hash = "work"));
  await settle(page, 200);
  check(
    await page.locator("#work").evaluate((e) => !e.inert),
    "same-document work hash reveals project",
  );
  await page.evaluate(() => (location.hash = "hero-title"));
  await settle(page, 200);
  check(
    await page.evaluate(() => scrollY < 2),
    "content-title hash restores hero",
  );
  await page.locator(".pop-control").click();
  await settle(page, 350);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await settle(page);
  check(
    (await page.locator("[data-bottle]").getAttribute("data-cap-state")) ===
      "open",
    "mid-pop motion preference change settles cap",
  );
  check(
    (await page.locator(".pop-control").getAttribute("aria-busy")) === "false",
    "remount clears stale busy state",
  );
  check(
    (await page
      .locator(".fizz")
      .evaluate((e) => getComputedStyle(e).opacity)) === "0",
    "remount clears transient fizz",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await settle(page);
  check(
    (await page.locator("[data-bottle]").getAttribute("data-cap-state")) ===
      "open",
    "normal-motion remount preserves settled cap",
  );
  const contrast = await page.evaluate(() => {
    const l = (s) =>
      s
        .match(/\d+/g)
        .slice(0, 3)
        .map(Number)
        .map((n) => n / 255)
        .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4))
        .reduce((a, n, i) => a + n * [0.2126, 0.7152, 0.0722][i], 0);
    const a = l(
        getComputedStyle(document.querySelector(".contact-bottom p")).color,
      ),
      b = l(
        getComputedStyle(document.querySelector(".contact")).backgroundColor,
      );
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  check(contrast >= 4.5, "contact small-text contrast >=4.5");
  report.contactContrast = contrast;
  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const tp = await touch.newPage();
  await tp.goto(url);
  await settle(tp, 1000);
  await tp.locator(".pop-control").tap();
  await settle(tp, 1100);
  check(
    (await tp.locator("[data-bottle]").getAttribute("data-cap-state")) ===
      "open",
    "touch cap tap works",
  );
  check(
    (await tp
      .locator(".bottle-hit")
      .evaluate((e) => getComputedStyle(e).touchAction)) === "pan-y",
    "bottle preserves native vertical touch scrolling",
  );
  await tp.evaluate(() => document.activeElement.blur());
  const safeHeader = await tp.screenshot({
    clip: { x: 0, y: 0, width: 390, height: 70 },
  });
  await tp.evaluate(() => scrollTo({ top: 400, behavior: "instant" }));
  await settle(tp);
  const scrollHeader = await tp.screenshot({
    path: `${out}/mobile-cap-navigation-safe.png`,
    clip: { x: 0, y: 0, width: 390, height: 70 },
  });
  check(
    safeHeader.equals(scrollHeader),
    "popped cap cannot visually obscure mobile navigation",
  );
  await tp.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await settle(tp);
  const client = await touch.newCDPSession(tp);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 190, y: 500 }],
  });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 190, y: 200 }],
  });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await settle(tp, 300);
  check(
    await tp.evaluate(() => scrollY > 0),
    "touch swipe over bottle scrolls page",
  );
  await touch.close();
  const rm = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const rp = await rm.newPage();
  await rp.goto(url);
  await settle(rp, 300);
  check(
    !(await rp
      .locator("html")
      .evaluate((e) => e.classList.contains("enhanced"))),
    "reduced motion has ordinary document flow",
  );
  await rp.locator(".pop-control").click();
  check(
    (await rp.locator("[data-bottle]").getAttribute("data-cap-state")) ===
      "open",
    "reduced motion cap state instant",
  );
  await rp.locator(".button-dark").click();
  check(
    await rp
      .locator("#work-title")
      .evaluate((e) => document.activeElement === e),
    "reduced-motion direct Work navigation",
  );
  await rp.screenshot({ path: `${out}/reduced-motion.png` });
  await rm.close();
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const np = await nojs.newPage();
  await np.goto(url);
  check(
    await np.locator('#main-nav a[href="#work"]').isVisible(),
    "no-JS navigation visible",
  );
  check(
    !(await np
      .locator("html")
      .evaluate((e) => e.classList.contains("enhanced"))),
    "no-JS static flow",
  );
  await np.locator(".button-dark").click();
  check(
    await np.evaluate(() => location.hash === "#work"),
    "no-JS Work anchor",
  );
  await nojs.close();
  const failure = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const fp = await failure.newPage();
  await fp.route("**/bottle/body.webp", (r) => r.abort());
  await fp.goto(url);
  await settle(fp, 200);
  check(
    await fp.locator(".bottle-fallback").isVisible(),
    "failed artwork has readable fallback",
  );
  check(
    !(await fp
      .locator("html")
      .evaluate((e) => e.classList.contains("enhanced"))),
    "failed artwork does not pin empty scene",
  );
  await failure.close();
  const pause = await browser.newContext();
  const pp = await pause.newPage();
  await pp.goto(url);
  await settle(pp, 1000);
  await pp.locator(".pop-control").click();
  await settle(pp, 300);
  await pp.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const held = await pp.locator("[data-cap]").getAttribute("style");
  await settle(pp, 1100);
  check(
    held === (await pp.locator("[data-cap]").getAttribute("style")),
    "hidden-document simulation pauses cap clock",
  );
  await pp.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await settle(pp, 900);
  check(
    (await pp.locator("[data-bottle]").getAttribute("data-cap-state")) ===
      "open",
    "visible-document resume completes cap",
  );
  await pause.close();
  check(report.errors.length === 0, "no browser or network errors");
  await context.close();
  report.passed = true;
} finally {
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
  await server.close();
  console.log(
    JSON.stringify({
      passed: report.passed,
      checks: report.checks.length,
      errors: report.errors,
      output: out,
    }),
  );
}
