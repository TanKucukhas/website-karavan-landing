import { Button } from '@/components/catalyst/button'
import { Container } from '@/components/salient/Container'
import { Logo } from '@/components/salient/Logo'
import { NavLink } from '@/components/salient/NavLink'

export function Header() {
  return (
    <header className="relative z-50 flex flex-none flex-col">
      <div className="order-1 flex h-16 items-center bg-transparent">
        <Container className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-x-6">
            <Logo />
            <nav className="hidden md:flex md:gap-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#faqs">FAQ</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="hidden sm:block">
              <NavLink href="/login">Sign in</NavLink>
            </div>
            <Button href="/register" color="blue">
              Get started
            </Button>
          </div>
        </Container>
      </div>
    </header>
  )
}