// .storybook/Providers.tsx or src/stories/helpers/Providers.tsx
'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@/providers/LocalizationProvider';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { darkTheme, lightTheme } from '@/themes/materialui';
import StoreProvider from '@/providers/StoreProvider';
import { IconColorProvider } from '@/components/atoms/Icon/IconColorContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { AuthSteps } from '@/types/auth';
import { startUsageTracking } from '@/utils/auth';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import Nav from '@/components/General/Nav';
import ThemeToggleButton from './ThemeToggleButton';

export function StorybookProviders({ children }: PropsWithChildren) {
  const [isDarkMode] = useState(false); // Optionally make dynamic later
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const stopTracking = startUsageTracking();
    return () => stopTracking();
  }, []);

  return (
    <StoreProvider>
      <ToastContainer
        hideProgressBar
        autoClose={3000}
        closeOnClick={false}
        style={{ zIndex: 1000000004 }}
        pauseOnFocusLoss
        limit={5}
        pauseOnHover
      />
      <LocalizationProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <QueryClientProvider>
              <IconColorProvider>
                <ThemeToggleButton/>
                {children}
              </IconColorProvider>
            </QueryClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </StoreProvider>
  );
}
export default StorybookProviders;
