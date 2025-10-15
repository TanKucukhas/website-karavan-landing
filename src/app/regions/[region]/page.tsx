import CategoriesSection from '@/components/CategoriesSection'

type RegionPageProps = {
  params: Promise<{ region: string }>
}

const REGION_NAMES: Record<string, string> = {
  'turkiye': 'Türkiye',
  'uzbekistan': 'Uzbekistan',
  'kazakhstan': 'Kazakhstan',
  'azerbaijan': 'Azerbaijan',
  'kyrgyzstan': 'Kyrgyzstan',
  'turkmenistan': 'Turkmenistan',
  'hungary': 'Hungary',
}

export async function generateStaticParams() {
  return [
    { region: 'turkiye' },
    { region: 'uzbekistan' },
    { region: 'kazakhstan' },
    { region: 'azerbaijan' },
    { region: 'kyrgyzstan' },
    { region: 'turkmenistan' },
    { region: 'hungary' },
  ]
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params
  const regionName = REGION_NAMES[region] || decodeURIComponent(region)
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-brand-sky section-padding">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-brand-600">Region</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-[color:var(--ink)]">
            Wholesale suppliers in <span className="text-brand-600">{regionName}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-600 mx-auto">
            Local corridors, verified suppliers, and category leaders for {regionName}.
          </p>
        </div>
      </section>

      <CategoriesSection />
    </main>
  )
}
