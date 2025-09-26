'use client';

import { useState } from 'react';

export default function HeroSection() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const tradeRoutes = [
    { from: 'TR', to: 'UZ', label: 'Turkey → Uzbekistan' },
    { from: 'TR', to: 'KZ', label: 'Turkey → Kazakhstan' },
    { from: 'TR', to: 'KG', label: 'Turkey → Kyrgyzstan' },
    { from: 'TR', to: 'TM', label: 'Turkey → Turkmenistan' },
    { from: 'TR', to: 'AZ', label: 'Turkey → Azerbaijan' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDZGOUEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Interactive Map Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Turkish Exporters with{' '}
              <span className="text-blue-600">Central Asian Markets</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Karavan is the B2B platform that simplifies cross-border trade between Turkey 
              and Central Asia. Trust, payments, logistics, and customs - all in one place.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                Start Selling
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                Find Suppliers
              </button>
            </div>
          </div>

          {/* Right - Interactive Map */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Simplified Map */}
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                {/* Countries */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                    {/* Turkey */}
                    <div 
                      className="bg-blue-600 text-white p-4 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform"
                      onMouseEnter={() => setHoveredCountry('TR')}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="text-2xl mb-2">🇹🇷</div>
                      <div className="font-semibold">Turkey</div>
                    </div>
                    
                    {/* Central Asia */}
                    <div className="space-y-2">
                      <div 
                        className="bg-green-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('UZ')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg">🇺🇿</div>
                        <div className="text-sm font-semibold">Uzbekistan</div>
                      </div>
                      <div 
                        className="bg-green-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('KZ')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg">🇰🇿</div>
                        <div className="text-sm font-semibold">Kazakhstan</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div 
                        className="bg-green-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('KG')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg">🇰🇬</div>
                        <div className="text-sm font-semibold">Kyrgyzstan</div>
                      </div>
                      <div 
                        className="bg-green-600 text-white p-2 rounded text-center cursor-pointer hover:scale-105 transition-transform"
                        onMouseEnter={() => setHoveredCountry('TM')}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <div className="text-lg">🇹🇲</div>
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
                      className="absolute animate-pulse"
                      style={{
                        top: '50%',
                        left: '20%',
                        width: '60%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #006F9E, #10B981)',
                        transform: `rotate(${index * 15 - 30}deg)`,
                        transformOrigin: 'left center',
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
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
  );
}
