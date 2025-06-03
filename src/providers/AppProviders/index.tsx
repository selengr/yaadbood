'use client';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { PropsWithChildren, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { LocalizationProvider } from '@/providers/LocalizationProvider';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { darkTheme, lightTheme } from '@/themes/materialui';

import StoreProvider from '@/providers/StoreProvider';



export default function AppProviders({ children }: PropsWithChildren) {
  const [isDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;


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
   
            <QueryClientProvider>

                {children}

            </QueryClientProvider>
      
        </ThemeProvider>
      </LocalizationProvider>
    </StoreProvider>
  );
}
