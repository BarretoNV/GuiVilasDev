import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import { getLocaleFromPathname } from "./utils/i18nRouting";
import i18n from "./i18n";

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation("common");
  const locale = getLocaleFromPathname(window.location.pathname);

  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  console.error(error);

  return (
    <Container>
      <div id="error-page" className="text-light">
        <h1>{t("errors.unexpectedTitle")}</h1>
        <p>{t("errors.unexpectedMessage")}</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Container>
  );
}
