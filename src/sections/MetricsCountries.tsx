"use client";

import CountryFills from "@/components/animations/CountryFills";

export default function MetricsCountries() {
  return (
    <section className="relative py-16 md:py-24">
      <CountryFills active={["TR", "UZ", "KZ", "AZ", "HU"]} />
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {["150+ Suppliers", "7-14d Shipping", "6 Languages", "91% Success"].map((v, i) => (
            <div key={i} className="lt-card p-6 text-center">
              <div className="text-xl font-semibold text-gray-900">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

