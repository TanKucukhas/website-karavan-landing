'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacyPolicy')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">{t('lastUpdated')}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.introduction.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.introduction.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.informationWeCollect.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.informationWeCollect.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.informationWeCollect.personalInfo')}</li>
                <li>{t('sections.informationWeCollect.businessInfo')}</li>
                <li>{t('sections.informationWeCollect.usageData')}</li>
                <li>{t('sections.informationWeCollect.cookies')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.howWeUseInfo.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.howWeUseInfo.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.howWeUseInfo.serviceProvision')}</li>
                <li>{t('sections.howWeUseInfo.communication')}</li>
                <li>{t('sections.howWeUseInfo.improvement')}</li>
                <li>{t('sections.howWeUseInfo.legal')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataSharing.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataSharing.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.dataSharing.serviceProviders')}</li>
                <li>{t('sections.dataSharing.businessPartners')}</li>
                <li>{t('sections.dataSharing.legalRequirements')}</li>
                <li>{t('sections.dataSharing.consent')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataSecurity.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataSecurity.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.dataSecurity.encryption')}</li>
                <li>{t('sections.dataSecurity.access')}</li>
                <li>{t('sections.dataSecurity.monitoring')}</li>
                <li>{t('sections.dataSecurity.training')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.yourRights.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.yourRights.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.yourRights.access')}</li>
                <li>{t('sections.yourRights.rectification')}</li>
                <li>{t('sections.yourRights.erasure')}</li>
                <li>{t('sections.yourRights.portability')}</li>
                <li>{t('sections.yourRights.objection')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.cookies.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.cookies.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.cookies.essential')}</li>
                <li>{t('sections.cookies.analytics')}</li>
                <li>{t('sections.cookies.marketing')}</li>
                <li>{t('sections.cookies.preferences')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataRetention.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataRetention.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.internationalTransfers.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.internationalTransfers.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.children.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.children.content')}</p>
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
                  <strong>{t('sections.contact.email')}:</strong> privacy@karavan.net<br />
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
