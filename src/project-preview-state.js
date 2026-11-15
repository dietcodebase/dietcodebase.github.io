export const GARMENTS = Object.freeze({
  olive: {
    name: "Olive chore jacket",
    slot: "outer",
    asset: "olive-chore-jacket.jpg",
  },
  indigo: {
    name: "Indigo yukata jacket",
    slot: "outer",
    asset: "indigo-yukata-jacket.jpg",
  },
  cream: { name: "Cream tee", slot: "top", asset: "cream-tee.jpg" },
  linen: {
    name: "White linen guayabera",
    slot: "top",
    asset: "white-guayabera.jpg",
  },
  jeans: {
    name: "Straight jeans",
    slot: "bottom",
    asset: "straight-jeans.jpg",
  },
  sneakers: {
    name: "White sneakers",
    slot: "shoes",
    asset: "white-sneakers.jpg",
  },
});
export const STARTERS = Object.freeze(["olive", "indigo", "cream", "linen"]);
export const SLOTS = Object.freeze(["outer", "top", "bottom", "shoes"]);
export const EXAMPLE_LOOK = Object.freeze({
  outer: "indigo",
  top: "linen",
  bottom: "jeans",
  shoes: "sneakers",
});
function valid(outfit) {
  return (
    !!outfit &&
    typeof outfit === "object" &&
    ["olive", "indigo"].includes(outfit.outer) &&
    ["cream", "linen"].includes(outfit.top) &&
    outfit.bottom === "jeans" &&
    outfit.shoes === "sneakers"
  );
}
export function initialPreview(saved = null) {
  return {
    started: false,
    locked: null,
    outfit: {
      outer: "olive",
      top: "cream",
      bottom: "jeans",
      shoes: "sneakers",
    },
    saved: valid(saved) ? { ...saved } : null,
  };
}
export function reducePreview(state, event) {
  if (event.type === "reset") return initialPreview();
  if (event.type === "start" && STARTERS.includes(event.id)) {
    const slot = GARMENTS[event.id].slot;
    return {
      ...state,
      started: true,
      locked: slot,
      outfit: { ...state.outfit, [slot]: event.id },
    };
  }
  if (event.type === "vary" && state.started) {
    return {
      ...state,
      outfit: {
        ...state.outfit,
        outer:
          state.locked === "outer"
            ? state.outfit.outer
            : state.outfit.outer === "olive"
              ? "indigo"
              : "olive",
        top:
          state.locked === "top"
            ? state.outfit.top
            : state.outfit.top === "cream"
              ? "linen"
              : "cream",
      },
    };
  }
  if (event.type === "save" && state.started)
    return { ...state, saved: { ...state.outfit } };
  return state;
}
export function restorePreview(serialized) {
  try {
    const data = JSON.parse(serialized);
    return data?.v === 1 && valid(data.saved)
      ? Object.fromEntries(SLOTS.map((slot) => [slot, data.saved[slot]]))
      : null;
  } catch {
    return null;
  }
}
