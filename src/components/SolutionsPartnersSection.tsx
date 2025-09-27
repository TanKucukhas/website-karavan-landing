
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
    <section className="lt-section">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">Solutions</h2>
          <p className="lt-subtext">We’ve built a comprehensive ecosystem of solutions to make Turkey-Central Asia trade seamless and secure.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Integrated Solutions</h3>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start gap-4 p-6 lt-card">
                <div className="text-3xl">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-gray-50 border border-gray-200 text-base">{/* reduced icon usage */}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{solution.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
