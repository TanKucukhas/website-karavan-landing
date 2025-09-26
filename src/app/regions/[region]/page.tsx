import CategoriesSection from '@/components/CategoriesSection'

type RegionPageProps = {
  params: Promise<{ region: string }>
}

export async function generateStaticParams() {
  return [
    { region: 'turkey' },
    { region: 'uzbekistan' },
    { region: 'kazakhstan' },
    { region: 'azerbaijan' },
    { region: 'kyrgyzstan' },
    { region: 'turkmenistan' },
  ]
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params
  const regionName = decodeURIComponent(region)
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-blue-600">Region</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-gray-900">
            Wholesale suppliers in <span className="text-blue-600">{regionName}</span>
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


