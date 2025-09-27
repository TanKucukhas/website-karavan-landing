import { useEffect, useRef, useState } from 'react';

type GateOpts = { minMs?: number; maxMs?: number; fadeMs?: number };

export function useMapLoadingGate(
  deps: { geoReady: boolean; stablePaint: boolean },
  gate: GateOpts = {}
) {
  const minMs = gate.minMs ?? 900;
  const maxMs = gate.maxMs ?? 8000;
  const fadeMs = gate.fadeMs ?? 180;

  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const t0 = useRef(performance.now());

  useEffect(() => {
    let minTimer: NodeJS.Timeout | null = null, maxTimer: NodeJS.Timeout | null = null, rafId = 0;

    const tryHide = () => {
      if (!deps.geoReady || !deps.stablePaint) return;
      const elapsed = performance.now() - t0.current;
      if (elapsed < minMs) {
        minTimer = setTimeout(tryHide, minMs - elapsed);
        return;
      }
      rafId = requestAnimationFrame(() => {
        setFading(true);
        setTimeout(() => setVisible(false), fadeMs);
      });
    };

    maxTimer = setTimeout(() => setVisible(false), maxMs);
    tryHide();

    return () => {
      if (minTimer) clearTimeout(minTimer);
      if (maxTimer) clearTimeout(maxTimer);
      cancelAnimationFrame(rafId);
    };
  }, [deps.geoReady, deps.stablePaint, minMs, maxMs, fadeMs]);

  return { spinnerVisible: visible, spinnerFading: fading };
}
