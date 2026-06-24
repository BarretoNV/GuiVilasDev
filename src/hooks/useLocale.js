import { useLocation } from "react-router-dom";
import { getLocaleFromPathname } from "../utils/i18nRouting";

export default function useLocale() {
  const location = useLocation();

  return getLocaleFromPathname(location.pathname);
}
