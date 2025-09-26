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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve built a comprehensive ecosystem of solutions to make Turkey-Central Asia trade seamless and secure.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Integrated Solutions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl">{solution.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
