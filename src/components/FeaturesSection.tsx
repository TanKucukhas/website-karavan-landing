"use client";

import { ShieldCheckIcon, TruckIcon, CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import CountUp from '@/components/CountUp'


export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="h-7 w-7 text-sky-300" />, 
      title: 'Escrow & Dispute Handling',
      description: 'Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.',
      benefits: ['Secure transactions', 'Automated disputes', 'Risk mitigation']
    },
    {
      icon: <TruckIcon className="h-7 w-7 text-sky-300" />, 
      title: 'Logistics & Customs',
      description: 'End-to-end logistics coordination with customs clearance and documentation support.',
      benefits: ['Door-to-door delivery', 'Customs clearance', 'Real-time tracking']
    },
    {
      icon: <CheckCircleIcon className="h-7 w-7 text-sky-300" />, 
      title: 'Verified Suppliers',
      description: 'Comprehensive verification system with business credentials, certifications, and trade history.',
      benefits: ['Business verification', 'Certification tracking', 'Trade history']
    },
    {
      icon: <BanknotesIcon className="h-7 w-7 text-sky-300" />, 
      title: 'Financing & Insurance',
      description: 'Integrated trade finance solutions and comprehensive insurance coverage for all transactions.',
      benefits: ['Trade finance', 'Insurance coverage', 'Credit facilities']
    }
  ];

  return (
    <section id="features" className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-6">
          <h2 className="lt-heading mb-4">Why Trade on Karavan?</h2>
          <p className="lt-subtext">Integrated solutions that eliminate the complexity of cross-border B2B trade.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['Escrow','Logistics','Verified','Finance'].map((b,i)=> (
            <span key={i} className="badge-soft">{b}</span>
          ))}
        </div>

        {/* Featured Feature - Escrow */}
        <div className="mb-16">
          <div className="lt-card p-8">
            <div className="flex items-start gap-6">
              <div className="rounded-2xl bg-brand-50 p-4 border border-brand-100">
                <ShieldCheckIcon className="h-10 w-10 text-brand-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Escrow & Dispute Handling</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Secure transactions', 'Automated disputes', 'Risk mitigation'].map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 border border-gray-200">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      <span className="text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Features (reduced icon usage) */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.slice(1).map((feature, index) => (
            <div key={index} className="lt-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{feature.description}</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                {feature.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 inline-block" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="lt-card p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2"><CountUp end={100} suffix="%" /></div>
              <div className="text-gray-700">Secure Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2"><CountUp end={24} />/7</div>
              <div className="text-gray-700">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2"><CountUp end={5} suffix="+" /></div>
              <div className="text-gray-700">Countries Connected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
