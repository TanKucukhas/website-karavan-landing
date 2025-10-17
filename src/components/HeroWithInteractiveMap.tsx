'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
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

  // Device detection - single unified effect
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
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

  // Conditional MapLayer - memoized to prevent multiple renders
  const shouldShowMap = (isMobile || isTablet) || (isDesktop && mountMap);
  
  const MapLayer = useMemo(() => {
    if (!shouldShowMap) return null;

    // Mobile and tablet: use static map only
    if (isMobile || isTablet) {
      return (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden max-w-[100vw] animate-on-scroll"
        >
          <StaticMap className="h-full w-full" />
        </div>
      );
    }

    // Desktop: use interactive map (only when mountMap is true)
    return (
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden max-w-[100vw] transition-opacity duration-350"
        style={{ opacity: stage !== 'loading' ? 1 : 0 }}
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
      </div>
    );
  }, [shouldShowMap, isMobile, isTablet, stage, revealedRegions, pulsingRegion, reduced, flowsEnabled, handleNodeClick]);

  return (
    <>
      <style jsx>{`
        @keyframes floatDots {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes slidePattern {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
      <section className="relative bg-white text-[color:var(--ink)] w-full" style={{ minHeight: 'calc(100svh - var(--header-h, 64px))', width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
        <SpinnerOverlay />

        {/* Mobile: Professional Layout with Background Map Effect (<768px) */}
        <div className="md:hidden relative w-full" style={{ height: '100svh', paddingTop: 'var(--header-h)' }}>
          {/* Background Map with Modern Gradient Effect */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950">
            {/* Map Background Layer with Subtle Opacity */}
            <div className="absolute inset-0 scale-105 opacity-30">
              {MapLayer}
            </div>
            
            {/* Modern Gradient Mesh Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-orange-500/10"></div>
            
            {/* Animated Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'slidePattern 30s linear infinite'
              }}
            ></div>
            
            {/* Flowing Gradient Orbs */}
            <div 
              className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              style={{ animation: 'pulseGlow 6s ease-in-out infinite' }}
            ></div>
            <div 
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
              style={{ animation: 'pulseGlow 8s ease-in-out infinite 2s' }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl"
              style={{ animation: 'pulseGlow 7s ease-in-out infinite 1s' }}
            ></div>
            
            {/* Animated Diagonal Light Streaks */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse" style={{ transform: 'rotate(-3deg)' }}></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse" style={{ animationDelay: '1.5s', transform: 'rotate(2deg)' }}></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{ animationDelay: '3s', transform: 'rotate(-1deg)' }}></div>
            </div>
            
            {/* Top Fade for Content Readability */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 via-slate-900/70 to-transparent"></div>
            
            {/* Bottom Strong Fade */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            
            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
            }}></div>
          </div>

          {/* Content - CSS Grid Perfect Center */}
          <div className="relative z-10 h-full grid place-items-center py-8">
            <div className="w-full px-4 sm:px-6">
              {/* Minimal Spacing Content Group */}
              <div className="space-y-2 sm:space-y-4">
                {/* Minimal Typography */}
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight mb-1.5 sm:mb-2 drop-shadow-lg">
                    {tHero('title')} <span className="text-blue-400">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                  </h1>
                  
                  {/* Minimal Subtitle */}
                  <div className="space-y-1 max-w-2xl">
                    <p className="text-xs sm:text-sm text-blue-100 leading-tight font-medium drop-shadow-lg">
                      {tHero('subtitle')} <span className="font-bold text-orange-400">{tHero('subtitleHighlight')}</span>
                    </p>
                    <p className="text-xs text-blue-200/90 font-medium drop-shadow-lg">
                      {tHero('description')}
                    </p>
                  </div>
                </div>
                
                {/* Compact Form */}
                <div className="w-full max-w-md">
                  <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet: Professional Centered Layout (768px-1024px) */}
        <div className="hidden md:block lg:hidden">
          <div className="absolute inset-0 w-full overflow-hidden" aria-hidden>{MapLayer}</div>
          <div className="relative z-10 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="max-w-lg w-full">
                <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-8 text-gray-900">
                  {/* Professional Typography Hierarchy */}
                  <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                      {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                    </h1>
                    
                    {/* Enhanced Subtitle with Better Visual Hierarchy */}
                    <div className="space-y-4">
                      <p className="text-xl text-gray-700 leading-relaxed font-medium">
                        {tHero('subtitle')} <span className="font-bold text-coral-600">{tHero('subtitleHighlight')}</span>
                      </p>
                      <p className="text-base text-gray-600 font-medium">
                        {tHero('description')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Professional Form */}
                  <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Professional Floating Card Layout (>1024px) */}
        <div className="hidden lg:block">
          <div className="absolute inset-0 w-full overflow-hidden" aria-hidden>{MapLayer}</div>
          <div className="absolute top-32 z-30 w-full">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-lg lg:max-w-xl w-96 lg:w-[32rem]">
                <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-8 lg:p-10 text-gray-900 pointer-events-auto">
                  {/* Professional Typography Hierarchy */}
                  <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                      {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                    </h1>
                    
                    {/* Enhanced Subtitle with Better Visual Hierarchy */}
                    <div className="space-y-4">
                      <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                        {tHero('subtitle')} <span className="font-bold text-coral-600">{tHero('subtitleHighlight')}</span>
                      </p>
                      <p className="text-base lg:text-lg text-gray-600 font-medium">
                        {tHero('description')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Professional Form */}
                  <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
