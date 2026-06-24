import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonPt from "./locales/pt-BR/common.json";
import pagesPt from "./locales/pt-BR/pages.json";
import commonEn from "./locales/en/common.json";
import pagesEn from "./locales/en/pages.json";

export const DEFAULT_LOCALE = "pt-BR";
export const EN_LOCALE = "en";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, EN_LOCALE];

i18n.use(initReactI18next).init({
  resources: {
    [DEFAULT_LOCALE]: {
      common: commonPt,
      pages: pagesPt,
    },
    [EN_LOCALE]: {
      common: commonEn,
      pages: pagesEn,
    },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
