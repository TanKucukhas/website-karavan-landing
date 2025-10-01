'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { analytics } from '@/lib/analytics'


export default function CTABanner() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [country, setCountry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const hutk = typeof document !== 'undefined'
        ? document.cookie.split('; ').find(c => c.startsWith('hubspotutk='))?.split('=')[1]
        : undefined;
      const utm = typeof window !== 'undefined'
        ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
        : {};
      const res = await fetch('/api/early-access/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          country,
          source: 'secure-early-access-cta',
          pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
          pageName: typeof document !== 'undefined' ? document.title : undefined,
          utm,
          hutk,
          lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
          honeypot: ''
        })
      });
      if (!res.ok) throw new Error('Submit failed');
      analytics.heroFormSubmit(role)
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="section-padding bg-gradient-to-r from-[#0b1220] via-[#0e1a33] to-[#0b1220] text-white relative animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            Secure Your Early Access Spot
          </h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">Limited spots available. Verified suppliers, secure escrow, logistics included. Be among the first to experience the future of B2B trade.</p>

          {/* Enhanced CTA Form */}
          <div className="max-w-lg mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email Address</label>
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
                    <label className="block text-sm font-semibold text-white mb-2">I want to:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setRole('buyer'); analytics.roleChange('buyer'); }}
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
                        onClick={() => { setRole('seller'); analytics.roleChange('seller'); }}
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
                    <label htmlFor="country" className="block text-sm font-semibold text-white mb-2">Country</label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                      required
                    >
                      <option value="">Select your country</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-gradient-outline text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    onClick={() => analytics.ctaClick('cta-banner', role)}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Get Early Access'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-500 text-white px-8 py-6 rounded-2xl font-semibold text-center">
                <CheckCircleIcon className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-2">Thanks for your interest!</h3>
                <p>We&apos;ll send the next steps to your email soon.</p>
              </div>
            )}
            <p className="text-white/90 text-sm mt-4">No fees. No spam. Just early access.</p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">Early Access</h3>
              <p className="text-white/90 text-sm">Be the first to use our platform before public launch</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">No Fees</h3>
              <p className="text-white/90 text-sm">Free access during beta period with special pricing</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">No Spam</h3>
              <p className="text-white/90 text-sm">We respect your privacy and only send important updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
