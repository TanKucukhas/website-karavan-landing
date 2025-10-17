'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('karavan-language');
    if (saved) {
      setSelectedLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('karavan-language', language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

