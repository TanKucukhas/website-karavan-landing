export const FLOW = {
  maxConcurrent: 3,
  startWindowMs: 4200,
  minGapMs: 600,
  maxGapMs: 1600,
  drawDurationMs: 1100,
  flowSpeedPxPerSec: 260,
  coastMs: 900,
  restMs: [1200, 2400] as [number, number],
  jitter: 0.18,
  loop: true,
};
