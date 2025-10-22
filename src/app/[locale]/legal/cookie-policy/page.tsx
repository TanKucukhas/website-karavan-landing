'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function CookiePolicyPage() {
  const t = useTranslations('legal.cookiePolicy')
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.whatAreCookies.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.whatAreCookies.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.howWeUseCookies.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.howWeUseCookies.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.howWeUseCookies.essential')}</li>
                <li>{t('sections.howWeUseCookies.analytics')}</li>
                <li>{t('sections.howWeUseCookies.functionality')}</li>
                <li>{t('sections.howWeUseCookies.marketing')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.typesOfCookies.title')}</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('sections.typesOfCookies.essential.title')}</h3>
                <p className="text-gray-700 mb-3">{t('sections.typesOfCookies.essential.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.typesOfCookies.essential.session')}</li>
                  <li>{t('sections.typesOfCookies.essential.security')}</li>
                  <li>{t('sections.typesOfCookies.essential.preferences')}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('sections.typesOfCookies.analytics.title')}</h3>
                <p className="text-gray-700 mb-3">{t('sections.typesOfCookies.analytics.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.typesOfCookies.analytics.usage')}</li>
                  <li>{t('sections.typesOfCookies.analytics.performance')}</li>
                  <li>{t('sections.typesOfCookies.analytics.improvement')}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('sections.typesOfCookies.functionality.title')}</h3>
                <p className="text-gray-700 mb-3">{t('sections.typesOfCookies.functionality.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.typesOfCookies.functionality.remember')}</li>
                  <li>{t('sections.typesOfCookies.functionality.personalize')}</li>
                  <li>{t('sections.typesOfCookies.functionality.features')}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('sections.typesOfCookies.marketing.title')}</h3>
                <p className="text-gray-700 mb-3">{t('sections.typesOfCookies.marketing.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.typesOfCookies.marketing.advertising')}</li>
                  <li>{t('sections.typesOfCookies.marketing.targeting')}</li>
                  <li>{t('sections.typesOfCookies.marketing.social')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.thirdPartyCookies.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.thirdPartyCookies.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Google Analytics</strong> - {t('sections.thirdPartyCookies.googleAnalytics')}</li>
                <li><strong>Social Media</strong> - {t('sections.thirdPartyCookies.socialMedia')}</li>
                <li><strong>Advertising</strong> - {t('sections.thirdPartyCookies.advertising')}</li>
                <li><strong>Payment Processors</strong> - {t('sections.thirdPartyCookies.payment')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.cookieDuration.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.cookieDuration.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>{t('sections.cookieDuration.session')}</strong> - {t('sections.cookieDuration.sessionDesc')}</li>
                <li><strong>{t('sections.cookieDuration.persistent')}</strong> - {t('sections.cookieDuration.persistentDesc')}</li>
                <li><strong>{t('sections.cookieDuration.permanent')}</strong> - {t('sections.cookieDuration.permanentDesc')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.managingCookies.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.managingCookies.content')}</p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.managingCookies.browserSettings.title')}</h3>
                <p className="text-gray-700 mb-2">{t('sections.managingCookies.browserSettings.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.managingCookies.browserSettings.chrome')}</li>
                  <li>{t('sections.managingCookies.browserSettings.firefox')}</li>
                  <li>{t('sections.managingCookies.browserSettings.safari')}</li>
                  <li>{t('sections.managingCookies.browserSettings.edge')}</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.managingCookies.optOut.title')}</h3>
                <p className="text-gray-700 mb-2">{t('sections.managingCookies.optOut.content')}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('sections.managingCookies.optOut.google')}</li>
                  <li>{t('sections.managingCookies.optOut.facebook')}</li>
                  <li>{t('sections.managingCookies.optOut.industry')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.impactOfDisabling.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.impactOfDisabling.content')}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('sections.impactOfDisabling.functionality')}</li>
                <li>{t('sections.impactOfDisabling.personalization')}</li>
                <li>{t('sections.impactOfDisabling.analytics')}</li>
                <li>{t('sections.impactOfDisabling.security')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('sections.updates.title')}</h2>
              <p className="text-gray-700 mb-4">{t('sections.updates.content')}</p>
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
