import { Container } from '@/components/salient/Container'

const faqs = [
  {
    question: 'What is the minimum order quantity (MOQ) on Karavan?',
    answer: 'MOQ varies by category and supplier. Most suppliers set MOQs between $3,000-$25,000 depending on the product type. You can filter suppliers by MOQ requirements on our platform.',
  },
  {
    question: 'How does the escrow payment system work?',
    answer: 'When you place an order, payment is held in escrow until delivery confirmation. Once you confirm receipt of goods, payment is released to the supplier. This protects both buyers and sellers.',
  },
  {
    question: 'What are the typical shipping times from Turkey to Central Asia?',
    answer: 'Shipping times vary by destination: Uzbekistan (7-10 days), Kazakhstan (10-14 days), Kyrgyzstan (8-12 days), Turkmenistan (12-16 days), and Azerbaijan (5-8 days).',
  },
  {
    question: 'How do you verify suppliers on the platform?',
    answer: 'We verify suppliers through business registration documents, trade licenses, bank references, and previous trade history. All suppliers undergo a comprehensive verification process.',
  },
  {
    question: 'What languages does Karavan support?',
    answer: 'Karavan supports Turkish, English, Russian, Uzbek, Kazakh, and Kyrgyz languages. Our platform automatically translates content to help facilitate communication.',
  },
  {
    question: 'Is there a fee to use Karavan?',
    answer: 'We offer a free starter plan for small businesses. Professional plans start at $99/month with advanced features. Enterprise plans are custom-priced based on your specific needs.',
  },
]

export function Faqs() {
  return (
    <section id="faqs" aria-label="Frequently asked questions" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Everything you need to know about using Karavan for cross-border trade.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 max-w-2xl space-y-8 divide-y divide-slate-200"
        >
          {faqs.map((faq) => (
            <li key={faq.question} className="pt-8">
              <dl className="group relative">
                <dt>
                  <div className="text-left">
                    <div className="flex items-start justify-between">
                      <span className="text-base font-semibold leading-7 text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                  </div>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}