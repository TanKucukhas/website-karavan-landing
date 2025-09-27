'use client';

import { MotionConfig, useReducedMotion, motion } from 'framer-motion';
import { useIntroStages, Stage } from '@/hooks/useIntroStages';
import { useWorldAtlasReady } from '@/hooks/useWorldAtlasReady';
import { ActiveCountryFills } from '@/components/ActiveCountryFills';
import TradeFlows from '@/components/TradeFlows';
import TradeMap from '@/components/trade-map/TradeMap';
import { NODES, ARCS } from '@/components/trade-map/TradeMap.data';
import EmailCaptureInline from './EmailCaptureInline';

export default function HeroWithMap() {
  const reduced = useReducedMotion();
  const depsReady = useWorldAtlasReady(true);
  const stage: Stage = useIntroStages(depsReady, !!reduced);

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section className="relative min-h-screen bg-brand-bg text-brand-ink overflow-hidden">
        {/* Spinner */}
        {stage === 'loading' && (
          <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-white" />
            <p className="mt-3 text-slate-300 text-sm">Preparing the map…</p>
          </div>
        )}

        {/* Base map */}
        <motion.div className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage !== 'loading' ? 1 : 0 }}
          transition={{ duration: 0.35 }}>
          <TradeMap
            nodes={NODES}
            arcs={ARCS}
            animated={false}
            showGraticule
            className="h-full w-full"
          />
        </motion.div>

        {/* Active country fills (pulse) */}
        <motion.div className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'fills' || stage === 'nodes' || stage === 'flows' ? 1 : 0 }}
          transition={{ duration: 0.25 }}>
          {/* Using same world url from TradeMap internally */}
          <ActiveCountryFills geographyUrl={(TradeMap as any).WORLD_URL || ''} pulse={stage === 'fills'} />
        </motion.div>

        {/* Nodes (existing map renders them; this layer is for staged opacity) */}
        <motion.div className="absolute inset-0 z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: stage === 'nodes' || stage === 'flows' ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}>
          {/* Nodes are already part of TradeMap; keep layer only for timing */}
        </motion.div>

        {/* Flows */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <TradeFlows enabled={stage === 'flows' || stage === 'done'} />
        </div>

        {/* Hero card (CTA) */}
        <div className="relative z-40 pt-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-md lg:max-w-lg w-96 lg:w-[28rem] rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 lg:p-8 text-gray-900">
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
      </section>
    </MotionConfig>
  );
}

