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
    <section id="challenges" className="lt-section lt-muted">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-3">B2B Cross-Border Trade Challenges</h2>
          <p className="lt-subtext">Key pain points we eliminate for suppliers and buyers across corridors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {challenges.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="group lt-card p-6">
                <div className="flex items-start gap-5">
                  <div className="h-12 w-12 rounded-xl grid place-items-center bg-gray-50 border border-gray-200 flex-shrink-0">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mid-Page Email Capture */}
        <div className="mt-16 lt-card p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Be first to access verified suppliers</h3>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold text-brand-600">Limited early access spots available.</span> Join the private beta and secure your position in the Turkic States market.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-600 focus:border-transparent outline-none"
                required
              />
              <button type="submit" className="btn-brand">Get Notified</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
