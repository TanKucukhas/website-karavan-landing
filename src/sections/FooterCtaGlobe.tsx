"use client";

import dynamic from "next/dynamic";
const GlobeLite = dynamic(() => import("@/components/animations/GlobeLite"), { ssr: false });

export default function FooterCtaGlobe() {
  return (
    <section className="relative section-padding bg-gradient-to-r from-[#0f1a30] to-[#0d1530] hidden md:block">
      <GlobeLite />
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-xl lt-card p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Secure Your Early Access Spot</h3>
          <p className="text-slate-200 mb-6">Limited spots available. Verified suppliers, secure escrow, logistics included.</p>
          <div className="flex gap-3 justify-center">
            <button className="btn-brand">Get Early Access</button>
            <button className="btn-outline-brand">Become a Seller</button>
          </div>
        </div>
      </div>
    </section>
  );
}
