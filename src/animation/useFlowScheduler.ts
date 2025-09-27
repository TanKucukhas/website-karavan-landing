import { useEffect, useMemo, useRef, useState } from 'react';
import { FLOW as S } from './flowConfig';

const randBetween = (min:number, max:number) => min + Math.random()*(max-min);
const jitter = (ms:number) => Math.max(0, ms * (1 + (Math.random()*2-1)*S.jitter));

export function useFlowScheduler(ids: string[], enabled: boolean, preserveOrder = false) {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const activeRef = useRef<Record<string, boolean>>({});
  const queue = useRef<string[]>([]);
  const timers = useRef<number[]>([]);

  const shuffled = useMemo(() => preserveOrder ? ids.slice() : ids.slice().sort(()=>Math.random()-0.5), [ids, preserveOrder]);

  useEffect(() => {
    if (!enabled) return;
    timers.current.forEach(window.clearTimeout); timers.current = [];
    setActive({}); activeRef.current = {}; queue.current = [];

    const startOne = () => {
      const running = Object.values(activeRef.current).filter(Boolean).length;
      if (running >= S.maxConcurrent) return;
      const id = queue.current.shift();
      if (!id) return;
      activeRef.current[id] = true;
      setActive({ ...activeRef.current });
    };

    let acc = 0;
    shuffled.forEach((id, i) => {
      const delay = jitter((S.startWindowMs / shuffled.length) * i);
      queue.current.push(id);
      timers.current.push(window.setTimeout(startOne, delay + acc));
      acc += randBetween(S.minGapMs, S.maxGapMs) * 0.25;
    });

    return () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  }, [enabled, shuffled]);

  const onFlowCycleEnd = (id: string) => {
    activeRef.current[id] = false;
    setActive({ ...activeRef.current });

    if (S.loop) {
      const wait = jitter(randBetween(S.restMs[0], S.restMs[1]));
      window.setTimeout(() => {
        queue.current.push(id);
        const tryStart = () => {
          const running = Object.values(activeRef.current).filter(Boolean).length;
          if (running < S.maxConcurrent && queue.current.length) {
            const nid = queue.current.shift()!;
            activeRef.current[nid] = true;
            setActive({ ...activeRef.current });
          } else {
            window.setTimeout(tryStart, randBetween(S.minGapMs, S.maxGapMs));
          }
        };
        tryStart();
      }, wait);
    }
  };

  return { active, onFlowCycleEnd };
}
