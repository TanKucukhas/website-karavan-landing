'use client';

import { useState, useEffect, useRef } from 'react';
import Flag from '@/components/Flag'
import ChartMini from '@/components/ChartMini'
import CountUp from '@/components/CountUp'
import { ChartBarIcon, GlobeAltIcon, UsersIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function MetricsSection() {
  const [counts, setCounts] = useState({
    suppliers: 0,
    shippingTime: 0,
    languages: 0,
    cohorts: 0
  });

  // Log only when values change to avoid spam
  const prev = useRef<string>('');
  useEffect(() => {
    const now = JSON.stringify(counts);
    if (now !== prev.current) {
      // eslint-disable-next-line no-console
      console.log('Current counts:', counts);
      prev.current = now;
    }
  }, [counts]);

  const metrics = [
    {
      value: '150+',
      label: 'Suppliers Onboarded',
      description: 'Verified Turkish exporters ready to serve Central Asian markets',
      color: 'text-blue-600',
      footnote: 'Pilot results from TR & UZ markets'
    },
    {
      value: '7-14',
      label: 'Days Shipping Lead Time',
      description: 'Average delivery time from Turkey to Central Asia',
      color: 'text-green-600',
      footnote: 'Based on pilot shipments'
    },
    {
      value: '6',
      label: 'Languages Supported',
      description: 'Turkish, English, Russian, Uzbek, Kazakh, Kyrgyz',
      color: 'text-purple-600',
      footnote: 'Native speaker support'
    },
    {
      value: '91%',
      label: 'Success Rate',
      description: 'Transaction completion rate in pilot programs',
      color: 'text-orange-600',
      footnote: 'Pilot results in TR & UZ'
    }
  ];

  const coreMarkets = [
    { country: 'Turkey', flag: '🇹🇷', status: 'live', populationM: 86, color: 'bg-blue-100 text-blue-800' },
    { country: 'Uzbekistan', flag: '🇺🇿', status: 'expanding', populationM: 36, color: 'bg-green-100 text-green-800' },
    { country: 'Kazakhstan', flag: '🇰🇿', status: 'expanding', populationM: 20, color: 'bg-green-100 text-green-800' },
    { country: 'Kyrgyzstan', flag: '🇰🇬', status: 'live', populationM: 7, color: 'bg-blue-100 text-blue-800' },
    { country: 'Turkmenistan', flag: '🇹🇲', status: 'live', populationM: 6, color: 'bg-blue-100 text-blue-800' },
    { country: 'Azerbaijan', flag: '🇦🇿', status: 'expanding', populationM: 10, color: 'bg-green-100 text-green-800' }
  ].sort((a, b) => {
    // Live markets first, then expanding
    if (a.status === b.status) return 0
    return a.status === 'live' ? -1 : 1
  });

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
    <section className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Secure B2B Trade Metrics</h2>
          <p className="lt-subtext">Our platform is already facilitating secure trade between Turkey and Central Asia with measurable results.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="lt-card p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {index === 0 && <UsersIcon className="h-6 w-6 text-blue-600" />}
                {index === 1 && <BoltIcon className="h-6 w-6 text-green-600" />}
                {index === 2 && <GlobeAltIcon className="h-6 w-6 text-purple-600" />}
                {index === 3 && <ChartBarIcon className="h-6 w-6 text-orange-600" />}
              </div>
              <div className={`text-5xl font-bold ${metric.color} mb-2`}>
                {index === 0 && <CountUp end={150} suffix="+" />}
                {index === 1 && <span>7–14</span>}
                {index === 2 && <CountUp end={6} />}
                {index === 3 && <CountUp end={91} suffix="%" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</h3>
              <p className="text-gray-600 text-sm mb-3">{metric.description}</p>
              <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 inline-block border border-gray-200">{metric.footnote}</div>
            </div>
          ))}
        </div>

        {/* Core Markets Strip */}
        <div className="lt-card p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Markets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreMarkets.map((market, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <div className="text-3xl mb-2"><Flag code={
                  market.country === 'Turkey' ? 'tr' :
                  market.country === 'Uzbekistan' ? 'uz' :
                  market.country === 'Kazakhstan' ? 'kz' :
                  market.country === 'Kyrgyzstan' ? 'kg' :
                  market.country === 'Turkmenistan' ? 'tm' :
                  market.country === 'Azerbaijan' ? 'az' : 'tr'} size="lg" title={market.country} /></div>
                <div className="font-semibold text-gray-900 mb-1.5">{market.country}</div>
                <div className="text-xs text-gray-600 mb-2"><CountUp end={market.populationM} suffix="M people" /></div>
                <span className="lt-badge">
                  {market.status === 'live' ? 'Live' : 'Expanding'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Chart: Monthly Growth */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="lt-card p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Monthly RFQs</h4>
            <p className="text-sm text-gray-600 mb-4">Demand growth driven by verified buyers</p>
            <ChartMini
              data={[
                { label: 'Apr', value: 18, color: '#3B82F6' },
                { label: 'May', value: 24, color: '#3B82F6' },
                { label: 'Jun', value: 30, color: '#3B82F6' },
                { label: 'Jul', value: 36, color: '#3B82F6' },
                { label: 'Aug', value: 44, color: '#3B82F6' },
                { label: 'Sep', value: 52, color: '#3B82F6' },
              ]}
              max={60}
            />
          </div>
          <div className="lt-card p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Fulfillment Speed</h4>
            <p className="text-sm text-gray-600 mb-4">Average days from order to delivery</p>
            <ChartMini
              data={[
                { label: 'TR→UZ', value: 12, color: '#10B981' },
                { label: 'TR→KZ', value: 14, color: '#10B981' },
                { label: 'TR→KG', value: 11, color: '#10B981' },
                { label: 'TR→TM', value: 15, color: '#10B981' },
              ]}
              max={20}
            />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              <CountUp end={2400000} prefix="$" />
            </div>
            <div className="text-gray-600">Total Trade Volume</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              <CountUp end={98} suffix="%" />
            </div>
            <div className="text-gray-600">Transaction Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              <CountUp end={24} suffix="h" />
            </div>
            <div className="text-gray-600">Average Resolution Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
