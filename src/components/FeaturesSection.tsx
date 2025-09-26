import { ShieldCheckIcon, TruckIcon, CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline'

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="h-7 w-7 text-brand-blue" />, 
      title: 'Escrow & Dispute Handling',
      description: 'Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.',
      benefits: ['Secure transactions', 'Automated disputes', 'Risk mitigation']
    },
    {
      icon: <TruckIcon className="h-7 w-7 text-brand-blue" />, 
      title: 'Logistics & Customs',
      description: 'End-to-end logistics coordination with customs clearance and documentation support.',
      benefits: ['Door-to-door delivery', 'Customs clearance', 'Real-time tracking']
    },
    {
      icon: <CheckCircleIcon className="h-7 w-7 text-brand-blue" />, 
      title: 'Verified Suppliers',
      description: 'Comprehensive verification system with business credentials, certifications, and trade history.',
      benefits: ['Business verification', 'Certification tracking', 'Trade history']
    },
    {
      icon: <BanknotesIcon className="h-7 w-7 text-brand-blue" />, 
      title: 'Financing & Insurance',
      description: 'Integrated trade finance solutions and comprehensive insurance coverage for all transactions.',
      benefits: ['Trade finance', 'Insurance coverage', 'Credit facilities']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Trade on Karavan?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrated solutions that eliminate the complexity of cross-border B2B trade.
          </p>
        </div>

        {/* Featured Feature - Escrow */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-6">
                <div className="bg-white/20 rounded-2xl p-4">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">Escrow & Dispute Handling</h3>
                  <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                    Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Secure transactions', 'Automated disputes', 'Risk mitigation'].map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-center bg-white/10 rounded-lg p-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-300 mr-3" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.slice(1).map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="bg-blue-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {feature.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Secure Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-300">Countries Connected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
