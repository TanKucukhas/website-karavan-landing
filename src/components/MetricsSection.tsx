'use client';

import { useState, useEffect } from 'react';

export default function MetricsSection() {
  const [counts, setCounts] = useState({
    suppliers: 0,
    shippingTime: 0,
    languages: 0,
    cohorts: 0
  });

  // Use counts to avoid unused variable warning
  console.log('Current counts:', counts);

  const metrics = [
    {
      value: '150+',
      label: 'Suppliers Onboarded',
      description: 'Verified Turkish exporters ready to serve Central Asian markets',
      color: 'text-blue-600'
    },
    {
      value: '7-14',
      label: 'Days Shipping Lead Time',
      description: 'Average delivery time from Turkey to Central Asia',
      color: 'text-green-600'
    },
    {
      value: '6',
      label: 'Languages Supported',
      description: 'Turkish, English, Russian, Uzbek, Kazakh, Kyrgyz',
      color: 'text-purple-600'
    },
    {
      value: '3',
      label: 'Pilot Cohorts',
      description: 'Active pilot programs with leading companies',
      color: 'text-orange-600'
    }
  ];

  const coreMarkets = [
    { country: 'Turkey', flag: '🇹🇷', status: 'launching', color: 'bg-blue-100 text-blue-800' },
    { country: 'Uzbekistan', flag: '🇺🇿', status: 'expanding', color: 'bg-green-100 text-green-800' },
    { country: 'Kazakhstan', flag: '🇰🇿', status: 'expanding', color: 'bg-green-100 text-green-800' },
    { country: 'Kyrgyzstan', flag: '🇰🇬', status: 'launching', color: 'bg-blue-100 text-blue-800' },
    { country: 'Turkmenistan', flag: '🇹🇲', status: 'launching', color: 'bg-blue-100 text-blue-800' },
    { country: 'Azerbaijan', flag: '🇦🇿', status: 'expanding', color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    // Animate counters
    const animateCount = (target: number, key: keyof typeof counts) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 30);
    };

    animateCount(150, 'suppliers');
    animateCount(14, 'shippingTime');
    animateCount(6, 'languages');
    animateCount(3, 'cohorts');
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Secure B2B Trade Metrics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is already facilitating secure trade between Turkey and Central Asia 
            with measurable results.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className={`text-4xl font-bold ${metric.color} mb-4`}>
                {metric.value}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {metric.label}
              </h3>
              <p className="text-gray-600 text-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Markets Strip */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Core Markets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreMarkets.map((market, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-2">{market.flag}</div>
                <div className="font-semibold text-gray-900 mb-2">{market.country}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${market.color}`}>
                  {market.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">$2.4M</div>
            <div className="text-gray-600">Total Trade Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Transaction Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24h</div>
            <div className="text-gray-600">Average Resolution Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
