"use client";

// import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { PropsWithChildren, useState } from "react";
// providers
import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
// themes
import { darkTheme, lightTheme } from "@/themes/materialui";
// components
import { IconColorProvider } from "@/components/atoms/Icon/IconColorContext";

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

        <ThemeProvider theme={theme}>
          <QueryClientProvider>
            <IconColorProvider>{children}</IconColorProvider>
          </QueryClientProvider>
        </ThemeProvider>

    </StoreProvider>
  );
}
