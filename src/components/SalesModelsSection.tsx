// Light version without emojis

export default function SalesModelsSection() {
  const salesModels = [
    {
      name: 'Direct Purchase',
      description: 'Buyers can directly purchase products from verified suppliers at fixed prices.',
      features: ['Fixed pricing', 'Instant purchase', 'Immediate confirmation'],
      color: 'bg-blue-100 text-blue-800',
      screenshot: '📱'
    },
    {
      name: 'Request for Quote (RFQ)',
      description: 'Buyers submit detailed requirements and receive competitive quotes from multiple suppliers.',
      features: ['Custom requirements', 'Multiple quotes', 'Price comparison'],
      color: 'bg-green-100 text-green-800',
      screenshot: '💻'
    },
    {
      name: 'Request for Proposal (RFP)',
      description: 'Complex procurement process for large-scale projects with detailed proposals.',
      features: ['Detailed proposals', 'Technical evaluation', 'Long-term contracts'],
      color: 'bg-purple-100 text-purple-800',
      screenshot: '📊'
    },
    {
      name: 'Buyer Auction',
      description: 'Buyers set maximum prices and suppliers compete to offer the best deals.',
      features: ['Price competition', 'Buyer control', 'Best value'],
      color: 'bg-orange-100 text-orange-800',
      screenshot: '⚡'
    },
    {
      name: 'Seller Auction',
      description: 'Suppliers auction their products to the highest bidding buyers.',
      features: ['Market pricing', 'Seller control', 'Premium products'],
      color: 'bg-red-100 text-red-800',
      screenshot: '🎯'
    }
  ];

  return (
    <section className="lt-section">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Flexible Sales Models</h2>
          <p className="lt-subtext">Choose the sales model that works best for your business needs. From direct purchases to competitive auctions, we support all B2B transaction types.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salesModels.map((model, index) => (
            <div key={index} className="lt-card p-8">
              {/* Screenshot Placeholder */}
              <div className="bg-gray-50 rounded-xl p-8 mb-6 text-center border border-gray-200">
                <div className="text-sm text-gray-500">Platform view</div>
              </div>

              {/* Model Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-gray-700 leading-relaxed">{model.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {model.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-brand-600 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div className="text-center">
                <span className="lt-badge">Available Now</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Model Comparison */}
        <div className="mt-16 lt-card p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Sales Model Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Model</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Best For</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Speed</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Price Control</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Direct Purchase</td>
                  <td className="py-4 px-4 text-gray-600">Standard products</td>
                  <td className="py-4 px-4 text-gray-600">Instant</td>
                  <td className="py-4 px-4 text-gray-600">Fixed</td>
                  <td className="py-4 px-4 text-gray-600">Low</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">RFQ</td>
                  <td className="py-4 px-4 text-gray-600">Custom requirements</td>
                  <td className="py-4 px-4 text-gray-600">1-3 days</td>
                  <td className="py-4 px-4 text-gray-600">Competitive</td>
                  <td className="py-4 px-4 text-gray-600">Medium</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">RFP</td>
                  <td className="py-4 px-4 text-gray-600">Large projects</td>
                  <td className="py-4 px-4 text-gray-600">1-2 weeks</td>
                  <td className="py-4 px-4 text-gray-600">Negotiated</td>
                  <td className="py-4 px-4 text-gray-600">High</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Buyer Auction</td>
                  <td className="py-4 px-4 text-gray-600">Price-sensitive buyers</td>
                  <td className="py-4 px-4 text-gray-600">1-7 days</td>
                  <td className="py-4 px-4 text-gray-600">Buyer sets max</td>
                  <td className="py-4 px-4 text-gray-600">Medium</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-900">Seller Auction</td>
                  <td className="py-4 px-4 text-gray-600">Premium products</td>
                  <td className="py-4 px-4 text-gray-600">1-7 days</td>
                  <td className="py-4 px-4 text-gray-600">Market driven</td>
                  <td className="py-4 px-4 text-gray-600">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-brand text-lg">Explore Sales Models</button>
        </div>
      </div>
    </section>
  );
}
