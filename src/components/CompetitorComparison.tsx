export default function CompetitorComparison() {
  const rows = [
    { criteria: 'Business Model', karavan: 'B2B trade platform', others: 'Freight or marketplace' },
    { criteria: 'Revenue Streams', karavan: 'Payments, logistics, subscriptions', others: 'Freight fees, ads' },
    { criteria: 'Users', karavan: 'Exporters ↔ Buyers', others: 'Shippers, merchants' },
    { criteria: 'Sales Models', karavan: 'Direct, RFQ/RFP, auctions', others: 'Direct only' },
    { criteria: 'Payments', karavan: 'Secure payments, multi-currency', others: 'Card/gateway' },
    { criteria: 'Logistics', karavan: 'Integrated partners', others: 'Own/outsourced' },
    { criteria: 'Challenges', karavan: 'Trust, customs, finance', others: 'Varies' },
  ]

  const competitors = ['Flexport', 'Alibaba', 'Ozon']

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Competitor Comparison</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">How Karavan compares across core criteria.</p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4">Criteria</th>
                <th className="text-left py-4 px-4">Karavan</th>
                {competitors.map((c) => (
                  <th key={c} className="text-left py-4 px-4">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">{r.criteria}</td>
                  <td className="py-4 px-4 text-gray-700">{r.karavan}</td>
                  {competitors.map((c) => (
                    <td key={c} className="py-4 px-4 text-gray-500">{r.others}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

