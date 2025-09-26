import { Container } from '@/components/salient/Container'

const testimonials = [
  {
    body: 'Karavan has revolutionized our export business to Central Asia. The platform handles everything from payments to logistics, allowing us to focus on what we do best - manufacturing quality products.',
    author: {
      name: 'Ahmet Yılmaz',
      handle: 'ahmetyilmaz',
      company: 'Textile Exporter',
      location: 'Istanbul, Turkey',
    },
  },
  {
    body: 'As a buyer in Uzbekistan, finding reliable Turkish suppliers was always a challenge. Karavan&apos;s verification system and escrow payments give us the confidence to make large orders.',
    author: {
      name: 'Dilshod Karimov',
      handle: 'dilshodk',
      company: 'Import Company',
      location: 'Tashkent, Uzbekistan',
    },
  },
  {
    body: 'The logistics coordination through Karavan is seamless. We can track our shipments in real-time and the customs clearance process is automated. It&apos;s like having a dedicated trade team.',
    author: {
      name: 'Elena Petrova',
      handle: 'elenap',
      company: 'Trading Company',
      location: 'Almaty, Kazakhstan',
    },
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" aria-label="What our customers say" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            What our customers say
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Trusted by exporters and importers across Turkey and Central Asia
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 text-slate-700 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <li key={testimonial.author.handle} className="rounded-2xl bg-slate-50 p-8">
              <figure>
                <blockquote className="text-slate-900">
                  <p>"{testimonial.body}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 flex-none rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author.name}</div>
                    <div className="text-slate-600">{testimonial.author.company}</div>
                    <div className="text-slate-500">{testimonial.author.location}</div>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}