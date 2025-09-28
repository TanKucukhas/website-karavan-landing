"use client";

import SvgArcMap from "@/components/animations/SvgArcMap";

export default function SolutionsWithMap() {
  return (
    <section className="relative section-padding">
      <SvgArcMap
        highlightCountries={["TR", "UZ", "KZ", "AZ", "HU"]}
        nodes={[{ lon: 28.97, lat: 41.01 }, { lon: 69.24, lat: 41.31 }, { lon: 76.89, lat: 43.23 }]}
        arcs={[
          { from: [28.97, 41.01], to: [69.24, 41.31], status: "launching" },
          { from: [28.97, 41.01], to: [76.89, 43.23], status: "expanding" },
        ]}
      />
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integrated Solutions</h2>
          <p className="text-gray-600 mb-6">Escrow-based payments, logistics management, customs & compliance, and trade finance—mapped to your corridor.</p>
          <div className="flex gap-3"><button className="btn-brand">Explore Solutions</button></div>
        </div>
      </div>
    </section>
  );
}
