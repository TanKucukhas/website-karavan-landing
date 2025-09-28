'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FaqItem[] = [
    { question: 'What is the MOQ?', answer: 'Minimum order quantity depends on the category and supplier; typical ranges are listed on category cards.' },
    { question: 'Are there platform fees?', answer: 'During private beta there are no subscription fees. Transactional fees apply for payment and logistics services.' },
    { question: 'How long are shipping lead times?', answer: 'Standard lead times range from 7–14 days from Turkey to Central Asia depending on route and customs.' },
    { question: 'How does escrow work?', answer: 'Buyer funds are held in escrow and released to the seller after delivery confirmation or dispute resolution.' },
    { question: 'Do you handle logistics?', answer: 'Yes. We coordinate end-to-end shipping, customs clearance, and insurance with trusted partners.' },
    { question: 'Can I use my own freight forwarder?', answer: 'Yes. You can either use our logistics partners or integrate your own forwarder.' },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Answers to the most common questions about fees, lead times, escrow, and logistics.</p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl border border-gray-200">
          {faqs.map((item, idx) => (
            <div key={idx}>
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                <span className="text-gray-500">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

