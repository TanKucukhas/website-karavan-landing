export default function ChallengesSection() {
  const challenges = [
    {
      icon: '🛡️',
      title: 'Trust Issues',
      description: 'No verification system for suppliers and buyers across borders',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      icon: '💳',
      title: 'Payment Complexity',
      description: 'Cross-border payments are slow, expensive, and unreliable',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      icon: '🚚',
      title: 'Logistics Nightmare',
      description: 'Complex shipping, customs, and delivery coordination',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      icon: '📋',
      title: 'Customs Barriers',
      description: 'Complicated documentation and regulatory compliance',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      icon: '💰',
      title: 'Financing Gaps',
      description: 'Limited access to trade finance and credit facilities',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      icon: '🔒',
      title: 'Insurance Complexity',
      description: 'Difficult to secure comprehensive trade insurance',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    }
  ];

  return (
    <section id="challenges" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Challenges of Cross-Border Trade
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional B2B trade between Turkey and Central Asia faces significant 
            barriers that limit growth and create friction for businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${challenge.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <div className="text-4xl mb-4">{challenge.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
              <p className="text-gray-700 leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Solve These Problems?
            </h3>
            <p className="text-gray-600 mb-6">
              Karavan addresses each of these challenges with integrated solutions 
              designed specifically for Turkey-Central Asia trade.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              See How We Solve This
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
