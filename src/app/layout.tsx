import './globals.css';
// import { Toaster } from 'sonner';
import ThemeProvider from '@/theme';
import type { Metadata } from 'next';

import { SettingsProvider, ThemeSettings } from '@/components/settings';
// import 'react-spring-bottom-sheet/dist/style.css';

export const metadata: Metadata = {
  title: 'یادبود',
  description: 'یادبود',
  icons: {
    icon: '/static/logo/LOGO.png',
  },
};

// export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className="w-full flex justify-center items-center">
      <body className="w-full h-full flex flex-col relative overflow-scroll">
        <SettingsProvider>
          <ThemeProvider>
            <ThemeSettings>
              <div>{children}</div>
            </ThemeSettings>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
