"use client";

import GridRadar from "@/components/animations/GridRadar";

export default function HeroInvestor() {
  const radar = [{ x: 30, y: 45 }, { x: 62, y: 42 }, { x: 68, y: 48 }];
  return (
    <section className="relative min-h-[80svh] md:min-h-[90svh] flex items-center">
      <GridRadar points={radar} />
      <div className="relative z-10 pointer-events-auto mx-auto max-w-2xl p-6 md:p-8 rounded-2xl bg-white shadow-soft border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Secure B2B Trade Across Turkic States</h1>
        <p className="text-gray-600 mb-6">Escrow payments, logistics, customs, and finance options—launching first in Türkiye & Uzbekistan.</p>
        <div className="flex gap-3">
          <button className="btn-brand">Get Early Access</button>
          <button className="btn-outline-brand">Become a Seller</button>
        </div>
      </div>
    </section>
  );
}

