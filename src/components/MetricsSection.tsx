'use client';

import Flag from '@/components/Flag'
import CountUp from '@/components/CountUp'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function MetricsSection() {
  const t = useTranslations('metrics')
  const metrics = [
    {
      value: '65+',
      label: t('cards.suppliersOnboarded.label'),
      description: t('cards.suppliersOnboarded.description'),
      color: 'text-brand-600',
      footnote: t('cards.suppliersOnboarded.footnote')
    },
    {
      value: '7-14',
      label: t('cards.shippingLeadTime.label'),
      description: t('cards.shippingLeadTime.description'),
      color: 'text-green-600',
      footnote: t('cards.shippingLeadTime.footnote')
    },
    {
      value: '3',
      label: t('cards.languagesSupported.label'),
      description: t('cards.languagesSupported.description'),
      color: 'text-purple-600',
      footnote: t('cards.languagesSupported.footnote')
    },
    {
      value: '190',
      label: t('cards.brands.label'),
      description: t('cards.brands.description'),
      color: 'text-orange-600',
      footnote: t('cards.brands.footnote')
    }
  ];

  const coreMarkets = [
    { country: 'Türkiye', flagCode: 'tr', status: 'live', populationM: 86, color: 'bg-brand-50 text-brand-800' },
    { country: 'Uzbekistan', flagCode: 'uz', status: 'expanding', populationM: 36, color: 'bg-green-100 text-green-800' },
    { country: 'Kazakhstan', flagCode: 'kz', status: 'expanding', populationM: 20, color: 'bg-green-100 text-green-800' },
    { country: 'Kyrgyzstan', flagCode: 'kg', status: 'live', populationM: 7, color: 'bg-brand-50 text-brand-800' },
    { country: 'Turkmenistan', flagCode: 'tm', status: 'live', populationM: 6, color: 'bg-brand-50 text-brand-800' },
    { country: 'Azerbaijan', flagCode: 'az', status: 'expanding', populationM: 10, color: 'bg-green-100 text-green-800' },
    { country: 'Hungary', flagCode: 'hu', status: 'expanding', populationM: 10, color: 'bg-green-100 text-green-800' },
    { country: 'KKTC', flagCode: 'tr', status: 'expanding', populationM: 1.3, color: 'bg-green-100 text-green-800' }
  ].sort((a, b) => {
    // Live markets first, then expanding
    if (a.status === b.status) return 0
    return a.status === 'live' ? -1 : 1
  });


  return (
    <section className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        {/* KPI Cards - Single Stack */}
        <div className="space-y-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="lt-card p-8 text-center">
              <div className={`text-5xl font-bold ${metric.color} mb-2`}>
                {index === 0 && <CountUp end={65} suffix="+" />}
                {index === 1 && <span>7–14</span>}
                {index === 2 && <CountUp end={3} />}
                {index === 3 && <CountUp end={190} />}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</h3>
              <p className="text-gray-600 text-sm mb-3">{metric.description}</p>
              <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 inline-block border border-gray-200">{metric.footnote}</div>
            </div>
          ))}
        </div>

        {/* Core Markets Strip */}
        <div className="lt-card p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('coreMarkets.heading')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {coreMarkets.map((market, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <div className="text-3xl mb-2 flex justify-center">
                  {market.country === 'KKTC' ? (
                    <Image 
                      src="/images/flags/kktc.png" 
                      alt="KKTC Flag" 
                      width={48} 
                      height={32}
                      className="drop-shadow-sm"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Flag 
                      code={market.flagCode} 
                      size="lg" 
                      title={market.country}
                      shadow={true}
                    />
                  )}
                </div>
                <div className="font-semibold text-gray-900 mb-1.5">{market.country}</div>
                <div className="text-xs text-gray-600 mb-2"><CountUp end={market.populationM} suffix={t('coreMarkets.peopleSuffix')} /></div>
                <span className="lt-badge">
                  {market.status === 'live' ? t('coreMarkets.live') : t('coreMarkets.expanding')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
