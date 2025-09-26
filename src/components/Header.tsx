'use client';

import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-brand-bg/90 backdrop-blur border-b border-neutralLight'
          : 'bg-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-32 h-10 relative">
              <Image
                src="/images/logo/karavan-logo.svg"
                alt="Karavan Logo"
                width={128}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Always visible */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Main">
            <Link href="#features" className="text-muted-ink hover:text-brand-ink transition-colors">
              Features
            </Link>
            <Link href="#regions" className="text-muted-ink hover:text-brand-ink transition-colors" aria-haspopup="true" aria-expanded={false}>
              Regions
            </Link>
            <Link href="#categories" className="text-muted-ink hover:text-brand-ink transition-colors">
              Categories
            </Link>
            <Link href="#about" className="text-muted-ink hover:text-brand-ink transition-colors">
              About
            </Link>
            <ThemeSwitcher />
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary text-white"
            >
              Get Early Access
            </button>
          </nav>

          {/* Mobile Menu Button - Only on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-muted-ink hover:text-brand-ink transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-neutralLight py-4">
            <nav className="flex flex-col space-y-4" aria-label="Mobile">
              <Link 
                href="#features" 
                className="text-muted-ink hover:text-brand-ink transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#regions" 
                className="text-muted-ink hover:text-brand-ink transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Regions
              </Link>
              <Link 
                href="#categories" 
                className="text-muted-ink hover:text-brand-ink transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="#about" 
                className="text-muted-ink hover:text-brand-ink transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <ThemeSwitcher />
              </div>
              <button 
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 mx-4"
              >
                Get Early Access
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
