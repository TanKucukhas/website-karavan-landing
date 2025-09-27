// Light version with Heroicons
import {
  ShoppingCartIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

export default function SalesModelsSection() {
  const salesModels = [
    {
      name: 'Direct Purchase',
      description: 'Buyers can directly purchase products from verified suppliers at fixed prices.',
      features: ['Fixed pricing', 'Instant purchase', 'Immediate confirmation'],
      color: 'bg-blue-100 text-blue-800',
      icon: ShoppingCartIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: 'Request for Quote (RFQ)',
      description: 'Buyers submit detailed requirements and receive competitive quotes from multiple suppliers.',
      features: ['Custom requirements', 'Multiple quotes', 'Price comparison'],
      color: 'bg-green-100 text-green-800',
      icon: EnvelopeIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: 'Request for Proposal (RFP)',
      description: 'Complex procurement process for large-scale projects with detailed proposals.',
      features: ['Detailed proposals', 'Technical evaluation', 'Long-term contracts'],
      color: 'bg-purple-100 text-purple-800',
      icon: DocumentTextIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: 'Buyer Auction',
      description: 'Buyers set maximum prices and suppliers compete to offer the best deals.',
      features: ['Price competition', 'Buyer control', 'Best value'],
      color: 'bg-orange-100 text-orange-800',
      icon: MegaphoneIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: 'Seller Auction',
      description: 'Suppliers auction their products to the highest bidding buyers.',
      features: ['Market pricing', 'Seller control', 'Premium products'],
      color: 'bg-red-100 text-red-800',
      icon: TagIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    }
  ];

  return (
    <section className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Flexible Sales Models</h2>
          <p className="lt-subtext">Choose the sales model that works best for your business needs. From direct purchases to competitive auctions, we support all B2B transaction types.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salesModels.map((model, index) => (
            <div key={index} className="lt-card p-8">
              {/* Removed platform view to keep compact */}

              {/* Model Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  {model.icon && (() => { const Icon = model.icon!; return <Icon className="h-5 w-5 text-brand-600" /> })()}
                  {model.name}
                </h3>
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
        <div className="mt-16 overflow-hidden rounded-2xl shadow-soft border border-gray-200">
          <div className="bg-gradient-to-r from-brand-50 via-sky-50 to-blue-50 px-6 py-5">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Sales Model Comparison</h3>
            <p className="text-center text-gray-600 mt-1">Speed, control, and complexity at a glance</p>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr className="text-left text-gray-700">
                  <th className="py-4 px-4 font-semibold">Model</th>
                  <th className="py-4 px-4 font-semibold">Best For</th>
                  <th className="py-4 px-4 font-semibold">Speed</th>
                  <th className="py-4 px-4 font-semibold">Price Control</th>
                  <th className="py-4 px-4 font-semibold">Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">Direct Purchase</td>
                  <td className="py-4 px-4 text-gray-600">Standard products</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs">Instant</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-green-500 rounded" style={{ width: '95%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Fixed</td>
                  <td className="py-4 px-4 text-gray-600">Low</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">RFQ</td>
                  <td className="py-4 px-4 text-gray-600">Custom requirements</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">1–3 days</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-blue-500 rounded" style={{ width: '70%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Competitive</td>
                  <td className="py-4 px-4 text-gray-600">Medium</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">RFP</td>
                  <td className="py-4 px-4 text-gray-600">Large projects</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">1–2 weeks</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-amber-500 rounded" style={{ width: '40%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Negotiated</td>
                  <td className="py-4 px-4 text-gray-600">High</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">Buyer Auction</td>
                  <td className="py-4 px-4 text-gray-600">Price‑sensitive buyers</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">1–7 days</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-blue-500 rounded" style={{ width: '55%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Buyer sets max</td>
                  <td className="py-4 px-4 text-gray-600">Medium</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">Seller Auction</td>
                  <td className="py-4 px-4 text-gray-600">Premium products</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">1–7 days</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-blue-500 rounded" style={{ width: '55%' }} />
                    </div>
                  </td>
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
