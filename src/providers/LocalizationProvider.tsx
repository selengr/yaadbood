import i18n from 'i18next';
import React, { ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { hello: 'Hello World' } },
    fr: { translation: { hello: 'Bonjour le monde' } }
  },
  lng: 'en',
  fallbackLng: 'en'
});

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  return <>{children}</>;
};
