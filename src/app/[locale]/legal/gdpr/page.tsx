'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function GDPRPage() {
  const t = useTranslations('legal.gdpr')
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.introduction.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.introduction.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataController.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataController.content')}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>{t('sections.dataController.name')}:</strong> Karavan Digital Inc.<br />
                  <strong>{t('sections.dataController.address')}:</strong><br />
                  İçerenköy Mh. Karaman Çiftlik Yolu Cd.<br />
                  N:47 Kar Plaza E Blok Kat:8<br />
                  Ataşehir, İstanbul 34572<br />
                  Türkiye<br />
                  <strong>{t('sections.dataController.email')}:</strong> privacy@karavan.net
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.legalBasis.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.legalBasis.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.legalBasis.consent')}</strong> - {t('sections.legalBasis.consentDesc')}</li>
                <li><strong>{t('sections.legalBasis.contract')}</strong> - {t('sections.legalBasis.contractDesc')}</li>
                <li><strong>{t('sections.legalBasis.legitimate')}</strong> - {t('sections.legalBasis.legitimateDesc')}</li>
                <li><strong>{t('sections.legalBasis.legal')}</strong> - {t('sections.legalBasis.legalDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataCategories.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataCategories.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.dataCategories.identity')}</strong> - {t('sections.dataCategories.identityDesc')}</li>
                <li><strong>{t('sections.dataCategories.contact')}</strong> - {t('sections.dataCategories.contactDesc')}</li>
                <li><strong>{t('sections.dataCategories.financial')}</strong> - {t('sections.dataCategories.financialDesc')}</li>
                <li><strong>{t('sections.dataCategories.technical')}</strong> - {t('sections.dataCategories.technicalDesc')}</li>
                <li><strong>{t('sections.dataCategories.usage')}</strong> - {t('sections.dataCategories.usageDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.purposes.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.purposes.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.purposes.serviceProvision')}</li>
                <li>{t('sections.purposes.accountManagement')}</li>
                <li>{t('sections.purposes.communication')}</li>
                <li>{t('sections.purposes.marketing')}</li>
                <li>{t('sections.purposes.analytics')}</li>
                <li>{t('sections.purposes.legalCompliance')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataRetention.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataRetention.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.dataRetention.account')}</strong> - {t('sections.dataRetention.accountDesc')}</li>
                <li><strong>{t('sections.dataRetention.transactions')}</strong> - {t('sections.dataRetention.transactionsDesc')}</li>
                <li><strong>{t('sections.dataRetention.marketing')}</strong> - {t('sections.dataRetention.marketingDesc')}</li>
                <li><strong>{t('sections.dataRetention.legal')}</strong> - {t('sections.dataRetention.legalDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.dataSharing.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.dataSharing.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.dataSharing.serviceProviders')}</strong> - {t('sections.dataSharing.serviceProvidersDesc')}</li>
                <li><strong>{t('sections.dataSharing.businessPartners')}</strong> - {t('sections.dataSharing.businessPartnersDesc')}</li>
                <li><strong>{t('sections.dataSharing.legalRequirements')}</strong> - {t('sections.dataSharing.legalRequirementsDesc')}</li>
                <li><strong>{t('sections.dataSharing.consent')}</strong> - {t('sections.dataSharing.consentDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.yourRights.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.yourRights.content')}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.access.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.access.content')}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.rectification.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.rectification.content')}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.erasure.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.erasure.content')}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.portability.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.portability.content')}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.restriction.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.restriction.content')}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.yourRights.objection.title')}</h3>
                  <p className="text-gray-700">{t('sections.yourRights.objection.content')}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.exercisingRights.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.exercisingRights.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.exercisingRights.contact')}</li>
                <li>{t('sections.exercisingRights.verification')}</li>
                <li>{t('sections.exercisingRights.response')}</li>
                <li>{t('sections.exercisingRights.free')}</li>
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
                <li>{t('sections.dataSecurity.incident')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.internationalTransfers.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.internationalTransfers.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.internationalTransfers.adequacy')}</li>
                <li>{t('sections.internationalTransfers.safeguards')}</li>
                <li>{t('sections.internationalTransfers.consent')}</li>
                <li>{t('sections.internationalTransfers.necessity')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.children.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.children.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.complaints.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.complaints.content')}</p>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>{t('sections.complaints.authority')}:</strong><br />
                  {t('sections.complaints.authorityName')}<br />
                  {t('sections.complaints.authorityAddress')}<br />
                  {t('sections.complaints.authorityWebsite')}
                </p>
              </div>
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
