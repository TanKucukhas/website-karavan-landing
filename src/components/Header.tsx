'use client';

import { useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-neutralLight sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-72">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-72 h-72 relative">
              <Image
                src="/images/logo/karavan-logo.svg"
                alt="Karavan Logo"
                width={288}
                height={288}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Always visible */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="#features" className="text-neutralGray hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#regions" className="text-neutralGray hover:text-primary transition-colors">
              Regions
            </Link>
            <Link href="#categories" className="text-neutralGray hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="#about" className="text-neutralGray hover:text-primary transition-colors">
              About
            </Link>
            <ThemeSwitcher />
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary text-white"
            >
              Get Early Access
            </button>
          </div>

          {/* Mobile Menu Button - Only on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-neutralGray hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutralLight py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-neutralGray hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#regions" 
                className="text-neutralGray hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Regions
              </Link>
              <Link 
                href="#categories" 
                className="text-neutralGray hover:text-primary transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="#about" 
                className="text-neutralGray hover:text-primary transition-colors px-4 py-2"
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
