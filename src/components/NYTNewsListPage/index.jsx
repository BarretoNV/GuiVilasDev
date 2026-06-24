import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Footer from "../Footer";
import Loader from "../Loader";
import NavBar from "../navbar";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";
import useLocale from "../../hooks/useLocale";
import { localizePath } from "../../utils/i18nRouting";
import "./style.css";

const formatPubDate = (timestampString, locale) =>
  new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZoneName: "short",
  }).format(new Date(timestampString));

export default function NYTNewsListPage({ section, titleKey, errorKey }) {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const shouldShowLoader = useMinimumLoadingTime(loading);
  const [requestError, setRequestError] = useState("");
  const NYTToken = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchNYTNews = async () => {
      setLoading(true);
      setRequestError("");

      if (!NYTToken) {
        setArticles([]);
        setRequestError(t("apis.nytKeyError"));
        setLoading(false);
        return;
      }

      try {
        const url = new URL(
          `https://api.nytimes.com/svc/topstories/v2/${section}.json`,
        );
        url.searchParams.set("api-key", NYTToken);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`NYT ${section} request failed: ${response.status}`);
        }

        const data = await response.json();
        const results = data?.results;
        setArticles(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Erro: ", error);
        setArticles([]);
        setRequestError(t(errorKey));
      } finally {
        setLoading(false);
      }
    };

    fetchNYTNews();
  }, [NYTToken, errorKey, section, t]);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setShow(true);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setShow(false);
  };

  if (shouldShowLoader) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="mb-5 mt-5 align-items-center text-light text-center">
          <h1>
            {t(titleKey)} <b>NEW YORK TIMES</b>
          </h1>
          <Button variant="outline-light" href={localizePath("/funwithapis", locale)}>
            {t("news.back")}
          </Button>
        </Row>

        <Row>
          {requestError && <p className="text-light">{requestError}</p>}
          {!loading && !requestError && articles.length === 0 && (
            <p className="text-light">{t("news.empty")}</p>
          )}

          {articles.map((article) => (
            <Col key={article.uri} md={4}>
              <Card className="text-light mt-3 mb-3" border="light">
                {article.multimedia?.[0]?.url && (
                  <Card.Img
                    className="news-card-image"
                    variant="top"
                    src={article.multimedia[0].url}
                    alt={article.title}
                  />
                )}
                <Card.Body>
                  <Card.Title>
                    <h4>{article.title}</h4>
                    <p>{formatPubDate(article.published_date, locale)}</p>
                  </Card.Title>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-light"
                      size="lg"
                      onClick={(event) => {
                        event.preventDefault();
                        handleOpenModal(article);
                      }}
                    >
                      {t("news.view")}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          size="lg"
          centered
          show={show}
          onHide={handleCloseModal}
          className="text-light"
        >
          {selectedArticle && (
            <>
              <Modal.Header closeButton className="bg-dark">
                <Modal.Title className="bg-dark">
                  <h4 className="bg-dark">{selectedArticle.title}</h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark">
                <p className="bg-dark">{selectedArticle.abstract}</p>
                {selectedArticle.multimedia?.[0]?.url && (
                  <img
                    className="news-modal-image"
                    src={selectedArticle.multimedia[0].url}
                    alt={selectedArticle.title}
                  />
                )}
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("news.original")}
                </a>
              </Modal.Body>
              <Modal.Footer className="bg-dark">
                <Button onClick={handleCloseModal}>{t("news.close")}</Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
      <Footer />
    </>
  );
}

NYTNewsListPage.propTypes = {
  errorKey: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
};
