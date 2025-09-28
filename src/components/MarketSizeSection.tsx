"use client";

import CountUp from '@/components/CountUp'

export default function MarketSizeSection() {
  const bars = [
    { label: 'TAM', value: 37, color: 'bg-blue-600' },
    { label: 'SAM', value: 24, color: 'bg-green-600' },
    { label: 'SOM', value: 24, color: 'bg-purple-600' },
  ]

  return (
    <section className="section-padding bg-white animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Size</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Turkic States and surrounding markets represent a significant and growing opportunity.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {bars.map((b, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{b.label}</span>
                  <span className="text-gray-600"><CountUp end={b.value} suffix={b.label === 'SOM' ? 'M' : 'B'} /></span>
                </div>
                <div className="h-4 bg-gray-100 rounded">
                  <div className={`h-4 ${b.color} rounded`} style={{ width: `${(b.value/37)*100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-gray-600 text-center">
            Combined addressable market spans Central Asia and adjacent regions with strong trade corridors from Turkey.
          </p>
        </div>
      </div>
    </section>
  )
}
