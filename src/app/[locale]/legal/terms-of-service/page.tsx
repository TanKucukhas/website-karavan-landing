'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function TermsOfServicePage() {
  const t = useTranslations('legal.termsOfService')
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">{t('lastUpdated')}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.acceptance.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.acceptance.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.definitions.title')}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.definitions.service')}</strong> - {t('sections.definitions.serviceDesc')}</li>
                <li><strong>{t('sections.definitions.user')}</strong> - {t('sections.definitions.userDesc')}</li>
                <li><strong>{t('sections.definitions.content')}</strong> - {t('sections.definitions.contentDesc')}</li>
                <li><strong>{t('sections.definitions.account')}</strong> - {t('sections.definitions.accountDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.eligibility.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.eligibility.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.eligibility.age')}</li>
                <li>{t('sections.eligibility.capacity')}</li>
                <li>{t('sections.eligibility.compliance')}</li>
                <li>{t('sections.eligibility.prohibition')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.account.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.account.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.account.registration')}</li>
                <li>{t('sections.account.accuracy')}</li>
                <li>{t('sections.account.security')}</li>
                <li>{t('sections.account.responsibility')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.useOfService.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.useOfService.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.useOfService.permitted')}</li>
                <li>{t('sections.useOfService.prohibited')}</li>
                <li>{t('sections.useOfService.compliance')}</li>
                <li>{t('sections.useOfService.monitoring')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.payments.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.payments.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.payments.fees')}</li>
                <li>{t('sections.payments.billing')}</li>
                <li>{t('sections.payments.refunds')}</li>
                <li>{t('sections.payments.disputes')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.intellectualProperty.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.intellectualProperty.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.intellectualProperty.ownership')}</li>
                <li>{t('sections.intellectualProperty.license')}</li>
                <li>{t('sections.intellectualProperty.userContent')}</li>
                <li>{t('sections.intellectualProperty.infringement')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.privacy.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.privacy.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.termination.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.termination.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.termination.userTermination')}</li>
                <li>{t('sections.termination.companyTermination')}</li>
                <li>{t('sections.termination.effect')}</li>
                <li>{t('sections.termination.survival')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.disclaimers.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.disclaimers.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.disclaimers.noWarranty')}</li>
                <li>{t('sections.disclaimers.availability')}</li>
                <li>{t('sections.disclaimers.accuracy')}</li>
                <li>{t('sections.disclaimers.thirdParty')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.limitation.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.limitation.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.indemnification.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.indemnification.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.governingLaw.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.governingLaw.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.disputes.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.disputes.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.changes.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.changes.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.contact.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.contact.content')}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>{t('sections.contact.email')}:</strong> legal@karavan.net<br />
                  <strong>{t('sections.contact.address')}:</strong><br />
                  Karavan Digital Inc.<br />
                  İçerenköy Mh. Karaman Çiftlik Yolu Cd.<br />
                  N:47 Kar Plaza E Blok Kat:8<br />
                  Ataşehir, İstanbul 34572<br />
                  Türkiye
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
