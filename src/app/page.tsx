import { Hero } from '@/components/salient/Hero'
import { PrimaryFeatures } from '@/components/salient/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/salient/SecondaryFeatures'
import { CallToAction } from '@/components/salient/CallToAction'
import { Testimonials } from '@/components/salient/Testimonials'
import { Pricing } from '@/components/salient/Pricing'
import { Faqs } from '@/components/salient/Faqs'
import { Footer } from '@/components/salient/Footer'
import { Header } from '@/components/salient/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}