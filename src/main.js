import { mountProjectPreview } from "./project-preview.js";
import { mountNavigation } from "./navigation.js";
import { mountProjectTabs } from "./project-tabs.js";
import { mountBottle } from "./motion/bottle.js";
import { mountTearScene } from "./motion/tear.js";
document.documentElement.classList.add("js");
document.querySelector(".skip-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.querySelector("#hero-title").focus({ preventScroll: true }),
    ),
  );
});
mountNavigation(
  document.querySelector(".menu-toggle"),
  document.querySelector("#main-nav"),
);
document.querySelector("[data-year]").textContent = new Date().getFullYear();
const image = document.querySelector("[data-bottle-image]"),
  motion = matchMedia("(prefers-reduced-motion: reduce)");
let bottle,
  tear,
  ready = false,
  compactFlow = innerHeight < 650;
function enhance() {
  if (!ready) return;
  bottle?.destroy();
  tear?.destroy();
  bottle = mountBottle(document.querySelector("[data-bottle]"), {
    reducedMotion: motion.matches,
  });
  compactFlow = innerHeight < 650;
  tear = mountTearScene(document.querySelector("[data-tear-scene]"), {
    reducedMotion: motion.matches || compactFlow,
    bottleController: bottle,
  });
}
function failed() {
  document.documentElement.classList.add("art-failed");
  document.querySelector(".bottle-fallback").hidden = false;
  for (const el of document.querySelectorAll("[data-cap-trigger]"))
    el.hidden = true;
}
const paperImages = ["red-paper", "cream-paper", "torn-edge-v2"].map((name) => {
  const image = new Image();
  image.src = new URL(`./assets/paper/${name}.webp`, document.baseURI).href;
  return image;
});
Promise.all([
  image.decode(),
  document.querySelector("[data-cap]").decode(),
  ...paperImages.map((image) => image.decode()),
])
  .then(() => {
    ready = true;
    enhance();
    if (
      location.hash &&
      location.hash !== "#work" &&
      !["#top", "#hero-title", "#main"].includes(location.hash)
    ) {
      let destination;
      try {
        destination = document.getElementById(
          decodeURIComponent(location.hash.slice(1)),
        );
      } catch {
        /* An invalid fragment is not an asset failure. */
      }
      const disclosure = destination?.closest("details");
      if (disclosure) disclosure.open = true;
      destination?.scrollIntoView({ behavior: "instant" });
    }
  })
  .catch(failed);
motion.addEventListener("change", enhance);
window.addEventListener("resize", () => {
  if (innerHeight < 650 !== compactFlow) enhance();
});
const projectRoot = document.querySelector(".project-notebook");
const projectTabs = mountProjectTabs(projectRoot);
mountProjectPreview(projectRoot, { selectTab: projectTabs.select });

let anchorFocusTimer;
for (const link of document.querySelectorAll('a[href^="#"]')) {
  const hash = link.getAttribute("href");
  if (["#top", "#work", "#hero-title"].includes(hash)) continue;
  link.addEventListener("click", (e) => {
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    history.pushState(null, "", hash);
    if (target instanceof HTMLDetailsElement) target.open = true;
    const heading = target.querySelector("h2") || target;
    heading.tabIndex = -1;
    target.scrollIntoView({ behavior: motion.matches ? "instant" : "smooth" });
    clearTimeout(anchorFocusTimer);
    anchorFocusTimer = setTimeout(
      () => heading.focus({ preventScroll: true }),
      motion.matches ? 0 : 850,
    );
  });
}

document.addEventListener(
  "click",
  (e) => {
    if (e.target.closest("a,button")) clearTimeout(anchorFocusTimer);
  },
  { capture: true },
);
