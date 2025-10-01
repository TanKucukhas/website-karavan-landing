"use client";
import { analytics } from '@/lib/analytics'
import Flag from '@/components/Flag'

export default function RegionsSection() {
  const regions = [
    { key: 'turkey', name: 'Türkiye', flagCode: 'tr', blurb: 'Export hub and operations HQ', href: '/regions/turkey' },
    { key: 'uzbekistan', name: 'Uzbekistan', flagCode: 'uz', blurb: 'Fast‑growing demand center', href: '/regions/uzbekistan' },
    { key: 'kazakhstan', name: 'Kazakhstan', flagCode: 'kz', blurb: 'Gateway to Central Asia', href: '/regions/kazakhstan' },
    { key: 'kyrgyzstan', name: 'Kyrgyzstan', flagCode: 'kg', blurb: 'Agile cross‑border trade', href: '/regions/kyrgyzstan' },
    { key: 'turkmenistan', name: 'Turkmenistan', flagCode: 'tm', blurb: 'Selective import market', href: '/regions/turkmenistan' },
    { key: 'azerbaijan', name: 'Azerbaijan', flagCode: 'az', blurb: 'Link to Caucasus', href: '/regions/azerbaijan' },
    { key: 'hungary', name: 'Hungary', flagCode: 'hu', blurb: 'European gateway', href: '/regions/hungary' },
  ]

  return (
    <section id="regions" className="lt-section animate-on-scroll scroll-mt-24">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">Regions</h2>
          <p className="lt-subtext">Focused coverage across Türkiye and Central Asia to streamline cross‑border B2B trade.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {regions.map((r) => (
            <a key={r.key} href={r.href} className="lt-card p-6 group hover:shadow-md transition-shadow" onClick={() => analytics.mapNodeClick(r.name)}>
              <div className="flex items-center gap-3 mb-2">
                <Flag code={r.flagCode} size="lg" title={r.name} shadow />
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{r.name}</h3>
              </div>
              <p className="text-gray-700">{r.blurb}</p>
              <div className="mt-4 text-sm text-brand-700">Explore →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
