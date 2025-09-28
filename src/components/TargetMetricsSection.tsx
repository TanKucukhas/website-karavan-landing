"use client";

import CountUp from '@/components/CountUp'

export default function TargetMetricsSection() {
  const current = [
    { label: 'Suppliers', value: 150 },
    { label: 'Products', value: 1200 },
    { label: 'Brands', value: 180 },
  ]
  const target = [
    { label: 'Suppliers', value: 600 },
    { label: 'Products', value: 8000 },
    { label: 'Brands', value: 700 },
    { label: 'Transactions', value: 5000 },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Target Metrics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Where we are today and where we aim to be by year-end.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current</h3>
            <div className="grid grid-cols-2 gap-4">
              {current.map((c, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary-600"><CountUp end={c.value} /></div>
                  <div className="text-gray-600">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">By Year-End</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {target.map((t, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600"><CountUp end={t.value} /></div>
                  <div className="text-gray-600">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
