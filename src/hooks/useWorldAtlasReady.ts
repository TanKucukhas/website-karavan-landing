import { useEffect, useState } from 'react';
export function useWorldAtlasReady(dep: unknown) {
  const [ready, setReady] = useState(false);
  useEffect(() => { if (dep) setReady(true); }, [dep]);
  return ready;
}

