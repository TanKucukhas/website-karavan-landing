"use client";

import dynamic from "next/dynamic";
const ParticlesCanvas = dynamic(() => import("@/components/animations/ParticlesCanvas"), { ssr: false });

export default function CaseStudiesFlow() {
  return (
    <section className="relative section-padding">
      {/* Hidden on mobile for perf */}
      <ParticlesCanvas
        paths={[
          { pts: [[300, 280], [420, 260], [520, 270], [600, 260]], color: "#E35D3E" },
          { pts: [[300, 300], [430, 300], [520, 305], [610, 300]], color: "#7CC7FF" },
        ]}
      />
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="lt-card p-6">
              <div className="text-gray-900 font-semibold mb-2">Project {i}</div>
              <p className="text-gray-600 text-sm">Outcome-driven workflow with measurable cross-border value.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
