'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export interface ThemeServiceState {
  theme: string | undefined;
  resolvedTheme: string | undefined;
  systemTheme: 'dark' | 'light';
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  isMounted: boolean;
}

export function useThemeService(): ThemeServiceState {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const active = resolvedTheme || theme || systemTheme;
    setTheme(active === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    resolvedTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isMounted: mounted,
  };
}
