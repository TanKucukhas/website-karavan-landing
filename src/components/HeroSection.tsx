'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Flag from '@/components/Flag'

export default function HeroSection() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tradeRoutes = [
    { from: 'TR', to: 'UZ', label: 'Türkiye → Uzbekistan' },
    { from: 'TR', to: 'KZ', label: 'Türkiye → Kazakhstan' },
    { from: 'TR', to: 'KG', label: 'Türkiye → Kyrgyzstan' },
    { from: 'TR', to: 'TM', label: 'Türkiye → Turkmenistan' },
    { from: 'TR', to: 'AZ', label: 'Türkiye → Azerbaijan' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hutk = typeof document !== 'undefined'
        ? document.cookie.split('; ').find(c => c.startsWith('hubspotutk='))?.split('=')[1]
        : undefined;
      const utm = typeof window !== 'undefined'
        ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
        : {};
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          source: 'hero',
          pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
          pageName: typeof document !== 'undefined' ? document.title : undefined,
          utm,
          hutk,
          lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
          honeypot: ''
        })
      });
      if (!res.ok) throw new Error('Submit failed');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes tradeRoute {
          0%, 100% { opacity: 0.3; transform: rotate(var(--rotation)) scaleX(0.8); }
          50% { opacity: 1; transform: rotate(var(--rotation)) scaleX(1); }
        }
      `}</style>
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-sky overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDZGOUEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Interactive Map Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--ink)] mb-6 leading-tight">
              Early access to{' '}
              <span className="text-brand-600">verified suppliers</span> in the Turkic States
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl">
              Secure B2B trade with escrow, logistics, and financing included. 
              <span className="font-semibold text-coral-600"> Limited early access spots available.</span>
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-2xl">
              Join the private beta — no fees, no spam, early access only.
            </p>
            
            {/* Email Capture Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[color:var(--ink)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[color:var(--ink)] mb-2">
                      I want to:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          role === 'buyer' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        Find Suppliers
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('seller')}
                        className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                          role === 'seller' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        Start Selling
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-coral-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-coral-600 transition-colors shadow-lg"
                  >
                    Get Early Access
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Thanks for your interest!</h3>
                  <p className="text-green-700">We&apos;ll send the next steps to your email soon.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right - Interactive Map */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Simplified Map */}
              <div className="relative w-full h-96 bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl">
                {/* Countries */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                    {/* Türkiye */}
                    <div 
                      className="bg-brand-600 text-white p-4 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform"
                      onMouseEnter={() => setHoveredCountry('TR')}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="text-2xl mb-2"><Flag code="tr" title="Türkiye" /></div>
                      <div className="font-semibold">Türkiye</div>
                    </div>
                    
                    {/* Central Asia */}
                    <div className="space-y-2">
                      <div 
                        className="bg-brand-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('UZ')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg"><Flag code="uz" title="Uzbekistan" size="md" /></div>
                        <div className="text-sm font-semibold">Uzbekistan</div>
                      </div>
                      <div 
                        className="bg-brand-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('KZ')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg"><Flag code="kz" title="Kazakhstan" size="md" /></div>
                        <div className="text-sm font-semibold">Kazakhstan</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div 
                        className="bg-brand-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('KG')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg"><Flag code="kg" title="Kyrgyzstan" size="md" /></div>
                        <div className="text-sm font-semibold">Kyrgyzstan</div>
                      </div>
                      <div 
                        className="bg-brand-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('TM')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg"><Flag code="tm" title="Turkmenistan" size="md" /></div>
                        <div className="text-sm font-semibold">Turkmenistan</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Trade Routes */}
                <div className="absolute inset-0 pointer-events-none">
                  {tradeRoutes.map((route, index) => (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '20%',
                        width: '60%',
                        height: '3px',
                        background: 'linear-gradient(90deg, #3069B4, #5FA0E4)',
                        transform: `rotate(${index * 15 - 30}deg)`,
                        transformOrigin: 'left center',
                        animation: `tradeRoute 3s ease-in-out infinite`,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    >
                      <div className="w-2 h-2 bg-brand-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 animate-ping"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip */}
              {hoveredCountry && (
                <div className="absolute top-4 right-4 bg-gray-900 text-white p-3 rounded-lg shadow-lg">
                  <div className="font-semibold">
                    {tradeRoutes.find(r => r.from === hoveredCountry || r.to === hoveredCountry)?.label}
                  </div>
                  <div className="text-sm text-gray-300">
                    Active trade corridor
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
    </>
  );
}
