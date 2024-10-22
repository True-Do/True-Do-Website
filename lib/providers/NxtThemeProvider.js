'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function NxtThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='dark'>
      {children}
    </NextThemesProvider>
  );
}
