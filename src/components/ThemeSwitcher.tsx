'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== 'undefined' ? localStorage.getItem('karavan-theme') : null;
    const initialDark = saved === 'dark';
    setIsDark(initialDark);
    applyDarkClass(initialDark);
  }, []);

  const applyDarkClass = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('karavan-theme', dark ? 'dark' : 'light');
  };

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyDarkClass(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-brand-ink transition-colors"
      title="Toggle theme"
    >
      {mounted && (isDark ? <Moon size={18} /> : <Sun size={18} />)}
      <span className="text-sm font-medium">{mounted ? (isDark ? 'Dark' : 'Light') : 'Theme'}</span>
    </button>
  );
}