import { sceneProgress, tearPoseAt } from "./tear-state.js";
export function mountTearScene(root, { reducedMotion = false } = {}) {
  const paperEdge = new URL("./assets/paper/cream-paper.webp", document.baseURI)
    .href;
  const hero = root.querySelector("[data-hero-pane]"),
    work = root.querySelector("[data-work-pane]"),
    bottle = root.querySelector("[data-bottle-scroll]"),
    heading = work.querySelector("h2"),
    heroActions = hero.querySelector(".hero-bottom"),
    bottleHit = hero.querySelector(".bottle-hit"),
    abort = new AbortController();
  let raf = 0,
    start = 0,
    travel = 0,
    wasWork = false,
    wantsHeroFocus = false;
  function geometry() {
    start = root.getBoundingClientRect().top + scrollY;
    travel =
      root.offsetHeight - root.querySelector(".scene-stage").offsetHeight;
  }
  function render() {
    raf = 0;
    const p = sceneProgress(scrollY, start, travel),
      pose = tearPoseAt(p);
    root.dataset.progress = p.toFixed(4);
    root.dataset.paperStep = pose.paperStep;
    const paperEdgePx = (pose.edge / 100) * hero.offsetHeight;
    hero.style.maskRepeat = "no-repeat";
    hero.style.maskComposite = "add";
    if (p === 0) {
      hero.style.maskImage = "none";
      hero.style.maskSize = "";
      hero.style.maskPosition = "";
    } else if (p === 1) {
      hero.style.maskImage = "linear-gradient(transparent,transparent)";
      hero.style.maskSize = "100% 100%";
      hero.style.maskPosition = "0 0";
    } else {
      hero.style.maskImage = `linear-gradient(#000,#000), url("${paperEdge}")`;
      hero.style.maskSize = `100% ${Math.max(0, paperEdgePx - 30)}px, calc(100% + 80px) 160px`;
      hero.style.maskPosition = `left top, center ${paperEdgePx - 137}px`;
    }
    bottle.style.visibility = pose.bottleVisible ? "visible" : "hidden";
    bottle.style.transform = `translateY(${pose.bottleY}px) rotate(${pose.bottleRotation}deg)`;
    work.style.transform = `translateY(${pose.workY}%)`;
    const revealed = pose.paperStep >= 10;
    const edgePx = ((pose.edge - 0.8) / 100) * hero.offsetHeight;
    const actionsCovered =
      heroActions.offsetTop + heroActions.offsetHeight > edgePx;
    if (
      actionsCovered &&
      heroActions.contains(document.activeElement) &&
      !revealed
    )
      hero.querySelector(".brand").focus({ preventScroll: true });
    heroActions.inert = actionsCovered;
    const hitCovered = bottleHit.offsetTop + bottleHit.offsetHeight > edgePx;
    if (hitCovered && document.activeElement === bottleHit && !revealed)
      hero.querySelector(".brand").focus({ preventScroll: true });
    bottleHit.tabIndex = hitCovered ? -1 : 0;
    if (wantsHeroFocus && p < 0.1) {
      wantsHeroFocus = false;
      hero.querySelector(".brand").focus({ preventScroll: true });
    }
    hero.inert = revealed;
    hero.setAttribute("aria-hidden", String(revealed));
    if (revealed !== wasWork) {
      if (!revealed && work.contains(document.activeElement)) {
        const target = hero.querySelector(".brand");
        target.focus({ preventScroll: true });
      }
      if (revealed && hero.contains(document.activeElement))
        heading.focus({ preventScroll: true });
      wasWork = revealed;
    }
  }
  function queue() {
    if (!raf) raf = requestAnimationFrame(render);
  }
  function openWork({ focus = true } = {}) {
    if (reducedMotion) {
      work.scrollIntoView();
      if (focus) heading.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: start + travel, behavior: "instant" });
      render();
      if (focus) heading.focus({ preventScroll: true });
    }
    history.replaceState(null, "", "#work");
  }
  if (!reducedMotion) {
    document.documentElement.classList.add("enhanced");
    geometry();
    render();
    window.addEventListener("scroll", queue, {
      passive: true,
      signal: abort.signal,
    });
    window.addEventListener(
      "resize",
      () => {
        geometry();
        render();
      },
      { signal: abort.signal },
    );
  }
  // The work is the next section in the document, including for assistive
  // navigation. Entering it by keyboard reveals the visual scene immediately.
  work.addEventListener(
    "focusin",
    () => {
      if (!reducedMotion && !wasWork) {
        window.scrollTo({ top: start + travel, behavior: "instant" });
        render();
      }
    },
    { signal: abort.signal },
  );
  for (const link of document.querySelectorAll("[data-work-link]"))
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        openWork();
      },
      { signal: abort.signal },
    );
  for (const link of document.querySelectorAll('a[href="#top"]'))
    link.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        history.replaceState(null, "", "#top");
        if (reducedMotion) {
          window.scrollTo({ top: root.offsetTop, behavior: "instant" });
          hero.querySelector(".brand").focus({ preventScroll: true });
        } else {
          wantsHeroFocus = true;
          window.scrollTo({ top: start, behavior: "smooth" });
          queue();
        }
      },
      { signal: abort.signal },
    );
  function restoreHash() {
    if (location.hash === "#work") openWork({ focus: false });
    else if (["#top", "#hero-title", "#main", ""].includes(location.hash)) {
      window.scrollTo({
        top: reducedMotion ? root.offsetTop : start,
        behavior: "instant",
      });
      if (!reducedMotion) render();
    }
  }
  const onHash = () => requestAnimationFrame(restoreHash);
  window.addEventListener("hashchange", onHash, { signal: abort.signal });
  window.addEventListener("popstate", onHash, { signal: abort.signal });
  if (location.hash) requestAnimationFrame(restoreHash);
  return {
    openWork,
    destroy() {
      abort.abort();
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("enhanced");
      hero.inert = false;
      heroActions.inert = false;
      bottleHit.tabIndex = 0;
      work.inert = false;
      hero.removeAttribute("aria-hidden");
      work.removeAttribute("aria-hidden");
      hero.style.clipPath = "";
      for (const property of [
        "maskImage",
        "maskSize",
        "maskPosition",
        "maskRepeat",
        "maskComposite",
      ])
        hero.style[property] = "";
      bottle.style.visibility = "";
      work.style.transform = "";
      bottle.style.transform = "";
    },
  };
}
