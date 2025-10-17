"use client";

import { ShieldCheckIcon, TruckIcon, CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import CountUp from '@/components/CountUp'
import { useTranslations } from 'next-intl'


export default function FeaturesSection() {
  const t = useTranslations('features')
  const features = [
    {
      icon: <ShieldCheckIcon className="h-7 w-7 text-sky-300" />, 
      title: t('paymentInsurance.title'),
      description: t('paymentInsurance.description'),
      benefits: [t('paymentInsurance.benefits.multiple'), t('paymentInsurance.benefits.insurance'), t('paymentInsurance.benefits.risk')]
    },
    {
      icon: <TruckIcon className="h-7 w-7 text-sky-300" />, 
      title: t('logisticsCustoms.title'),
      description: t('logisticsCustoms.description'),
      benefits: [t('logisticsCustoms.benefits.delivery'), t('logisticsCustoms.benefits.customs'), t('logisticsCustoms.benefits.tracking')]
    },
    {
      icon: <CheckCircleIcon className="h-7 w-7 text-sky-300" />, 
      title: t('verifiedSuppliers.title'),
      description: t('verifiedSuppliers.description'),
      benefits: [t('verifiedSuppliers.benefits.verification'), t('verifiedSuppliers.benefits.certification'), t('verifiedSuppliers.benefits.kyb')]
    },
    {
      icon: <BanknotesIcon className="h-7 w-7 text-sky-300" />, 
      title: t('financingInsurance.title'),
      description: t('financingInsurance.description'),
      benefits: [t('financingInsurance.benefits.finance'), t('financingInsurance.benefits.insurance'), t('financingInsurance.benefits.credit')]
    }
  ];

  return (
    <section id="features" className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-6">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['escrow','logistics','verified','finance'].map((b,i)=> (
            <span key={i} className="badge-soft">{t(`badges.${b}`)}</span>
          ))}
        </div>

        {/* Featured Feature - Payment & Insurance */}
        <div className="mb-16">
          <div className="lt-card p-8">
            <div className="flex items-start gap-6">
              <div className="rounded-2xl bg-brand-50 p-4 border border-brand-100">
                <ShieldCheckIcon className="h-10 w-10 text-brand-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('paymentInsurance.title')}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{t('paymentInsurance.description')}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[t('paymentInsurance.benefits.multiple'), t('paymentInsurance.benefits.insurance'), t('paymentInsurance.benefits.risk')].map((benefit, bIndex) => (
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
              <div className="text-gray-700">{t('stats.secureTransactions')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2"><CountUp end={24} />/7</div>
              <div className="text-gray-700">{t('stats.supportAvailable')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2"><CountUp end={5} suffix="+" /></div>
              <div className="text-gray-700">{t('stats.countriesConnected')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
