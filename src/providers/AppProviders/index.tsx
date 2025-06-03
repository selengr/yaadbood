'use client';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { LocalizationProvider } from '@/providers/LocalizationProvider';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { darkTheme, lightTheme } from '@/themes/materialui';

import StoreProvider from '@/providers/StoreProvider';
import { IconColorProvider } from '@/components/atoms/Icon/IconColorContext';
import { startUsageTracking } from '@/utils/auth';
import { AuthModal } from '@/components/auth/AuthModal';
import { AuthSteps } from '@/types/auth';

export default function AppProviders({ children }: PropsWithChildren) {
  const [isDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const stopTracking = startUsageTracking();
    return () => stopTracking();
  }, []);

  return (
    <StoreProvider>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        closeOnClick={false}
        style={{ zIndex: 1000000004 }}
        pauseOnFocusLoss={true}
        limit={5}
        pauseOnHover
      />
      <LocalizationProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <QueryClientProvider>
              <IconColorProvider>
                {children}
                {/* <AuthModal
                  forceLogin={true}
                  showLoginModal={false}
                  onClose={() => {}}
                  manualStep={AuthSteps.login}
                /> */}
              </IconColorProvider>
            </QueryClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </StoreProvider>
  );
}
