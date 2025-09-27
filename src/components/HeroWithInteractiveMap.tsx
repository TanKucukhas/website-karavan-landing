'use client';

import { useEffect, useMemo, useState } from 'react';
import { MotionConfig, useReducedMotion, motion } from 'framer-motion';
import clsx from 'clsx';
import { geoMercator } from 'd3-geo';
import TradeMap from './trade-map/TradeMap';
import { NODES, ARCS } from './trade-map/TradeMap.data';
import EmailCaptureInline from './EmailCaptureInline';
import { analytics } from '@/lib/analytics';
import { ArcPathNatural } from '@/components/ArcPathNatural';
import TradeFlows from '@/components/TradeFlows';

const IMPORTANT_REGIONS = ['TR', 'UZ', 'KZ', 'AZ', 'HU'];

export default function HeroWithInteractiveMap() {
  const reduced = useReducedMotion();
  const [worldReady, setWorldReady] = useState(false);
  const [stage, setStage] = useState<'loading'|'map'|'reveal'|'flows'>('loading');
  const [revealedRegions, setRevealedRegions] = useState<string[]>([]);
  const [pulsingRegion, setPulsingRegion] = useState<string | undefined>(undefined);
  const [firstArcActive, setFirstArcActive] = useState(false);
  const [flowsEnabled, setFlowsEnabled] = useState(false);
  const [mountMap, setMountMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const showMapHint = !worldReady || !mountMap;

  useEffect(() => { analytics.mapArcView(); }, []);

  // Mount map after initial content paints (background load)
  useEffect(() => {
    let to: any;
    const idle = (cb: () => void) => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        // @ts-ignore
        window.requestIdleCallback(cb, { timeout: 800 });
      } else {
        to = window.setTimeout(cb, 250);
      }
    };
    idle(() => setMountMap(true));
    return () => { if (to) window.clearTimeout(to); };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Stage machine
  useEffect(() => {
    if (reduced) {
      setRevealedRegions(IMPORTANT_REGIONS);
      setStage('flows');
      setFlowsEnabled(true);
      return;
    }
    if (!worldReady) return;
    const t0 = performance.now();
    const spinner = window.setTimeout(() => {
      setStage('map');
      // Start revealing countries + nodes one by one
      const order = IMPORTANT_REGIONS.slice();
      let i = 0;
      const step = () => {
        if (i >= order.length) {
          // After a brief pause, start flows
          window.setTimeout(() => setStage('flows'), 300);
          return;
        }
        const iso = order[i++];
        setPulsingRegion(iso);
        setRevealedRegions(prev => prev.includes(iso) ? prev : [...prev, iso]);
        window.setTimeout(() => setPulsingRegion(undefined), 900);
        window.setTimeout(step, 200);
      };
      window.setTimeout(step, 150);
    }, Math.max(0, 700 - (performance.now() - t0)));
    return () => window.clearTimeout(spinner);
  }, [worldReady, reduced]);

  // Begin flows: first arc solo, then scheduler
  useEffect(() => {
    if (stage === 'flows' && !reduced) {
      setFirstArcActive(true);
    }
  }, [stage, reduced]);

  const projection = useMemo(() => geoMercator().scale(140).translate([512, 260]), []);
  const trNode = NODES.find(n => n.region === 'TR');
  const firstArc = useMemo(() => {
    if (!trNode) return undefined;
    return ARCS.find(a => a.from === trNode.id);
  }, [trNode]);

  const firstD = useMemo(() => {
    if (!firstArc) return '';
    const from = NODES.find(n => n.id === firstArc.from);
    const to = NODES.find(n => n.id === firstArc.to);
    if (!from || !to) return '';
    const [x1, y1] = projection([from.lon, from.lat]) as [number, number];
    const [x2, y2] = projection([to.lon, to.lat]) as [number, number];
    const dx = x2 - x1, dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    const lift = Math.min(120, Math.max(30, dist * 0.32));
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - lift;
    return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
  }, [firstArc, projection]);

  const visibleNodes = useMemo(() => NODES.filter(n => revealedRegions.includes(n.region)), [revealedRegions]);

  const onFirstCycleEnd = () => {
    setFirstArcActive(false);
    window.setTimeout(() => setFlowsEnabled(true), 300);
  };

  const LoadingHint = ({ className }: { className?: string }) => {
    if (!showMapHint) return null;
    return (
      <div className={clsx('pointer-events-none', className)}>
        <div className="bg-slate-900/70 text-slate-100 text-xs rounded-full px-2.5 py-1.5 backdrop-blur-md ring-1 ring-white/10 flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Harita yükleniyor…</span>
        </div>
      </div>
    );
  };

  const MapLayer = (
    <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: stage !== 'loading' ? 1 : 0 }} transition={{ duration: 0.35 }}>
      <TradeMap
        nodes={visibleNodes}
        arcs={[]}
        showGraticule
        showActiveOverlay
        revealedRegions={revealedRegions}
        pulsingRegion={pulsingRegion}
        reducedMotionFallback={reduced}
        className="h-full w-full"
        disableNodeAnimation={isMobile || !!reduced}
        onReady={() => setWorldReady(true)}
      />
      {/* Scrim between base map and flows to enhance contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-bg/30 via-brand-bg/30 to-brand-bg/50 pointer-events-none" />
      {/* Flows overlays */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* First arc solo */}
        {firstArc && firstD && firstArcActive && (
          <svg viewBox="0 0 1024 520" className="h-full w-full">
            <ArcPathNatural id={firstArc.id} d={firstD} color="#4ea1ff" width={1.4} zoom={1} active={true} onCycleEnd={onFirstCycleEnd} />
          </svg>
        )}
        {/* Scheduler-driven flows */}
        {flowsEnabled && <TradeFlows enabled={true} />}
      </div>
      <LoadingHint className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-10" />
    </motion.div>
  );

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section className="relative min-h-screen bg-brand-bg text-brand-ink">

        {/* Mobile: Stacked Layout (<768px) */}
        <div className="md:hidden">
          {/* Map - Top Half */}
          <div className="h-[50vh] relative">
            {mountMap ? MapLayer : null}
            {!mountMap && <LoadingHint className="absolute bottom-3 left-3 z-10" />}
          </div>

          {/* Form - Bottom Half */}
          <div className="h-[50vh] bg-white/95 backdrop-blur-md pt-8 pb-6 px-8 flex flex-col justify-start relative z-10">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                Secure B2B trade across the <span className="text-brand-600">Turkic States</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Launching first in Türkiye & Uzbekistan.<br />
                Escrow payments, logistics, customs, and finance options.
              </p>
            </div>
            <EmailCaptureInline defaultRole="seller" />
          </div>
        </div>

        {/* Tablet: Centered Layout (768px-1024px) */}
        <div className="hidden md:block lg:hidden">
          <div className="absolute inset-0" aria-hidden>{mountMap ? MapLayer : null}</div>
          {!mountMap && <LoadingHint className="absolute bottom-4 left-4 z-10 md:block lg:hidden" />}
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            <div className="max-w-md w-full">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 text-gray-900">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                    Secure B2B trade across the <span className="text-brand-600">Turkic States</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
                  </p>
                </div>
                <EmailCaptureInline defaultRole="seller" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Floating Card Layout (>1024px) */}
        <div className="hidden lg:block">
          <div className="absolute inset-0" aria-hidden>{mountMap ? MapLayer : null}</div>
          {!mountMap && <LoadingHint className="absolute bottom-4 left-4 z-10 hidden lg:block" />}
          <div className="absolute top-32 z-30">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="max-w-md lg:max-w-lg w-96 lg:w-[28rem]">
                <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 lg:p-8 text-gray-900 pointer-events-auto">
                  <div className="mb-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      Secure B2B trade across the <span className="text-brand-600">Turkic States</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
                    </p>
                  </div>
                  <EmailCaptureInline defaultRole="seller" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
