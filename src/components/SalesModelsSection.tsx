import Emoji from '@/components/Emoji'

export default function SalesModelsSection() {
  const salesModels = [
    {
      name: 'Direct Purchase',
      icon: <Emoji symbol="🛒" label="Cart" size={28} />, 
      description: 'Buyers can directly purchase products from verified suppliers at fixed prices.',
      features: ['Fixed pricing', 'Instant purchase', 'Immediate confirmation'],
      color: 'bg-blue-100 text-blue-800',
      screenshot: '📱'
    },
    {
      name: 'Request for Quote (RFQ)',
      icon: <Emoji symbol="📋" label="RFQ" size={28} />, 
      description: 'Buyers submit detailed requirements and receive competitive quotes from multiple suppliers.',
      features: ['Custom requirements', 'Multiple quotes', 'Price comparison'],
      color: 'bg-green-100 text-green-800',
      screenshot: '💻'
    },
    {
      name: 'Request for Proposal (RFP)',
      icon: <Emoji symbol="📄" label="RFP" size={28} />, 
      description: 'Complex procurement process for large-scale projects with detailed proposals.',
      features: ['Detailed proposals', 'Technical evaluation', 'Long-term contracts'],
      color: 'bg-purple-100 text-purple-800',
      screenshot: '📊'
    },
    {
      name: 'Buyer Auction',
      icon: <Emoji symbol="🔨" label="Auction" size={28} />, 
      description: 'Buyers set maximum prices and suppliers compete to offer the best deals.',
      features: ['Price competition', 'Buyer control', 'Best value'],
      color: 'bg-orange-100 text-orange-800',
      screenshot: '⚡'
    },
    {
      name: 'Seller Auction',
      icon: <Emoji symbol="🏆" label="Trophy" size={28} />, 
      description: 'Suppliers auction their products to the highest bidding buyers.',
      features: ['Market pricing', 'Seller control', 'Premium products'],
      color: 'bg-red-100 text-red-800',
      screenshot: '🎯'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Flexible Sales Models
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the sales model that works best for your business needs. 
            From direct purchases to competitive auctions, we support all B2B transaction types.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salesModels.map((model, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Screenshot Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6 text-center">
                <div className="text-6xl mb-4">{model.screenshot}</div>
                <div className="text-sm text-gray-500">Platform Screenshot</div>
              </div>

              {/* Model Info */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{model.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {model.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {model.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {model.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div className="text-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${model.color}`}>
                  Available Now
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Model Comparison */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Sales Model Comparison
          </h3>
          
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
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Explore Sales Models
          </button>
        </div>
      </div>
    </section>
  );
}
