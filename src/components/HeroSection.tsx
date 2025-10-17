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
      <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Mobile-First Hero Layout */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Map Section */}
          <div className="relative h-64 md:h-80 lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-b-3xl">
              {/* Simplified Map for Mobile */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {/* Türkiye - Highlighted */}
                  <div className="bg-red-500 text-white p-3 rounded-xl text-center shadow-lg">
                    <div className="text-2xl mb-1"><Flag code="tr" title="Türkiye" /></div>
                    <div className="text-sm font-bold">Türkiye</div>
                  </div>
                  
                  {/* Central Asia Countries */}
                  <div className="space-y-2">
                    <div className="bg-blue-500 text-white p-2 rounded-lg text-center">
                      <div className="text-lg"><Flag code="uz" title="Uzbekistan" size="sm" /></div>
                      <div className="text-xs font-semibold">Uzbekistan</div>
                    </div>
                    <div className="bg-blue-500 text-white p-2 rounded-lg text-center">
                      <div className="text-lg"><Flag code="kz" title="Kazakhstan" size="sm" /></div>
                      <div className="text-xs font-semibold">Kazakhstan</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Trade Routes */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-center px-4 py-8 lg:py-12">
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center lg:text-left">
                {/* Main Headline */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                  <span className="block">Türk Devletlerinde</span>
                  <span className="block text-blue-300">doğrulanmış tedarikçilere</span>
                  <span className="block text-blue-200">erken erişim</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-blue-100 mb-2 lg:mb-4 max-w-2xl mx-auto lg:mx-0">
                  Sigorta, lojistik ve finansman dahil güvenli B2B ticaret.
                </p>
                <p className="text-base md:text-lg font-semibold text-orange-400 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
                  Sınırlı erken erişim kontenjanı.
                </p>
                <p className="text-sm md:text-base text-blue-200 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0">
                  Özel beta'ya katılın — ücret yok, spam yok, sadece erken erişim.
                </p>
                
                {/* Email Capture Form */}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200">
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                          E-posta Adresi
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sizin@sirketiniz.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          İstediğim:
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRole('buyer')}
                            className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              role === 'buyer' 
                                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm'
                            }`}
                          >
                            Tedarikçi Bul
                          </button>
                          <button
                            type="button"
                            onClick={() => setRole('seller')}
                            className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              role === 'seller' 
                                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm'
                            }`}
                          >
                            Satmaya Başla
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Erken Erişim Al
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="max-w-md mx-auto lg:mx-0">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-lg">
                      <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">İlginiz için teşekkürler!</h3>
                      <p className="text-green-700">Sonraki adımları yakında e-postanıza göndereceğiz.</p>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="mt-8 lg:mt-10 max-w-md mx-auto lg:mx-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm md:text-base">Üyelik ücreti yok</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm md:text-base">Yalnızca kullandığınız hizmetler için ödeme yapın</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Map Section (Hidden on Mobile) */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
          <div className="h-full bg-white rounded-l-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Desktop Interactive Map */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 w-full max-w-lg">
                  {/* Türkiye */}
                  <div 
                    className="bg-red-500 text-white p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    onMouseEnter={() => setHoveredCountry('TR')}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <div className="text-2xl mb-2"><Flag code="tr" title="Türkiye" /></div>
                    <div className="font-semibold">Türkiye</div>
                  </div>
                  
                  {/* Central Asia */}
                  <div className="space-y-3">
                    <div 
                      className="bg-blue-500 text-white p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                      onMouseEnter={() => setHoveredCountry('UZ')}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="text-lg"><Flag code="uz" title="Uzbekistan" size="md" /></div>
                      <div className="text-sm font-semibold">Uzbekistan</div>
                    </div>
                    <div 
                      className="bg-blue-500 text-white p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                      onMouseEnter={() => setHoveredCountry('KZ')}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="text-lg"><Flag code="kz" title="Kazakhstan" size="md" /></div>
                      <div className="text-sm font-semibold">Kazakhstan</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div 
                      className="bg-blue-500 text-white p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                      onMouseEnter={() => setHoveredCountry('KG')}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="text-lg"><Flag code="kg" title="Kyrgyzstan" size="md" /></div>
                      <div className="text-sm font-semibold">Kyrgyzstan</div>
                    </div>
                    <div 
                      className="bg-blue-500 text-white p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform shadow-md"
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
                      background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                      transform: `rotate(${index * 15 - 30}deg)`,
                      transformOrigin: 'left center',
                      animation: `tradeRoute 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 animate-ping"></div>
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce lg:hidden">
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
}
