import { useEffect, useRef, useState } from 'react';

type GateOpts = { minMs?: number; maxMs?: number };

const rAF = (cb: FrameRequestCallback) => requestAnimationFrame(cb);
const rIC = (cb: any) =>
  (typeof window !== 'undefined' && 'requestIdleCallback' in window)
    ? (window as any).requestIdleCallback(cb, { timeout: 500 })
    : setTimeout(cb, 50);

export function useMapLoadingGate(worldReady: boolean, gate: GateOpts = {}) {
  const minMs = gate.minMs ?? 900;
  const maxMs = gate.maxMs ?? 8000;
  const [visible, setVisible] = useState(true);
  const t0 = useRef<number>(performance.now());
  const painted = useRef(false);

  const markPainted = () => { painted.current = true; };

  useEffect(() => {
    let minTimer: any, maxTimer: any;

    minTimer = setTimeout(() => {
      const tryHide = () => {
        if (worldReady && painted.current) {
          rAF(() => rIC(() => setVisible(false)));
        }
      };
      tryHide();
    }, Math.max(0, minMs - (performance.now() - t0.current)));

    maxTimer = setTimeout(() => setVisible(false), maxMs);

    return () => { clearTimeout(minTimer); clearTimeout(maxTimer); };
  }, [worldReady, minMs, maxMs]);

  return { spinnerVisible: visible, markPainted };
}

