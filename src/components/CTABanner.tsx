'use client';

import { useState } from 'react';

export default function CTABanner() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Early Access Program
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be among the first to experience the future of B2B trade. 
            Private beta with no fees and no spam.
          </p>

          {/* CTA Form */}
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Early Access
                </button>
              </form>
            ) : (
              <div className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold">
                ✅ Thank you! We&apos;ll be in touch soon.
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Early Access</h3>
              <p className="text-blue-100 text-sm">
                Be the first to use our platform before public launch
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold mb-2">No Fees</h3>
              <p className="text-blue-100 text-sm">
                Free access during beta period with special pricing
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">No Spam</h3>
              <p className="text-blue-100 text-sm">
                We respect your privacy and only send important updates
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm mb-4">
              Trusted by leading companies
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl">🏢</div>
              <div className="text-2xl">🏭</div>
              <div className="text-2xl">🏪</div>
              <div className="text-2xl">🏬</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
