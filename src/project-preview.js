import {
  GARMENTS,
  STARTERS,
  SLOTS,
  EXAMPLE_LOOK,
  initialPreview,
  reducePreview,
  restorePreview,
} from "./project-preview-state.js";
const STORAGE_KEY = "dietcode.ootd-preview.v1";
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function photograph(id, decorative = false) {
  const item = GARMENTS[id],
    image = element("img");
  image.src = new URL(`./assets/ootd/${item.asset}`, document.baseURI).href;
  image.alt = decorative ? "" : item.name;
  image.width = 720;
  image.height = 900;
  image.loading = "lazy";
  image.draggable = false;
  return image;
}
function action(label, type, secondary = false) {
  const button = element(
    "button",
    `preview-action${secondary ? " preview-secondary" : ""}`,
    label,
  );
  button.type = "button";
  button.dataset.previewAction = type;
  return button;
}
function label(kicker, title, index) {
  const node = element("div", "outfit-label saved-look-label");
  const text = element("span");
  text.append(element("small", null, kicker), element("strong", null, title));
  node.append(text, element("span", null, index));
  return node;
}
export function mountProjectPreview(root, { selectTab }) {
  let storageWorks = true,
    saved = null;
  try {
    saved = restorePreview(localStorage.getItem(STORAGE_KEY));
  } catch {
    storageWorks = false;
  }
  let state = initialPreview(saved);
  const abort = new AbortController();
  const panels = [...root.querySelectorAll(".feature-panel")],
    visuals = panels.map((p) => p.querySelector(".feature-visual"));
  const controls = panels.map((p, index) => {
    if (index === 0) return null;
    const node = element("div", "preview-controls");
    p.querySelector(".feature-copy").append(node);
    return node;
  });
  const note = element(
    "p",
    "preview-note",
    "Try the idea with OOTD’s example wardrobe.",
  );
  root.querySelector(".project-tabs").before(note);
  const live = element("p", "preview-live");
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");
  root.append(live);
  const looksSummary = panels[2].querySelector(".feature-copy p");
  const originalLooksSummary = looksSummary.textContent;
  root.dataset.previewReady = "true";
  visuals.forEach((v) => v.classList.add("preview-enabled", "outfit-visual"));
  function openStep(index) {
    selectTab(index);
    panels[index].scrollIntoView({ block: "start", behavior: "instant" });
    panels[index].focus({ preventScroll: true });
  }
  function store() {
    try {
      if (state.saved)
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ v: 1, saved: state.saved }),
        );
      else localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }
  function renderGallery() {
    const grid = element("div", "preview-pieces");
    for (const id of STARTERS) {
      const item = GARMENTS[id],
        button = element("button", "preview-piece");
      button.type = "button";
      button.dataset.previewAction = "start";
      button.dataset.piece = id;
      button.setAttribute("aria-label", `Build a look around ${item.name}`);
      const chosen =
        state.started &&
        state.locked === item.slot &&
        state.outfit[item.slot] === id;
      button.classList.toggle("is-chosen", chosen);
      button.append(
        photograph(id, true),
        element("strong", "preview-piece-name", item.name),
        element(
          "span",
          "preview-piece-hint",
          chosen ? "Your starting piece" : "Build around this",
        ),
      );
      grid.append(button);
    }
    visuals[0].replaceChildren(
      label("EXAMPLE WARDROBE", "Pick a starting piece.", "01"),
      grid,
    );
  }
  function renderOutfit(
    visual,
    outfit,
    { kicker, title, index, locked = null, motion = "" } = {},
  ) {
    const grid = element("div", "outfit-assembly preview-outfit");
    for (const slot of SLOTS) {
      const id = outfit[slot],
        figure = element(
          "figure",
          locked === slot
            ? "preview-locked"
            : motion &&
                (motion !== "vary" || (slot !== "bottom" && slot !== "shoes"))
              ? "preview-dealt"
              : "",
        );
      figure.dataset.previewSlot = slot;
      figure.dataset.piece = id;
      figure.style.setProperty("--piece-order", SLOTS.indexOf(slot));
      const caption = element("figcaption", null, GARMENTS[id].name);
      if (locked === slot)
        caption.append(element("strong", "preview-lock-label", "KEPT"));
      figure.append(photograph(id), caption);
      grid.append(figure);
    }
    visual.replaceChildren(label(kicker, title, index), grid);
  }
  function render(reason = "") {
    root.dataset.previewStarted = String(state.started);
    root.dataset.previewSaved = String(!!state.saved);
    root.dataset.previewLocked = state.locked || "";
    renderGallery();
    renderOutfit(visuals[1], state.outfit, {
      kicker: state.started
        ? "YOUR STARTING PIECE STAYS"
        : "ONE POSSIBLE COMBINATION",
      title: state.started
        ? GARMENTS[state.outfit[state.locked]].name
        : "A look from what’s here.",
      index: "02",
      locked: state.locked,
      motion: reason === "vary" || reason === "start" ? reason : "",
    });
    if (state.started) {
      const row = element("div", "preview-action-row");
      row.append(
        action("Try another combination", "vary", true),
        action("Keep this look", "save"),
      );
      controls[1].replaceChildren(
        row,
        element(
          "p",
          "preview-scope",
          "An idea study using example pieces. Your chosen piece stays in the look.",
        ),
        Object.assign(action("Change starting piece", "choose", true), {
          className: "preview-text-action",
        }),
      );
    } else
      controls[1].replaceChildren(action("Choose a starting piece", "choose"));
    visuals[1].append(controls[1]);
    const hasSaved = !!state.saved;
    renderOutfit(visuals[2], state.saved || EXAMPLE_LOOK, {
      kicker: hasSaved
        ? storageWorks
          ? "KEPT IN THIS PREVIEW"
          : "KEPT FOR THIS VISIT"
        : "FROM OOTD’S EXAMPLE WARDROBE",
      title: hasSaved ? "Your preview look" : "Indigo travel layers",
      index: "03",
      motion: reason === "save" ? "save" : "",
    });
    looksSummary.textContent = hasSaved
      ? "You kept this combination in the preview. Try a different starting piece to explore another look."
      : originalLooksSummary;
    const row = element("div", "preview-action-row");
    row.append(
      action(
        hasSaved ? "Try a different piece" : "Build your own example",
        "choose",
      ),
    );
    if (state.started || hasSaved)
      row.append(action("Reset preview", "reset", true));
    controls[2].replaceChildren(
      row,
      element(
        "p",
        "preview-scope",
        hasSaved
          ? "Only the example look is kept here. This preview is separate from the iOS app."
          : "This saved combination is part of the app’s bundled example wardrobe.",
      ),
    );
    visuals[2].append(controls[2]);
  }
  root.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest("[data-preview-action]");
      if (!button || !root.contains(button)) return;
      const type = button.dataset.previewAction;
      if (type === "choose") {
        openStep(0);
        return;
      }
      const next = reducePreview(state, { type, id: button.dataset.piece });
      if (next === state) return;
      state = next;
      if (type === "save" || type === "reset") storageWorks = store();
      render(type);
      if (type === "start") {
        live.textContent = `${GARMENTS[state.outfit[state.locked]].name} is kept. Try another combination or keep this look.`;
        openStep(1);
      } else if (type === "save") {
        live.textContent = storageWorks
          ? "Look kept in this preview."
          : "Look kept for this visit.";
        openStep(2);
      } else if (type === "reset") {
        live.textContent = "The example preview has been reset.";
        openStep(0);
      } else {
        live.textContent = `${GARMENTS[state.outfit[state.locked]].name} stays. Now paired with ${GARMENTS[state.outfit[state.locked === "outer" ? "top" : "outer"]].name}.`;
        controls[1]
          .querySelector('[data-preview-action="vary"]')
          .focus({ preventScroll: true });
      }
    },
    { signal: abort.signal },
  );
  render();
  return {
    destroy() {
      abort.abort();
    },
  };
}
