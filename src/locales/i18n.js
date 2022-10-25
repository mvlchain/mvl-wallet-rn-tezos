import AsyncStorage from '@react-native-async-storage/async-storage';
// import I18n from 'react-native-i18n';
import I18n from 'i18n-js';

import { LANGUAGE } from '@@constants/storage';
// Polyfill Intl & include fallback locale (en) for Hermes iOS
// import 'intl';
// import 'intl/locale-data/jsonp/en.js';

// Import all locales
import en from './languages/en.json';
import ko from './languages/ko-kr.json';

export const supportedTranslations = {
  en,
  ko,
};

I18n.fallbacks = true;
I18n.defaultLocale = 'en';
// Define the supported translations
I18n.translations = supportedTranslations;
// If language selected get locale
getUserPreferableLocale();

export const isRTL = false;

export async function setLocale(locale) {
  I18n.locale = locale;
  await AsyncStorage.setItem(LANGUAGE, locale);
}

// Get languages
export function getLanguages() {
  return {
    en: 'English',
    ko: 'Korean',
  };
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

// Allow persist locale after app closed
async function getUserPreferableLocale() {
  const locale = await AsyncStorage.getItem(LANGUAGE);
  if (locale) {
    I18n.locale = locale;
  }
}

export default I18n;
