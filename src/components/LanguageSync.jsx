import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import i18n from "../i18n";
import { getHtmlLang, getLocaleFromPathname, localizePath } from "../utils/i18nRouting";

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "");

const upsertLink = (rel, hrefLang, href) => {
  const selector = hrefLang
    ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
    : `link[rel="${rel}"]`;
  const link = document.head.querySelector(selector) || document.createElement("link");

  link.setAttribute("rel", rel);

  if (hrefLang) {
    link.setAttribute("hreflang", hrefLang);
  }

  link.setAttribute("href", href);
  document.head.appendChild(link);
};

export default function LanguageSync() {
  const location = useLocation();

  useEffect(() => {
    const locale = getLocaleFromPathname(location.pathname);
    const baseUrl = siteUrl || window.location.origin;
    const path = `${location.pathname}${location.search}`;

    i18n.changeLanguage(locale);
    document.documentElement.lang = getHtmlLang(locale);

    upsertLink("canonical", null, `${baseUrl}${location.pathname}${location.search}`);
    upsertLink("alternate", "pt-BR", `${baseUrl}${localizePath(path, "pt-BR")}`);
    upsertLink("alternate", "en", `${baseUrl}${localizePath(path, "en")}`);
    upsertLink("alternate", "x-default", `${baseUrl}${localizePath(path, "pt-BR")}`);
  }, [location.pathname, location.search]);

  return null;
}
