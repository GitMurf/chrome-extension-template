import { useEffect } from 'react';
import type { Settings } from '@/shared/storage';

export function useTheme(theme: Settings['theme'] | undefined) {
  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
}
