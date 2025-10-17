import { getTranslations } from 'next-intl/server'
import CategoriesSection from '@/components/CategoriesSection'
import { routing } from '@/i18n/routing'

type RegionPageProps = {
  params: Promise<{ region: string; locale: string }>
}

export async function generateStaticParams() {
  const regions = [
    'turkiye',
    'uzbekistan',
    'kazakhstan',
    'azerbaijan',
    'kyrgyzstan',
    'turkmenistan',
    'kktc',
    'hungary',
  ]
  
  return routing.locales.flatMap(locale =>
    regions.map(region => ({ locale, region }))
  )
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region, locale } = await params
  const t = await getTranslations({ locale, namespace: 'region' })
  const tRegions = await getTranslations({ locale, namespace: 'regions' })
  
  const regionName = tRegions(region)
  
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-brand-sky section-padding">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-brand-600">{t('badge')}</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-[color:var(--ink)]">
            {t('title')} <span className="text-brand-600">{regionName}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-600 mx-auto">
            {t('subtitle')} {regionName}.
          </p>
        </div>
      </section>

      <CategoriesSection />
    </main>
  )
}

