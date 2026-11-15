import test from "node:test";
import assert from "node:assert/strict";
import { sceneProgress, tearPoseAt } from "../src/motion/tear-state.js";
test("scene progress handles boundaries, offset and zero travel", () => {
  assert.equal(sceneProgress(0, 100, 500), 0);
  assert.equal(sceneProgress(350, 100, 500), 0.5);
  assert.equal(sceneProgress(1000, 100, 500), 1);
  assert.equal(sceneProgress(0, 0, 0), 1);
  assert.equal(sceneProgress(0, 0, -10), 1);
});
test("forward, reverse and mixed sampling produce identical poses at equal position", () => {
  const ps = [0, 0.25, 0.5, 0.75, 1],
    expected = new Map(ps.map((p) => [p, tearPoseAt(p)]));
  for (const sequence of [
    ps,
    [...ps].reverse(),
    [0.5, 1, 0.25, 0.75, 0, 0.5, 0.25],
  ])
    for (const p of sequence) assert.deepEqual(tearPoseAt(p), expected.get(p));
  assert.deepEqual(tearPoseAt(-1), tearPoseAt(0));
  assert.deepEqual(tearPoseAt(2), tearPoseAt(1));
});
test("paper is quantized while terminal hero is fully removed", () => {
  assert.equal(tearPoseAt(0).paperStep, 0);
  assert.equal(tearPoseAt(1).paperStep, 11);
  assert.equal(tearPoseAt(1).edge, -8);
  assert.ok(tearPoseAt(0.75).bottleY < tearPoseAt(0.25).bottleY);
});

test("late paper poses clear the entire bottle and restore it on reversal", () => {
  assert.equal(tearPoseAt(0.8).bottleVisible, false);
  assert.equal(tearPoseAt(0.5).bottleVisible, true);
  assert.equal(tearPoseAt(1).bottleVisible, false);
  assert.equal(tearPoseAt(0).bottleVisible, true);
});
