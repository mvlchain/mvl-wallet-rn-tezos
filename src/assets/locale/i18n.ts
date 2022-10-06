import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en, ko, km } from './languages';

const resources = {
  ...en,
  ...ko,
  ...km,
};

use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export const languages = ['en', 'ko', 'km'] as const;

export default i18n;
