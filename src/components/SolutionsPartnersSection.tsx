export default function SolutionsPartnersSection() {
  const solutions = [
    {
      icon: '🛡️',
      title: 'Trust & Verification',
      description: 'Comprehensive supplier verification with business credentials, certifications, and trade history tracking.'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Escrow-based payment system with automated dispute resolution and multi-currency support.'
    },
    {
      icon: '🚚',
      title: 'Logistics Coordination',
      description: 'End-to-end logistics management with real-time tracking and customs clearance support.'
    },
    {
      icon: '📋',
      title: 'Customs & Compliance',
      description: 'Automated documentation and compliance management for seamless cross-border trade.'
    },
    {
      icon: '🔒',
      title: 'Insurance Coverage',
      description: 'Comprehensive trade insurance covering goods in transit and transaction protection.'
    },
    {
      icon: '💰',
      title: 'Trade Finance',
      description: 'Integrated financing solutions including letters of credit and trade credit facilities.'
    }
  ];

  const partners = [
    { name: 'Stripe', logo: '💳', description: 'Payment Processing' },
    { name: 'Navlungo', logo: '🚚', description: 'Logistics Partner' },
    { name: 'PayPorter', logo: '🌐', description: 'Cross-border Payments' },
    { name: 'Avalara', logo: '📊', description: 'Tax Compliance' },
    { name: 'Flexport', logo: '📦', description: 'Global Logistics' },
    { name: 'TCCI', logo: '🏛️', description: 'Trade Chamber' },
    { name: 'TOBB', logo: '🏢', description: 'Business Federation' },
    { name: 'Turkic Council', logo: '🤝', description: 'Regional Cooperation' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Solutions & Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve built a comprehensive ecosystem of solutions and partnerships 
            to make Turkey-Central Asia trade seamless and secure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Integrated Solutions
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-3xl">{solution.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {solution.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Trusted Partners
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {partner.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Partnership Stats */}
            <div className="mt-8 bg-blue-600 rounded-xl p-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2.5M</div>
                <div className="text-blue-100 mb-4">Companies Connected</div>
                <div className="text-2xl font-bold mb-2">6</div>
                <div className="text-blue-100">Chambers Engaged</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Join as Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
