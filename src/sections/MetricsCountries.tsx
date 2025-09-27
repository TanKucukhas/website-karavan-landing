"use client";

import CountryFills from "@/components/animations/CountryFills";
import CountUp from '@/components/CountUp'

export default function MetricsCountries() {
  return (
    <section className="relative py-16 md:py-24">
      <CountryFills active={["TR", "UZ", "KZ", "AZ", "HU"]} />
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="lt-card p-6 text-center">
            <div className="text-xl font-semibold text-gray-900"><CountUp end={150} suffix="+" /> Suppliers</div>
          </div>
          <div className="lt-card p-6 text-center">
            <div className="text-xl font-semibold text-gray-900">7–14d Shipping</div>
          </div>
          <div className="lt-card p-6 text-center">
            <div className="text-xl font-semibold text-gray-900"><CountUp end={6} /> Languages</div>
          </div>
          <div className="lt-card p-6 text-center">
            <div className="text-xl font-semibold text-gray-900"><CountUp end={91} suffix="%" /> Success</div>
          </div>
        </div>
      </div>
    </section>
  );
}
