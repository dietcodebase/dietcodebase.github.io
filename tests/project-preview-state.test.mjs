import test from "node:test";
import assert from "node:assert/strict";
import {
  initialPreview,
  reducePreview,
  restorePreview,
} from "../src/project-preview-state.js";
test("a chosen owned piece locks its slot", () => {
  const s = reducePreview(initialPreview(), { type: "start", id: "indigo" });
  assert.equal(s.locked, "outer");
  assert.equal(s.outfit.outer, "indigo");
  assert.equal(s.started, true);
});
test("trying an alternative preserves the anchor and changes the other variable slot", () => {
  const s = reducePreview(initialPreview(), { type: "start", id: "cream" });
  const next = reducePreview(s, { type: "vary" });
  assert.equal(next.outfit.top, "cream");
  assert.notEqual(next.outfit.outer, s.outfit.outer);
  assert.deepEqual(reducePreview(next, { type: "vary" }).outfit, s.outfit);
});
test("unknown pieces or early variations cannot mutate a preview", () => {
  const s = initialPreview();
  assert.equal(reducePreview(s, { type: "start", id: "<script>" }), s);
  assert.equal(reducePreview(s, { type: "vary" }), s);
  assert.equal(reducePreview(s, { type: "save" }), s);
});
test("saving makes an independent snapshot that later exploration does not alter", () => {
  let s = reducePreview(initialPreview(), { type: "start", id: "olive" });
  s = reducePreview(s, { type: "save" });
  const snapshot = { ...s.saved };
  s = reducePreview(s, { type: "vary" });
  assert.deepEqual(s.saved, snapshot);
  assert.notDeepEqual(s.outfit, s.saved);
});
test("only valid source pieces restore from persistence", () => {
  assert.equal(restorePreview("{bad"), null);
  assert.equal(
    restorePreview(
      JSON.stringify({
        v: 1,
        saved: {
          outer: "unknown",
          top: "cream",
          bottom: "jeans",
          shoes: "sneakers",
        },
      }),
    ),
    null,
  );
  const saved = {
    outer: "indigo",
    top: "linen",
    bottom: "jeans",
    shoes: "sneakers",
  };
  assert.deepEqual(restorePreview(JSON.stringify({ v: 1, saved })), saved);
  assert.deepEqual(initialPreview(saved).saved, saved);
});
test("reset removes only preview state", () => {
  const s = reducePreview(
    reducePreview(initialPreview(), { type: "start", id: "linen" }),
    { type: "save" },
  );
  assert.deepEqual(reducePreview(s, { type: "reset" }), initialPreview());
});
