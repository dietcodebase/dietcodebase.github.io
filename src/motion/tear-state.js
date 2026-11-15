const clamp = (p) => Math.max(0, Math.min(1, Number.isFinite(p) ? p : 0));
export function sceneProgress(scrollY, sceneStart, travel) {
  return travel <= 0 ? 1 : clamp((scrollY - sceneStart) / travel);
}
export function tearPoseAt(progress) {
  const p = clamp(progress),
    paperStep = Math.floor(p * 11 + 1e-7),
    q = paperStep / 11;
  return {
    paperStep,
    edge: 100 - 108 * q,
    bottleY: -150 * q,
    bottleVisible: paperStep < 8,
    bottleRotation: -12 * q,
    workY: 100 * (1 - q),
  };
}
