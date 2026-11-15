export function mountProjectTabs(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')],
    panels = tabs.map((t) =>
      document.getElementById(t.getAttribute("aria-controls")),
    ),
    abort = new AbortController();
  const compact = matchMedia("(max-width:560px)");
  const syncOrientation = () =>
    root
      .querySelector('[role="tablist"]')
      .setAttribute(
        "aria-orientation",
        compact.matches ? "horizontal" : "vertical",
      );
  syncOrientation();
  compact.addEventListener("change", syncOrientation, { signal: abort.signal });
  function select(index, { focus = false } = {}) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index), {
      signal: abort.signal,
    });
    tab.addEventListener(
      "keydown",
      (e) => {
        let next;
        if (e.key === "ArrowDown" || e.key === "ArrowRight")
          next = (index + 1) % tabs.length;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft")
          next = (index + tabs.length - 1) % tabs.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = tabs.length - 1;
        if (next !== undefined) {
          e.preventDefault();
          select(next, { focus: true });
        }
      },
      { signal: abort.signal },
    );
  });
  return {
    select,
    destroy() {
      abort.abort();
    },
  };
}
