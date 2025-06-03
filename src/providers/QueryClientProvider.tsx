import { QueryClient, QueryClientProvider as RQProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient();

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <RQProvider client={queryClient}>{children}</RQProvider>;
};
