'use client'

import './globals.css';

// import ThemeProvider from '@/theme';
import type { Metadata } from 'next';

import { SettingsProvider, ThemeSettings } from '@/components/settings';
import ThemeProvider from '@/theme';

// export const metadata: Metadata = {
//   title: ' آسان درمان | درخواست خدمات پزشکی و درمانی در منزل',
//   description: 'آسان درمان | درخواست خدمات پزشکی و درمانی در منزل',
//   icons: {
//     icon: '/static/logo/LOGO.png',
//   },
// };

// export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className="w-full flex justify-center items-center">
      <body className="w-full h-full flex flex-col relative overflow-scroll">
        <SettingsProvider>
          <ThemeProvider>
            <ThemeSettings>{children}</ThemeSettings>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
