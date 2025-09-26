import { Button } from '@/components/catalyst/button'
import { Container } from '@/components/salient/Container'

export function CallToAction() {
  return (
    <section id="get-started-today" className="relative overflow-hidden bg-blue-600 py-32">
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Join the Early Access Program
          </h2>
          <p className="mt-4 text-lg tracking-tight text-blue-100">
            Be among the first to experience the future of B2B trade. 
            Private beta with no fees and no spam.
          </p>
          <div className="mt-8 flex justify-center gap-x-6">
            <Button color="white" href="/register">
              Get Early Access
            </Button>
            <Button href="/contact" outline className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}