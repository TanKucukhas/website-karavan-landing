'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';
import Flag from '@/components/Flag';

interface Language {
  code: string;
  name: string;
  flagCode: string;
}

interface LanguageSelectorProps {
  mode?: 'dropdown' | 'buttons';
  buttonClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  selectedItemClassName?: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flagCode: 'us' },
  { code: 'tr', name: 'Türkçe', flagCode: 'tr' },
  { code: 'ru', name: 'Русский', flagCode: 'ru' },
];

export default function LanguageSelector({ 
  mode = 'dropdown',
  buttonClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  selectedItemClassName = ''
}: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useNextRouter();
  const pathname = useNextPathname();
  const [isPending, startTransition] = useTransition();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === locale) || LANGUAGES[0];

  const changeLocale = (newLocale: string) => {
    startTransition(() => {
      // Replace current locale in pathname with new locale
      // pathname is like "/en/contact" or "/tr/regions/turkiye"
      const pathSegments = pathname.split('/').filter(Boolean);
      
      // First segment is the locale, replace it
      if (pathSegments.length > 0 && ['en', 'tr', 'ru'].includes(pathSegments[0])) {
        pathSegments[0] = newLocale;
      } else {
        // If no locale in path, prepend it
        pathSegments.unshift(newLocale);
      }
      
      const newPath = '/' + pathSegments.join('/') + '/';
      router.push(newPath);
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (mode !== 'dropdown') return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mode]);

  if (mode === 'buttons') {
    return (
      <div className="flex items-center gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLocale(lang.code)}
            disabled={isPending || locale === lang.code}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              locale === lang.code ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-100'
            } ${buttonClassName} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Flag code={lang.flagCode} size="xs" />
            <span className="text-xs">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  // Dropdown mode
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 transition-colors ${buttonClassName} ${isPending ? 'opacity-50' : ''}`}
      >
        <Flag 
          code={currentLanguage.flagCode} 
          size="sm" 
        />
        <span className="text-sm">{currentLanguage.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {languageDropdownOpen && (
        <div className={`absolute w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 ${dropdownClassName || 'right-0 mt-2'}`}>
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                changeLocale(language.code);
                setLanguageDropdownOpen(false);
              }}
              disabled={isPending || locale === language.code}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${
                locale === language.code
                  ? `bg-gray-50 text-brand-600 ${selectedItemClassName || itemClassName}` 
                  : `text-gray-700 hover:bg-gray-100 ${itemClassName}`
              } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Flag code={language.flagCode} size="sm" />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

