export default function InvestmentAskSection() {
  const allocation = [
    { label: 'Product', value: 35, color: 'bg-blue-600' },
    { label: 'Marketing', value: 30, color: 'bg-green-600' },
    { label: 'Platform Support', value: 15, color: 'bg-purple-600' },
    { label: 'HR', value: 10, color: 'bg-orange-600' },
    { label: 'Legal', value: 5, color: 'bg-pink-600' },
    { label: 'Overheads', value: 5, color: 'bg-gray-600' },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Funding Ask: $500,000</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Fueling product, growth and partnerships across core corridors.</p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="space-y-3">
              {allocation.map((a, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">{a.label}</span>
                    <span className="text-gray-600">{a.value}%</span>
                  </div>
                  <div className="h-3 bg-white rounded border border-gray-200">
                    <div className={`h-3 ${a.color} rounded`} style={{ width: `${a.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <ul className="list-disc pl-5">
              <li>Strategic partnerships and chambers programs</li>
              <li>Government incentives and export supports</li>
              <li>Go-to-market events across core regions</li>
              <li>ERP, B2B and ecommerce integrations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

