import { useEffect, useState } from 'react';
import { INTRO } from '@/animation/timeline';

export type Stage = 'loading'|'map'|'fills'|'nodes'|'flows'|'done';

export function useIntroStages(depsReady: boolean, reduced: boolean) {
  const [stage, setStage] = useState<Stage>('loading');

  useEffect(() => {
    if (!depsReady) return;
    if (reduced) { setStage('done'); return; }

    const t0 = performance.now();
    const minSpinner = window.setTimeout(() => {
      setStage('map');
      const t1 = window.setTimeout(() => setStage('fills'), INTRO.fillsDelay);
      const t2 = window.setTimeout(() => setStage('nodes'), INTRO.fillsDelay + INTRO.fillsPulseDur + INTRO.nodesDelay);
      const t3 = window.setTimeout(() => setStage('flows'), INTRO.fillsDelay + INTRO.fillsPulseDur + INTRO.nodesDelay + INTRO.flowsDelay);
      return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.clearTimeout(t3); };
    }, Math.max(0, INTRO.spinnerMin - (performance.now() - t0)));

    return () => window.clearTimeout(minSpinner);
  }, [depsReady, reduced]);

  return stage;
}

