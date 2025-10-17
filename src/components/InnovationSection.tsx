"use client";

// Light version without emoji icons
import CountUp from '@/components/CountUp'
import { useTranslations } from 'next-intl'

export default function InnovationSection() {
  const t = useTranslations('innovation')
  const aiFeatures = t.raw('aiFeatures') as string[]
  const paymentMethods = t.raw('paymentMethods') as { name: string; description: string }[]

  return (
    <section className="lt-section animate-on-scroll bg-brand-sky">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: AI Features */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('aiHeading')}</h3>
            <div className="space-y-3">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 lt-card">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-600" />
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* Innovation Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 lt-card">
                <div className="text-2xl font-bold text-brand-600 mb-1"><CountUp end={95} suffix="%" /></div>
                <div className="text-sm text-gray-700">{t('stats.automationRate')}</div>
              </div>
              <div className="text-center p-4 lt-card">
                <div className="text-2xl font-bold text-brand-600 mb-1"><CountUp end={3} suffix="x" /></div>
                <div className="text-sm text-gray-700">{t('stats.fasterProcessing')}</div>
              </div>
            </div>
          </div>

          {/* Right: Payment Methods */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('paymentMethodsHeading')}</h3>
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="p-6 lt-card">
                  <h4 className="font-semibold text-gray-900 mb-1.5">{method.name}</h4>
                  <p className="text-sm text-gray-700 mb-3">{method.description}</p>
                  <span className="lt-badge">{t('availableBadge')}</span>
                </div>
              ))}
            </div>

            {/* Payment Security */}
            <div className="mt-8 p-6 lt-card">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{t('securityHeading')}</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{t('securityText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
