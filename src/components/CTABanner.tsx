'use client';

import { useState } from 'react';
import Emoji from '@/components/Emoji'

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
            Verified suppliers, secure escrow, logistics included. 
            Be among the first to experience the future of B2B trade.
          </p>

          {/* Enhanced CTA Form */}
          <div className="max-w-lg mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      I want to:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          role === 'buyer' 
                            ? 'border-white bg-white/20 text-white' 
                            : 'border-white/50 bg-transparent text-white hover:bg-white/10'
                        }`}
                      >
                        Find Suppliers
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('seller')}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          role === 'seller' 
                            ? 'border-white bg-white/20 text-white' 
                            : 'border-white/50 bg-transparent text-white hover:bg-white/10'
                        }`}
                      >
                        Start Selling
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 focus:outline-none"
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
                  
                  <button
                    type="submit"
                    className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Get Early Access
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-500 text-white px-8 py-6 rounded-2xl font-semibold text-center">
                <div className="text-4xl mb-2">✓</div>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p>We&apos;ll notify you when we launch.</p>
              </div>
            )}
            <p className="text-blue-100 text-sm mt-4">No fees, no spam.</p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-4"><Emoji symbol="🚀" label="Rocket" size={28} /></div>
              <h3 className="text-lg font-semibold mb-2">Early Access</h3>
              <p className="text-blue-100 text-sm">
                Be the first to use our platform before public launch
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4"><Emoji symbol="💰" label="Money" size={28} /></div>
              <h3 className="text-lg font-semibold mb-2">No Fees</h3>
              <p className="text-blue-100 text-sm">
                Free access during beta period with special pricing
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4"><Emoji symbol="🔒" label="Lock" size={28} /></div>
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
              <div className="text-2xl"><Emoji symbol="🏢" label="Office" size={24} /></div>
              <div className="text-2xl"><Emoji symbol="🏭" label="Factory" size={24} /></div>
              <div className="text-2xl"><Emoji symbol="🏪" label="Store" size={24} /></div>
              <div className="text-2xl"><Emoji symbol="🏬" label="Mall" size={24} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
