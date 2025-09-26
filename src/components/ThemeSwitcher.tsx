'use client';

import { useState } from 'react';
import { Palette, CaretDown } from '@phosphor-icons/react';

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  const themes = {
    light: {
      name: 'Light Mode',
      primary: '#0066C0',
      accent: '#EA5641',
      supportive: '#5D86B7',
      secondaryAccent: '#00709E',
      neutralDark: '#2C2C2C',
      neutralGray: '#6B6B6B',
      neutralLight: '#EBF0F7',
      white: '#FFFFFF',
      poloBlue: '#95B9DA',
      background: '#FFFFFF',
      text: '#2C2C2C'
    },
    dark: {
      name: 'Dark Mode',
      primary: '#004A8C',
      accent: '#C24536',
      supportive: '#4A6B92',
      secondaryAccent: '#005A7E',
      neutralDark: '#E0E0E0',
      neutralGray: '#A0A0A0',
      neutralLight: '#3A3A3A',
      white: '#2A2A2A',
      poloBlue: '#7A9BBF',
      background: '#121212',
      text: '#FFFFFF'
    },
    ocean: {
      name: 'Ocean Depths',
      primary: '#000080',
      accent: '#008B8B',
      supportive: '#4A90E2',
      secondaryAccent: '#87CEEB',
      neutralDark: '#2C2C2C',
      neutralGray: '#6B6B6B',
      neutralLight: '#F5F5DC',
      white: '#FFFFFF',
      poloBlue: '#95B9DA',
      background: '#FFFFFF',
      text: '#2C2C2C'
    },
    sunset: {
      name: 'Tropical Sunset',
      accent: '#FF7F50',
      primary: '#32CD32',
      supportive: '#FF8C00',
      secondaryAccent: '#FF69B4',
      neutralDark: '#2C2C2C',
      neutralGray: '#6B6B6B',
      neutralLight: '#F5F5DC',
      white: '#FFFFFF',
      poloBlue: '#95B9DA',
      background: '#FFFFFF',
      text: '#2C2C2C'
    },
    forest: {
      name: 'Deep Forest',
      primary: '#228B22',
      accent: '#8B4513',
      supportive: '#2F4F2F',
      secondaryAccent: '#90EE90',
      neutralDark: '#2C2C2C',
      neutralGray: '#6B6B6B',
      neutralLight: '#F5F5DC',
      white: '#FFFFFF',
      poloBlue: '#95B9DA',
      background: '#FFFFFF',
      text: '#2C2C2C'
    },
    royal: {
      name: 'Royal Purple',
      primary: '#4B0082',
      accent: '#D4AF37',
      supportive: '#8B0000',
      secondaryAccent: '#FF69B4',
      neutralDark: '#2C2C2C',
      neutralGray: '#6B6B6B',
      neutralLight: '#F5F5DC',
      white: '#FFFFFF',
      poloBlue: '#95B9DA',
      background: '#FFFFFF',
      text: '#2C2C2C'
    }
  };

  const applyTheme = (theme: { name: string; primary: string; accent: string; supportive: string; secondaryAccent: string; neutralDark: string; neutralGray: string; neutralLight: string; white: string; poloBlue: string; background?: string; text?: string }) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--supportive', theme.supportive);
    root.style.setProperty('--secondaryAccent', theme.secondaryAccent);
    root.style.setProperty('--neutralDark', theme.neutralDark);
    root.style.setProperty('--neutralGray', theme.neutralGray);
    root.style.setProperty('--neutralLight', theme.neutralLight);
    root.style.setProperty('--white', theme.white);
    root.style.setProperty('--polo-blue', theme.poloBlue);
    if (theme.background) root.style.setProperty('--background', theme.background);
    if (theme.text) root.style.setProperty('--text', theme.text);
    
    // Apply dark mode to body
    if (theme.name === 'Dark Mode') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleThemeChange = (themeKey: string) => {
    setCurrentTheme(themeKey);
    applyTheme(themes[themeKey as keyof typeof themes]);
    localStorage.setItem('karavan-theme', themeKey);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-neutralLight hover:bg-neutralGray/10 transition-colors"
        title="Change Theme"
      >
        <Palette size={20} />
        <span className="text-sm font-medium text-neutralDark">
          {themes[currentTheme as keyof typeof themes]?.name}
        </span>
        <CaretDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutralLight z-50">
          <div className="py-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutralLight transition-colors flex items-center space-x-3 ${
                  currentTheme === key ? 'bg-primary/10 text-primary' : 'text-neutralDark'
                }`}
              >
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-neutralGray" 
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-neutralGray" 
                    style={{ backgroundColor: theme.accent }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-neutralGray" 
                    style={{ backgroundColor: theme.supportive }}
                  />
                </div>
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}