import { DEFAULT_LOCALE, EN_LOCALE } from "../i18n";

const EN_PREFIX = "/en";

export const getLocaleFromPathname = (pathname = window.location.pathname) =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? EN_LOCALE
    : DEFAULT_LOCALE;

export const getPathWithoutLocale = (pathname = window.location.pathname) => {
  if (pathname === EN_PREFIX) {
    return "/";
  }

  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    return pathname.slice(EN_PREFIX.length) || "/";
  }

  return pathname || "/";
};

export const getLocalePrefix = (locale) => (locale === EN_LOCALE ? EN_PREFIX : "");

export const localizePath = (path = "/", locale = DEFAULT_LOCALE) => {
  if (/^https?:\/\//.test(path) || path.startsWith("mailto:")) {
    return path;
  }

  const [pathnameWithSearch, hash = ""] = path.split("#");
  const [pathname, search = ""] = pathnameWithSearch.split("?");
  const cleanPath = getPathWithoutLocale(pathname || "/");
  const normalizedPath = cleanPath === "/" ? "" : cleanPath;
  const localizedPath =
    locale === EN_LOCALE ? `${EN_PREFIX}${normalizedPath}` || EN_PREFIX : cleanPath;
  const withSearch = search ? `${localizedPath}?${search}` : localizedPath;

  return hash ? `${withSearch}#${hash}` : withSearch || "/";
};

export const getOppositeLocale = (locale) =>
  locale === EN_LOCALE ? DEFAULT_LOCALE : EN_LOCALE;

export const getHtmlLang = (locale) => (locale === EN_LOCALE ? "en" : "pt-BR");

export const getLocaleDate = (locale) => (locale === EN_LOCALE ? "en-US" : "pt-BR");
