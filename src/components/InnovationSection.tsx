import Emoji from '@/components/Emoji'

export default function InnovationSection() {
  const aiFeatures = [
    'Unified payment processing across multiple currencies',
    'Automated compliance checking and documentation',
    'AI-powered risk assessment and fraud detection',
    'Smart document automation and translation',
    'Real-time analytics and reporting dashboard'
  ];

  const paymentMethods = [
    {
      icon: <Emoji symbol="🏦" label="Bank" size={24} />, 
      name: 'Bank Transfers',
      description: 'Direct bank-to-bank transfers with SWIFT support',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: <Emoji symbol="💳" label="Card" size={24} />, 
      name: 'Credit Cards',
      description: 'Visa, Mastercard, and local card networks',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: <Emoji symbol="📱" label="Wallet" size={24} />, 
      name: 'Digital Wallets',
      description: 'Apple Pay, Google Pay, and regional wallets',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: <Emoji symbol="🌍" label="International" size={24} />, 
      name: 'International Transfers',
      description: 'Cross-border payment solutions and remittances',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Driven Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform leverages cutting-edge AI technology to automate and 
            optimize every aspect of cross-border trade.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: AI Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              AI-Powered Features
            </h3>
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* Innovation Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">Automation Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">3x</div>
                <div className="text-sm text-gray-600">Faster Processing</div>
              </div>
            </div>
          </div>

          {/* Right: Payment Methods */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Multiple Payment Methods
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{method.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {method.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${method.color}`}>
                    Available
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Security */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Emoji symbol="🔒" label="Lock" size={18} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Bank-Grade Security
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                All transactions are protected with 256-bit SSL encryption, 
                PCI DSS compliance, and advanced fraud detection systems.
              </p>
            </div>
          </div>
        </div>

        {/* Innovation Showcase */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              The Future of B2B Trade
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our AI-driven platform is constantly learning and improving, 
              making cross-border trade more efficient, secure, and accessible.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">AI Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">0.1s</div>
                <div className="text-blue-100">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
