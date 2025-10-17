"use client";

// Light version without emoji icons
import CountUp from '@/components/CountUp'

export default function InnovationSection() {
  const aiFeatures = [
    'Unified payment processing across multiple currencies',
    'Automated compliance checking and documentation',
    'AI-powered risk assessment and fraud detection',
    'Smart document automation and translation',
    'Real-time analytics and reporting dashboard'
  ];

  const paymentMethods = [
    { name: 'Bank Transfers', description: 'Direct bank-to-bank transfers with SWIFT support' },
    { name: 'Credit Cards', description: 'Visa, Mastercard, and local card networks' },
    { name: 'International Transfers', description: 'Cross-border payment solutions and remittances' },
  ];

  return (
    <section className="lt-section animate-on-scroll bg-brand-sky">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Platform Innovation</h2>
          <p className="lt-subtext">Our platform leverages cutting-edge technology to automate and optimize every aspect of cross-border trade.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: AI Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Features</h3>
            <div className="space-y-3">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 lt-card">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-600" />
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* Innovation Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 lt-card">
                <div className="text-2xl font-bold text-brand-600 mb-1"><CountUp end={95} suffix="%" /></div>
                <div className="text-sm text-gray-700">Automation Rate</div>
              </div>
              <div className="text-center p-4 lt-card">
                <div className="text-2xl font-bold text-brand-600 mb-1"><CountUp end={3} suffix="x" /></div>
                <div className="text-sm text-gray-700">Faster Processing</div>
              </div>
            </div>
          </div>

          {/* Right: Payment Methods */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Multiple Payment Methods</h3>
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="p-6 lt-card">
                  <h4 className="font-semibold text-gray-900 mb-1.5">{method.name}</h4>
                  <p className="text-sm text-gray-700 mb-3">{method.description}</p>
                  <span className="lt-badge">Available</span>
                </div>
              ))}
            </div>

            {/* Payment Security */}
            <div className="mt-8 p-6 lt-card">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Bank-Grade Security</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                All transactions are protected with 256-bit SSL encryption, PCI DSS compliance, and advanced fraud detection systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
