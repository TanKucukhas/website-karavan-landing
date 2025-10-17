'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { MotionConfig, useReducedMotion, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { analytics } from '@/lib/analytics';
import StaticMap from '@/components/StaticMap';
import { useMapLoadingGate } from '@/hooks/useMapLoadingGate';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import type { Node } from './trade-map/TradeMap.types';

// Conditional imports - only load heavy components on desktop
const TradeMap = dynamic(() => import('./trade-map/TradeMap'), { ssr: false });
const TradeFlows = dynamic(() => import('@/components/TradeFlows'), { ssr: false });
const EmailCaptureInline = dynamic(() => import('./EmailCaptureInline'), { ssr: false });

// Conditional data imports - only load on desktop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let NODES: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ARCS: any[] = [];

if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
  import('./trade-map/TradeMap.data').then(module => {
    NODES = module.NODES;
    ARCS = module.ARCS;
  });
}

const IMPORTANT_REGIONS = ['TR', 'UZ', 'KZ', 'AZ', 'HU'];

export default function HeroWithInteractiveMap() {
  const tHero = useTranslations('hero');
  const router = useRouter();
  const reduced = useReducedMotion();
  const [geoReady, setGeoReady] = useState(false);
  const [stablePaint, setStablePaint] = useState(false);
  const [stage, setStage] = useState<'loading'|'map'|'reveal'|'flows'>('loading');
  const [revealedRegions, setRevealedRegions] = useState<string[]>([]);
  const [pulsingRegion, setPulsingRegion] = useState<string | undefined>(undefined);
  const [flowsEnabled, setFlowsEnabled] = useState(false);
  const [mountMap, setMountMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Only use loading gate on desktop
  const { spinnerVisible, spinnerFading } = useMapLoadingGate(
    { geoReady, stablePaint }, 
    { minMs: 900, maxMs: 8000, fadeMs: 180 }
  );

  const handleNodeClick = useCallback((node: Node) => {
    analytics.mapNodeClick(node.name);
    if (node.href) {
      router.push(node.href);
    }
  }, [router]);

  useEffect(() => { analytics.mapArcView(); }, []);

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mount map after initial content paints (background load) - only on desktop
  useEffect(() => {
    if (!isDesktop) return;
    
    let to: number | undefined;
    type WindowWithRIC = Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
    const idle = (cb: () => void) => {
      if (typeof window !== 'undefined' && (window as WindowWithRIC).requestIdleCallback) {
        (window as WindowWithRIC).requestIdleCallback!(cb, { timeout: 800 });
      } else {
        to = window.setTimeout(cb, 250);
      }
    };
    idle(() => setMountMap(true));
    return () => { if (to) window.clearTimeout(to); };
  }, [isDesktop]);

  // Spinner overlay (centered, non-blocking for content)

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
    if (!geoReady) return;
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
  }, [geoReady, reduced]);

  // Begin flows when stage reaches 'flows' with delay
  useEffect(() => {
    if (stage === 'flows') {
      // Add 2 second delay before starting flows
      const timer = setTimeout(() => {
        setFlowsEnabled(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // const visibleNodes = useMemo(() => NODES.filter(n => revealedRegions.includes(n.region)), [revealedRegions]);

  const SpinnerOverlay = () => (
    // Only show spinner on desktop where interactive map loads
    (isDesktop && spinnerVisible) ? (
      <div className={`absolute inset-0 z-40 grid place-items-center pointer-events-none ${spinnerFading ? 'opacity-0 transition-opacity duration-200' : 'opacity-100'}`}>
        <div className="bg-slate-900/75 rounded-full px-3 py-2 backdrop-blur-md ring-1 ring-white/10 flex items-center justify-center">
          <span className="inline-block h-5 w-5 rounded-full border-2 border-sky-400/60 border-t-transparent animate-spin" />
        </div>
      </div>
    ) : null
  );

  // Conditional MapLayer - only load heavy components on desktop
  const MapLayer = useMemo(() => {
    // Mobile and tablet: use static map only
    if (isMobile || isTablet) {
      return (
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden max-w-[100vw]"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.35 }}
        >
          <StaticMap className="h-full w-full" />
        </motion.div>
      );
    }

    // Desktop: use interactive map
    if (isDesktop && mountMap) {
      return (
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden max-w-[100vw]"
          initial={{ opacity: 0 }} 
          animate={{ opacity: stage !== 'loading' ? 1 : 0 }} 
          transition={{ duration: 0.35 }}
        >
          <TradeMap
            nodes={NODES}
            arcs={ARCS}
            showGraticule
            showActiveOverlay
            revealedRegions={revealedRegions}
            pulsingRegion={pulsingRegion}
            reducedMotionFallback={!!reduced}
            className="h-full w-full"
            disableNodeAnimation={!!reduced}
            onReady={() => setGeoReady(true)}
            onStablePaint={() => setStablePaint(true)}
            onNodeClick={handleNodeClick}
          />
          {/* Flows overlays */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {flowsEnabled && <TradeFlows enabled={true} />}
          </div>
        </motion.div>
      );
    }

    // Loading state for desktop
    return null;
  }, [isMobile, isTablet, isDesktop, mountMap, stage, revealedRegions, pulsingRegion, reduced, flowsEnabled, handleNodeClick]);

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section className="relative bg-white text-[color:var(--ink)] w-full" style={{ minHeight: 'calc(100svh - var(--header-h, 64px))', width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
        <SpinnerOverlay />

        {/* Mobile: Stacked Layout (<768px) */}
        <div className="md:hidden">
          {/* Map - Top Half */}
          <div className="h-[50vh] relative overflow-hidden">
            {(isMobile || isTablet || mountMap) ? MapLayer : null}
          </div>

          {/* Form - Bottom Half with proper scrolling */}
          <div className="min-h-[50vh] -mt-36 pb-8 flex flex-col justify-start relative z-10 bg-white overflow-y-auto">
            <div className="container mx-auto px-4 lg:px-8 flex-1">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                  {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {tHero('subtitle')} <span className="font-semibold text-coral-600">{tHero('subtitleHighlight')}</span>
                </p>
              </div>
              <div className="pb-4">
                <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet: Centered Layout (768px-1024px) */}
        <div className="hidden md:block lg:hidden">
          <div className="absolute inset-0 w-full overflow-hidden" aria-hidden>{(isMobile || isTablet || mountMap) ? MapLayer : null}</div>
          <div className="relative z-10 min-h-screen">
            <div className="container mx-auto px-4 lg:px-8 py-16">
              <div className="max-w-md w-full">
                <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 text-gray-900">
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">{tHero('subtitle')}</p>
                  </div>
                  <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Floating Card Layout (>1024px) */}
        <div className="hidden lg:block">
          <div className="absolute inset-0 w-full overflow-hidden" aria-hidden>{mountMap ? MapLayer : null}</div>
          <div className="absolute top-32 z-30 w-full">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-md lg:max-w-lg w-96 lg:w-[28rem]">
                <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 lg:p-8 text-gray-900 pointer-events-auto">
                  <div className="mb-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">{tHero('subtitle')}</p>
                    <p className="mt-2 text-sm text-gray-500">{tHero('description')}</p>
                  </div>
                  <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
