import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pl from './locales/pl.json';

i18n
    .use(LanguageDetector) // Detects user language automatically
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {translation: en},
            pl: {translation: pl}
        },
        fallbackLng: 'en', // Default language
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;