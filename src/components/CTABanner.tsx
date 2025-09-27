'use client';

import { useState } from 'react';
// Light version without emojis

export default function CTABanner() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [country, setCountry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with HubSpot
    console.log('Form submitted:', { email, role, country });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="lt-section lt-muted relative">
      <div className="lt-container">
        <div className="text-center">
          <h2 className="lt-heading mb-6">Secure Your Early Access Spot</h2>
          <p className="lt-subtext mb-8">
            <span className="font-semibold text-brand-600">Limited spots available.</span> Verified suppliers, secure escrow, logistics included. Be among the first to experience the future of B2B trade.
          </p>

          {/* Enhanced CTA Form */}
          <div className="max-w-lg mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="lt-card p-8">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I want to:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          role === 'buyer' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        Find Suppliers
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('seller')}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          role === 'seller' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        Start Selling
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                      required
                    >
                      <option value="">Select your country</option>
                      <option value="TR">Turkey</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="w-full btn-brand text-lg">Get Early Access</button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-500 text-white px-8 py-6 rounded-2xl font-semibold text-center">
                <div className="text-4xl mb-2">✓</div>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p>We&apos;ll notify you when we launch.</p>
              </div>
            )}
            <p className="text-gray-600 text-sm mt-4">No fees, no spam.</p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">Early Access</h3>
              <p className="text-gray-700 text-sm">Be the first to use our platform before public launch</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No Fees</h3>
              <p className="text-gray-700 text-sm">Free access during beta period with special pricing</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">No Spam</h3>
              <p className="text-gray-700 text-sm">We respect your privacy and only send important updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
