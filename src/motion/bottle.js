import { transitionBottle, steppedProgress, dragPose, scrollCapPose } from "./bottle-state.js";
export function mountBottle(root, { reducedMotion = false } = {}) {
  const cap = root.querySelector("[data-cap]"),
    art = root.querySelector("[data-bottle-art]"),
    local = root.querySelector("[data-bottle-local]"),
    hit = root.querySelector(".bottle-hit"),
    fizz = root.querySelector(".fizz");
  const triggers = [...document.querySelectorAll("[data-cap-trigger]")],
    abort = new AbortController(),
    opts = { signal: abort.signal };
  const firstMount = !root.dataset.bottleMounted;
  root.dataset.bottleMounted = "true";
  let state = ["popping", "resetting", "open"].includes(root.dataset.capState)
      ? "open"
      : "closed",
    scrollOwned = false,
    lastScrollProgress = null,
    lastAnnouncedState = null,
    scrollRest = {x:0,y:0,r:0},
    scrollRestState = "closed",
    raf = 0,
    job = null,
    entrance = reducedMotion || !firstMount ? null : performance.now(),
    hiddenAt = 0,
    drag = null,
    suppressUntil = 0,
    hover = false,
    settle = null;
  const openPose = { x: -50, y: -70, r: -55 };
  let pose = { x: 0, y: 0, r: 0 };
  function setState(next) {
    if(lastAnnouncedState===next)return;
    lastAnnouncedState=next;
    state = next;
    cap.style.opacity = next === "open" ? "0" : "1";
    root.dataset.capState = state;
    for (const el of triggers) {
      el.setAttribute(
        "aria-label",
        state === "open"
          ? "Replay the bottle cap pop"
          : "Pop the Diet Code bottle cap",
      );
      if (!el.classList.contains("bottle-hit"))
        el.innerHTML = `${state === "open" ? "Pop it again" : "Pop the cap"} <span aria-hidden="true">↗</span>`;
      el.setAttribute(
        "aria-busy",
        String(state === "popping" || state === "resetting"),
      );
    }
  }
  function drawCap(p) {
    pose = p;
    cap.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.r}deg)`;
  }
  function schedule() {
    if (!scrollOwned && !raf && !document.hidden) raf = requestAnimationFrame(tick);
  }
  function launch(next) {
    setState(next);
    job = {
      start: performance.now(),
      duration: next === "resetting" ? 200 : 1000,
      from: { ...pose },
    };
    schedule();
  }
  function activate() {
    if (scrollOwned || performance.now() < suppressUntil) return;
    const next = transitionBottle(state, "activate");
    if (next === state) return;
    if (reducedMotion) {
      setState("open");
      drawCap(openPose);
      return;
    }
    launch(next);
  }
  function tick(now) {
    raf = 0;
    let active = false;
    if (job) {
      const t = steppedProgress(now - job.start, job.duration);
      if (state === "resetting") {
        drawCap({
          x: job.from.x * (1 - t),
          y: job.from.y * (1 - t),
          r: job.from.r * (1 - t),
        });
      } else {
        let p;
        if (t < 0.2) {
          p = { x: 0, y: 7 * (t / 0.2), r: -3 * (t / 0.2) };
        } else if (t < 0.65) {
          const f = (t - 0.2) / 0.45;
          p = { x: -70 * f, y: 7 - 137 * f, r: -95 * f };
        } else {
          const f = (t - 0.65) / 0.35;
          p = { x: -70 + 20 * f, y: -130 + 60 * f, r: -95 + 40 * f };
        }
        drawCap(p);
        fizz.style.opacity = t >= 0.2 && t < 0.5 ? "1" : "0";
        cap.style.opacity = String(1-Math.max(0,(t-.65)/.35));
      }
      if (t === 1) {
        const next = transitionBottle(state, "animationEnd");
        job = null;
        if (next === "popping") launch(next);
        else {
          setState(next);
          fizz.style.opacity = "0";
          drawCap(openPose);
        }
      } else active = true;
    }
    let dx = 0,
      rot = 0,
      dy = 0;
    if (entrance !== null) {
      const t = steppedProgress(now - entrance, 800);
      dy = (1 - t) * 42;
      rot = (1 - t) * -5;
      if (t === 1) entrance = null;
      else active = true;
    }
    if (drag) {
      const p = dragPose(drag.delta);
      dx = p.x;
      rot += p.rotation;
    } else if (settle) {
      const t = steppedProgress(now - settle.start, 600);
      dx = settle.x * (1 - t);
      rot += settle.r * (1 - t);
      if (t === 1) settle = null;
      else active = true;
    } else if (hover && !reducedMotion) {
      dy -= 4;
      rot += 1.2;
    }
    // Local canvas axes rotate with the bottle, and never touch the scroll-owned layer.
    local.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg)`;
    art.style.filter = `drop-shadow(${hover ? 8 : 6}px ${hover ? 13 : 10}px 2px #0e0e1026)`;
    if (active) schedule();
  }
  for (const t of triggers) {
    t.hidden = false;
    t.disabled = false;
    t.addEventListener("click", activate, opts);
  }
  hit.tabIndex = 0;
  hit.addEventListener(
    "pointerenter",
    (e) => {
      if (!scrollOwned && e.pointerType === "mouse") {
        hover = true;
        schedule();
      }
    },
    opts,
  );
  hit.addEventListener(
    "pointerleave",
    () => {
      hover = false;
      schedule();
    },
    opts,
  );
  hit.addEventListener(
    "pointerdown",
    (e) => {
      if (
        scrollOwned ||
        reducedMotion ||
        e.pointerType !== "mouse" ||
        e.button !== 0 ||
        !matchMedia("(pointer:fine)").matches
      )
        return;
      drag = { id: e.pointerId, start: e.clientX, delta: 0 };
      settle = null;
      hit.setPointerCapture(e.pointerId);
    },
    opts,
  );
  hit.addEventListener(
    "pointermove",
    (e) => {
      if (!scrollOwned && drag && drag.id === e.pointerId) {
        drag.delta = e.clientX - drag.start;
        schedule();
      }
    },
    opts,
  );
  function endDrag(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const p = dragPose(drag.delta);
    if (Math.abs(drag.delta) > 8 || e.type === "pointercancel")
      suppressUntil = performance.now() + 350;
    settle = { x: p.x, r: p.rotation, start: performance.now() };
    drag = null;
    if (hit.hasPointerCapture(e.pointerId))
      hit.releasePointerCapture(e.pointerId);
    schedule();
  }
  hit.addEventListener("pointerup", endDrag, opts);
  hit.addEventListener("pointercancel", endDrag, opts);
  hit.addEventListener(
    "lostpointercapture",
    (e) => {
      if (drag) endDrag(e);
    },
    opts,
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        hiddenAt = performance.now();
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        const delta = performance.now() - hiddenAt;
        if (job) job.start += delta;
        if (entrance !== null) entrance += delta;
        if (settle) settle.start += delta;
        schedule();
      }
    },
    opts,
  );
  fizz.style.opacity = "0";
  local.style.transform = "translate(0px,0px) rotate(0deg)";
  setState(state);
  drawCap(state === "open" ? openPose : { x: 0, y: 0, r: 0 });
  schedule();
  return {
    replay: activate,
    setScrollProgress(progress, owned) {
      if (!owned && !scrollOwned) return;
      if(owned===scrollOwned&&progress===lastScrollProgress)return;
      lastScrollProgress=progress;
      if (owned && !scrollOwned) { scrollRest={...pose}; scrollRestState=state === "closed" ? "closed" : "open"; }
      if(owned&&!scrollOwned){
        hover=false;
        const previousDrag=drag;drag=null;
        if(previousDrag&&hit.hasPointerCapture(previousDrag.id))hit.releasePointerCapture(previousDrag.id);
      }
      scrollOwned = owned;
      job = null; entrance = null; settle = null;
      cancelAnimationFrame(raf); raf = 0;
      local.style.transform = "none";
      fizz.style.opacity = "0";
      drawCap(scrollCapPose(progress,scrollRest));
      setState(progress > 0 ? "open" : scrollRestState);
      cap.style.opacity = scrollRestState === "open" ? "0" : String(1-Math.max(0,Math.min(1,(progress-.55)/.4)));
    },
    reset() {
      job = null;
      fizz.style.opacity = "0";
      setState("closed");
      drawCap({ x: 0, y: 0, r: 0 });
    },
    destroy() {
      abort.abort();
      cancelAnimationFrame(raf);
      if (drag && hit.hasPointerCapture(drag.id))
        hit.releasePointerCapture(drag.id);
    },
  };
}
