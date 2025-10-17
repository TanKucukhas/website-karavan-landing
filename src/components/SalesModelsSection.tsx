"use client";
// Light version with Heroicons
import {
  ShoppingCartIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

export default function SalesModelsSection() {
  const t = useTranslations('salesModels')
  const salesModels = [
    {
      name: t('models.directPurchase.name'),
      description: t('models.directPurchase.description'),
      features: t.raw('models.directPurchase.features') as string[],
      color: 'bg-blue-100 text-blue-800',
      icon: ShoppingCartIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: t('models.rfq.name'),
      description: t('models.rfq.description'),
      features: t.raw('models.rfq.features') as string[],
      color: 'bg-green-100 text-green-800',
      icon: EnvelopeIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: t('models.rfp.name'),
      description: t('models.rfp.description'),
      features: t.raw('models.rfp.features') as string[],
      color: 'bg-purple-100 text-purple-800',
      icon: DocumentTextIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: t('models.buyerAuction.name'),
      description: t('models.buyerAuction.description'),
      features: t.raw('models.buyerAuction.features') as string[],
      color: 'bg-orange-100 text-orange-800',
      icon: MegaphoneIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: t('models.sellerAuction.name'),
      description: t('models.sellerAuction.description'),
      features: t.raw('models.sellerAuction.features') as string[],
      color: 'bg-red-100 text-red-800',
      icon: TagIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    }
  ];

  return (
    <section className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salesModels.map((model, index) => (
            <div key={index} className="lt-card p-8">
              {/* Removed platform view to keep compact */}

              {/* Model Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  {model.icon && (() => { const Icon = model.icon!; return <Icon className="h-5 w-5 text-brand-600" /> })()}
                  {model.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">{model.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {model.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-brand-600 rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Status Badge */}
              <div className="text-center">
                <span className="lt-badge">{t('availableNow')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Model Comparison */}
        <div className="mt-16 overflow-hidden rounded-2xl shadow-soft border border-gray-200">
          <div className="bg-brand-sky px-6 py-5">
            <h3 className="text-2xl font-bold text-gray-900 text-center">{t('comparison.heading')}</h3>
            <p className="text-center text-gray-600 mt-1">{t('comparison.subheading')}</p>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr className="text-left text-gray-700">
                  <th className="py-4 px-4 font-semibold">{t('comparison.tableHeaders.model')}</th>
                  <th className="py-4 px-4 font-semibold">{t('comparison.tableHeaders.bestFor')}</th>
                  <th className="py-4 px-4 font-semibold">{t('comparison.tableHeaders.speed')}</th>
                  <th className="py-4 px-4 font-semibold">{t('comparison.tableHeaders.priceControl')}</th>
                  <th className="py-4 px-4 font-semibold">{t('comparison.tableHeaders.complexity')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">{t('models.directPurchase.name')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.directPurchase.bestFor')}</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs">{t('comparison.rows.directPurchase.speed')}</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-green-500 rounded" style={{ width: '95%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.directPurchase.priceControl')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.directPurchase.complexity')}</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">{t('models.rfq.name')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfq.bestFor')}</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">{t('comparison.rows.rfq.speed')}</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-brand-500 rounded" style={{ width: '70%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfq.priceControl')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfq.complexity')}</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">{t('models.rfp.name')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfp.bestFor')}</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">{t('comparison.rows.rfp.speed')}</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-amber-500 rounded" style={{ width: '40%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfp.priceControl')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.rfp.complexity')}</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">{t('models.buyerAuction.name')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.buyerAuction.bestFor')}</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">{t('comparison.rows.buyerAuction.speed')}</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-brand-500 rounded" style={{ width: '55%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.buyerAuction.priceControl')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.buyerAuction.complexity')}</td>
                </tr>
                <tr className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900">{t('models.sellerAuction.name')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.sellerAuction.bestFor')}</td>
                  <td className="py-4 px-4 text-gray-800"><span className="px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">{t('comparison.rows.sellerAuction.speed')}</span>
                    <div className="mt-1 h-1.5 rounded bg-gray-100">
                      <div className="h-1.5 bg-brand-500 rounded" style={{ width: '55%' }} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.sellerAuction.priceControl')}</td>
                  <td className="py-4 px-4 text-gray-600">{t('comparison.rows.sellerAuction.complexity')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-brand text-lg" onClick={() => {
            // Lazy import to avoid SSR overhead if analytics not needed
            import('@/lib/analytics').then(m => m.analytics.ctaClick('sales-models'))
          }}>{t('ctaExplore')}</button>
        </div>
      </div>
    </section>
  );
}
