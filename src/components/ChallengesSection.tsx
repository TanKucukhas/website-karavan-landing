import { ShieldCheckIcon, CreditCardIcon, TruckIcon, ClipboardDocumentListIcon, BanknotesIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function ChallengesSection() {
  const challenges = [
    { icon: ShieldCheckIcon, color: 'bg-red-50 text-red-700 ring-red-200', title: 'Trust Issues', description: 'No verification system for suppliers and buyers across borders' },
    { icon: CreditCardIcon, color: 'bg-amber-50 text-amber-700 ring-amber-200', title: 'Payment Complexity', description: 'Cross-border payments are slow, expensive, and unreliable' },
    { icon: TruckIcon, color: 'bg-yellow-50 text-yellow-700 ring-yellow-200', title: 'Logistics Nightmare', description: 'Complex shipping, customs, and delivery coordination' },
    { icon: ClipboardDocumentListIcon, color: 'bg-sky-50 text-sky-700 ring-sky-200', title: 'Customs Barriers', description: 'Complicated documentation and regulatory compliance' },
    { icon: BanknotesIcon, color: 'bg-violet-50 text-violet-700 ring-violet-200', title: 'Financing Gaps', description: 'Limited access to trade finance and credit facilities' },
    { icon: LockClosedIcon, color: 'bg-indigo-50 text-indigo-700 ring-indigo-200', title: 'Insurance Complexity', description: 'Difficult to secure comprehensive trade insurance' },
  ];

  return (
    <section id="challenges" className="py-20 lg:py-28 bg-ui-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">B2B Cross-Border Trade Challenges</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Key pain points we eliminate for suppliers and buyers across corridors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {challenges.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className={`group rounded-2xl p-8 ring-1 ${item.color} bg-white/70 backdrop-blur hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}>
                <div className="flex items-start gap-6">
                  <div className={`h-16 w-16 rounded-2xl ${item.color.replace('50', '100')} ring-2 ${item.color.replace('50', '200')} grid place-items-center flex-shrink-0`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mid-Page Email Capture */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be first to access verified suppliers
            </h3>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-red-600">Limited early access spots available.</span> Join the private beta and secure your position in the Turkic States market.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Notified
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
