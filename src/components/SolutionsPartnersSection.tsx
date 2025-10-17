
import { 
  ShieldCheckIcon, 
  CreditCardIcon, 
  TruckIcon, 
  ClipboardDocumentListIcon, 
  LockClosedIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function SolutionsPartnersSection() {
  const t = useTranslations('solutions')
  const solutions = [
    {
      icon: ShieldCheckIcon,
      title: t('items.trustVerification.title'),
      description: t('items.trustVerification.description'),
      footnote: t('items.trustVerification.footnote')
    },
    {
      icon: CreditCardIcon,
      title: t('items.securePayments.title'),
      description: t('items.securePayments.description'),
      footnote: t('items.securePayments.footnote')
    },
    {
      icon: TruckIcon,
      title: t('items.logisticsCoordination.title'),
      description: t('items.logisticsCoordination.description'),
      footnote: t('items.logisticsCoordination.footnote')
    },
    {
      icon: ClipboardDocumentListIcon,
      title: t('items.customsCompliance.title'),
      description: t('items.customsCompliance.description'),
      footnote: t('items.customsCompliance.footnote')
    },
    {
      icon: LockClosedIcon,
      title: t('items.insuranceCoverage.title'),
      description: t('items.insuranceCoverage.description'),
      footnote: t('items.insuranceCoverage.footnote')
    },
    {
      icon: BanknotesIcon,
      title: t('items.tradeFinance.title'),
      description: t('items.tradeFinance.description'),
      footnote: t('items.tradeFinance.footnote')
    }
  ];

  return (
    <section className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('integratedHeading')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 lt-card">
                  <div className="shrink-0">
                    <span
                      className="inline-grid h-10 w-10 place-items-center rounded-lg bg-gray-50 border border-gray-200"
                      aria-hidden
                    >
                      <IconComponent className="h-5 w-5 text-gray-600" />
                    </span>
                  </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{solution.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{solution.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{solution.footnote}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
