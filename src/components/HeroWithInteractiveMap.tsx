'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CTAButton from './ui/CTAButton';
import Image from 'next/image';

function TradeArcs() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <motion.path
        d="M52% 48% C 58% 35%, 66% 35%, 70% 48%"
        stroke="var(--color-accent-600)"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 8 }}
      />
      <motion.path
        d="M50% 50% C 56% 42%, 60% 42%, 64% 50%"
        stroke="var(--color-accent-500)"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, repeatDelay: 8 }}
      />
    </svg>
  );
}

export default function HeroWithInteractiveMap() {

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-5">
        <Image src="/globe.svg" alt="World map" fill className="object-cover" priority />
      </div>
      <TradeArcs />

      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center">
        <div className="max-w-3xl bg-white/80 backdrop-blur rounded-lg p-6 shadow">
          <h1 className="text-[var(--text-h1)] leading-[var(--leading-h1)] font-extrabold text-brand-ink">
            Secure cross-border B2B trade
          </h1>
          <p className="mt-4 text-lg text-muted-ink max-w-2xl">
            Launching first in Türkiye & Uzbekistan. Expanding across the Turkic States.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <CTAButton label="Get Early Access" href="#contact" variant="primary" className="px-8 py-4 text-lg" />
            <CTAButton label="I’m a Buyer" href="/buyer" variant="outline" className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}


