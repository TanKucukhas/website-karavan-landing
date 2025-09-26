export default function FeaturesSection() {
  const features = [
    {
      icon: '🛡️',
      title: 'Escrow & Dispute Handling',
      description: 'Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.',
      benefits: ['Secure transactions', 'Automated disputes', 'Risk mitigation']
    },
    {
      icon: '🚚',
      title: 'Logistics & Customs',
      description: 'End-to-end logistics coordination with customs clearance and documentation support.',
      benefits: ['Door-to-door delivery', 'Customs clearance', 'Real-time tracking']
    },
    {
      icon: '✅',
      title: 'Verified Suppliers',
      description: 'Comprehensive verification system with business credentials, certifications, and trade history.',
      benefits: ['Business verification', 'Certification tracking', 'Trade history']
    },
    {
      icon: '💰',
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
            Everything You Need for Cross-Border Trade
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Karavan provides integrated solutions that address every aspect of 
            international B2B trade between Turkey and Central Asia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
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
