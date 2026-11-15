/** Keep the mobile menu outside the scroll scene's clipping context. */
export function mountNavigation(toggle, nav) {
  const header = toggle.parentElement;
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const layer = document.createElement("div");
  layer.className = "menu-layer";
  layer.setAttribute("role", "dialog");
  layer.setAttribute("aria-modal", "true");
  layer.setAttribute("aria-label", "Site navigation");
  layer.hidden = true;
  document.body.append(layer);
  toggle.hidden = false;
  function close({ focus = false } = {}) {
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    document.querySelector(".skip-link").inert = false;
    main.inert = false;
    footer.inert = false;
    if (layer.contains(toggle)) {
      header.insertBefore(toggle, header.querySelector(".header-note"));
      header.insertBefore(nav, header.querySelector(".header-note"));
    }
    layer.hidden = true;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = 'Menu <span aria-hidden="true">＋</span>';
    document.body.style.overflow = "";
    if (focus && wasOpen) toggle.focus({ preventScroll: true });
  }
  function open() {
    layer.append(toggle, nav);
    layer.hidden = false;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.innerHTML = 'Close <span aria-hidden="true">×</span>';
    document.querySelector(".skip-link").inert = true;
    main.inert = true;
    footer.inert = true;
    document.body.style.overflow = "hidden";
    toggle.focus({ preventScroll: true });
  }
  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") close({ focus: true });
    else open();
  });
  nav.addEventListener(
    "click",
    (e) => {
      if (e.target.closest("a")) close();
    },
    { capture: true },
  );
  document.addEventListener("keydown", (e) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (e.key === "Escape") {
      close({ focus: true });
      return;
    }
    if (e.key === "Tab") {
      const items = [toggle, ...nav.querySelectorAll("a")];
      if (e.shiftKey && document.activeElement === items[0]) {
        e.preventDefault();
        items.at(-1).focus();
      } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
        e.preventDefault();
        items[0].focus();
      }
    }
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 560) close();
  });
  window.addEventListener("hashchange", () => close());
  window.addEventListener("popstate", () => close());
  return { close };
}
