import test from "node:test";
import assert from "node:assert/strict";
import {
  transitionBottle,
  steppedProgress,
  dragPose,
} from "../src/motion/bottle-state.js";
test("pop lifecycle ignores duplicates and replay reseats first", () => {
  let s = "closed";
  s = transitionBottle(s, "activate");
  assert.equal(s, "popping");
  assert.equal(transitionBottle(s, "activate"), "popping");
  s = transitionBottle(s, "animationEnd");
  assert.equal(s, "open");
  s = transitionBottle(s, "activate");
  assert.equal(s, "resetting");
  assert.equal(transitionBottle(s, "activate"), "resetting");
  assert.equal(transitionBottle(s, "animationEnd"), "popping");
});
test("authored ten poses per second clamps time and lands exactly", () => {
  assert.equal(steppedProgress(-100, 950), 0);
  assert.equal(steppedProgress(49, 1000), 0);
  assert.equal(steppedProgress(151, 1000), 0.1);
  assert.equal(steppedProgress(950, 950), 1);
  assert.equal(steppedProgress(5000, 950), 1);
  assert.equal(steppedProgress(10, 0), 1);
});
test("drag is bounded and cancellation can return to neutral", () => {
  assert.deepEqual(dragPose(1000), { x: 36, rotation: 6 });
  assert.deepEqual(dragPose(-1000), { x: -36, rotation: -6 });
  assert.deepEqual(dragPose(0), { x: 0, rotation: 0 });
});
test('scroll cap continues from a manually opened pose without reseating',async()=>{
 const {scrollCapPose}=await import('../src/motion/bottle-state.js');
 const manual={x:-50,y:-70,r:-55};assert.deepEqual(scrollCapPose(0,manual),manual);
 assert.ok(scrollCapPose(.1,manual).y<=manual.y);
 assert.deepEqual(scrollCapPose(0,manual),manual);
});
