'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Header() {
  const ref = useRef<HTMLElement|null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expose header height as CSS var for layout calc
  useEffect(() => {
    const updateVar = () => {
      const h = ref.current?.offsetHeight ?? 64;
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    updateVar();
    window.addEventListener('resize', updateVar);
    return () => window.removeEventListener('resize', updateVar);
  }, []);

  useEffect(() => {
    const h = ref.current?.offsetHeight ?? 64;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
  }, [isMobileMenuOpen, isScrolled]);

  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-md shadow-md' 
        : 'bg-white/30 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo/karavan-logo.svg"
              alt="Karavan"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#regions" className="text-gray-700 hover:text-blue-600 transition-colors">
              Regions
            </a>
            <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors">
              Categories
            </a>
          </nav>

          {/* Desktop CTA & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              EN
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              🌙
            </button>
            <button className="btn btn-primary px-6 py-2">
              Get Early Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#regions" className="block text-gray-700 hover:text-blue-600">
                Regions
              </a>
              <a href="#categories" className="block text-gray-700 hover:text-blue-600">
                Categories
              </a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600">
                About
              </a>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-4">
                  <button className="text-gray-700">EN</button>
                  <button className="text-gray-700">🌙</button>
                </div>
                <button className="btn btn-primary px-4 py-2">
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
