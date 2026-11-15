export function transitionBottle(state, event) {
  if (event === "activate") {
    if (state === "closed") return "popping";
    if (state === "open") return "resetting";
  }
  if (event === "animationEnd") {
    if (state === "popping") return "open";
    if (state === "resetting") return "popping";
  }
  return state;
}
export function steppedProgress(elapsedMs, durationMs, posesPerSecond = 10) {
  if (durationMs <= 0 || elapsedMs >= durationMs) return 1;
  return Math.max(
    0,
    Math.floor((elapsedMs / 1000) * posesPerSecond) /
      ((durationMs / 1000) * posesPerSecond),
  );
}
export function dragPose(delta) {
  const x = Math.max(-36, Math.min(36, delta));
  return { x, rotation: x / 6 };
}
