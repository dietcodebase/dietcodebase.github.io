import { mountPour } from "./pour.js";
import { sceneProgress } from "./tear-state.js";
export function mountTearScene(root, { reducedMotion = false, bottleController } = {}) {
  const hero = root.querySelector("[data-hero-pane]"),
    work = root.querySelector("[data-work-pane]"),
    bottle = root.querySelector("[data-bottle-scroll]"),
    heading = work.querySelector("h2"),
    heroActions = hero.querySelector(".hero-bottom"),
    bottleHit = hero.querySelector(".bottle-hit"),
    abort = new AbortController();
  const pour = reducedMotion ? null : mountPour(hero, bottle, bottleController);
  const support=[work.querySelector('.section-meta'),work.querySelector('.work-heading > p'),work.querySelector('.wardrobe-plate'),work.querySelector('.work-intro-foot')];
  support.forEach(el=>el.setAttribute('data-work-support',''));
  let movingFocus=false;
  let raf = 0,
    start = 0,
    travel = 0,
    wasWork = false,
    wantsHeroFocus = false,
    metrics,previousProgress=null,covered=null,needsMeasure=false,destroyed=false;
  function geometry() {
    start = root.getBoundingClientRect().top + scrollY;
    travel =
      root.offsetHeight - root.querySelector(".scene-stage").offsetHeight;
    const priorTitle=heading.style.transform;heading.style.transform='none';
    const titleBox=heading.getBoundingClientRect(),workBox=work.getBoundingClientRect();
    const titleShift=hero.offsetHeight*.52-titleBox.height/2-(titleBox.top-workBox.top);
    heading.style.transform=priorTitle;
    metrics={titleShift,height:hero.offsetHeight,header:hero.querySelector('.site-header').offsetHeight,
      actionsBottom:heroActions.offsetTop+heroActions.offsetHeight,hitBottom:bottleHit.offsetTop+bottleHit.offsetHeight};
    pour.measure();previousProgress=null;
  }
  function render() {
    raf = 0;
    if(destroyed)return;
    if(needsMeasure){needsMeasure=false;geometry();}
    const p = sceneProgress(scrollY, start, travel);
    if(p===previousProgress&&!wantsHeroFocus)return;
    previousProgress=p;
    root.dataset.progress = p.toFixed(4);
    root.dataset.paperStep = Math.floor(p*11);
    const liquid = pour.render(p);
    work.style.transform = "none";
    work.style.clipPath=`inset(${liquid.contentInset}px 0 0)`;
    work.style.setProperty('--work-details',liquid.details);
    heading.style.transform=`translateY(${metrics.titleShift*(1-liquid.title)}px)`;
    const ready=liquid.details===1;
    if(work.dataset.supportReady!==String(ready))work.dataset.supportReady=String(ready);
    const revealed = liquid.fill >= 1 - metrics.header / metrics.height;
    const edgePx = p < .18 ? metrics.height : 0;
    const actionsCovered =
      metrics.actionsBottom > edgePx;
    if (
      actionsCovered &&
      heroActions.contains(document.activeElement) &&
      !revealed
    )
      hero.querySelector(".brand").focus({ preventScroll: true });
    if(covered!==actionsCovered){heroActions.inert = actionsCovered;covered=actionsCovered;}
    const hitCovered = metrics.hitBottom > edgePx;
    if (hitCovered && document.activeElement === bottleHit && !revealed)
      hero.querySelector(".brand").focus({ preventScroll: true });
    if(bottleHit.tabIndex!==(hitCovered?-1:0))bottleHit.tabIndex=hitCovered?-1:0;
    if (wantsHeroFocus && p < 0.1) {
      wantsHeroFocus = false;
      hero.querySelector(".brand").focus({ preventScroll: true });
    }
    if(hero.inert!==revealed)hero.inert = revealed;
    if(hero.getAttribute("aria-hidden")!==String(revealed))hero.setAttribute("aria-hidden", String(revealed));
    if (revealed !== wasWork) {
      if (!revealed && work.contains(document.activeElement)) {
        const target = hero.querySelector(".brand");
        target.focus({ preventScroll: true });
      }
      if (revealed && hero.contains(document.activeElement)){
        movingFocus=true;heading.focus({ preventScroll: true });movingFocus=false;
      }
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
        needsMeasure=true;
        queue();
      },
      { signal: abort.signal },
    );
  }
  // The work is the next section in the document, including for assistive
  // navigation. Entering it by keyboard reveals the visual scene immediately.
  work.addEventListener(
    "focusin",
    () => {
      if (!reducedMotion && !movingFocus && sceneProgress(scrollY,start,travel)<1) {
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
    if(destroyed)return;
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
  document.fonts.ready.then(()=>{if(!destroyed&&!reducedMotion){needsMeasure=true;queue();}});
  return {
    openWork,
    destroy() {
      destroyed=true;
      abort.abort();
      pour?.destroy();
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
      work.style.clipPath = "";
      work.style.removeProperty('--work-details');
      delete work.dataset.supportReady;
      heading.style.transform='';
      support.forEach(el=>el.removeAttribute('data-work-support'));
      bottle.style.transform = "";
    },
  };
}
