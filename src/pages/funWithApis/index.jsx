import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import NavBar from "../../components/navbar";
import imageObj from "../../assets/images";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";
import useLocale from "../../hooks/useLocale";
import { localizePath } from "../../utils/i18nRouting";
import { getValidNYTArticles } from "../../utils/nytArticles";

export default function FunWithAPIs() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const [loading, setLoading] = useState(true);
  const shouldShowLoader = useMinimumLoadingTime(loading);
  const [scienceNews, setScienceNews] = useState(null);
  const [technologyNews, setTechnologyNews] = useState(null);
  const [randomAdvice, setRandomAdvice] = useState(null);
  const [adviceLoading, setAdviceLoading] = useState(false);

  const [scienceError, setScienceError] = useState("");
  const [technologyError, setTechnologyError] = useState("");
  const [adviceError, setAdviceError] = useState("");

  const NYTToken = import.meta.env.VITE_NYT_API_KEY;

  const fetchNYTScienceNews = useCallback(async () => {
    try {
      setScienceError("");

      if (!NYTToken) {
        setScienceNews(null);
        setScienceError(t("apis.nytKeyError"));
        return;
      }

      const url = new URL(
        "https://api.nytimes.com/svc/topstories/v2/science.json",
      );
      url.searchParams.set("api-key", NYTToken);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NYT science request failed: ${response.status}`);
      }

      const data = await response.json();
      setScienceNews(getValidNYTArticles(data.results)[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setScienceError(t("apis.scienceError"));
    }
  }, [NYTToken, t]);

  const fetchNYTTechnologyNews = useCallback(async () => {
    try {
      setTechnologyError("");

      if (!NYTToken) {
        setTechnologyNews(null);
        setTechnologyError(t("apis.nytKeyError"));
        return;
      }

      const url = new URL(
        "https://api.nytimes.com/svc/topstories/v2/technology.json",
      );
      url.searchParams.set("api-key", NYTToken);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NYT technology request failed: ${response.status}`);
      }

      const data = await response.json();
      setTechnologyNews(getValidNYTArticles(data.results)[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setTechnologyError(t("apis.technologyError"));
    }
  }, [NYTToken, t]);

  const fetchRandomAdvice = useCallback(
    async (showInlineLoading = false) => {
      try {
        if (showInlineLoading) {
          setAdviceLoading(true);
        }

        setAdviceError("");

        const response = await fetch("https://api.adviceslip.com/advice");

        if (!response.ok) {
          throw new Error(`Advice request failed: ${response.status}`);
        }

        const data = await response.json();
        setRandomAdvice(data.slip);
      } catch (error) {
        console.error("Erro ao pegar advice: ", error);
        setAdviceError(t("apis.adviceError"));
      } finally {
        if (showInlineLoading) {
          setAdviceLoading(false);
        }
      }
    },
    [t],
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);

      await Promise.allSettled([
        fetchRandomAdvice(),
        fetchNYTScienceNews(),
        fetchNYTTechnologyNews(),
      ]);

      setLoading(false);
    };

    fetchInitialData();
  }, [fetchNYTScienceNews, fetchNYTTechnologyNews, fetchRandomAdvice]);

  if (shouldShowLoader) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="mb-5 mt-5 align-items-center text-light text-center">
          <Col md={12}>
            <h1>
              <b>{t("apis.title")}</b>
            </h1>
          </Col>
          <Col md={12}>
            <h3>
              <b>{t("apis.adviceTitle")}</b>
            </h3>
          </Col>
          <Col md={12} className="text-center">
            <Button
              variant="primary"
              onClick={() => fetchRandomAdvice(true)}
              disabled={adviceLoading}
            >
              {t("apis.newAdvice")}
            </Button>
            {adviceError && <p>{adviceError}</p>}

            {adviceLoading ? (
              <p>{t("apis.adviceLoading")}</p>
            ) : randomAdvice ? (
              <h4 style={{ marginTop: "20px" }}>
                <b>{randomAdvice.advice}</b>
              </h4>
            ) : (
              <p>{t("apis.adviceLoading")}</p>
            )}
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4}>
            {scienceError && <p>{scienceError}</p>}

            {scienceNews ? (
              <Card className="text-light mb-3">
                <Card.Img
                  variant="top"
                  src={scienceNews.multimedia?.[0]?.url}
                  alt={scienceNews.title}
                />
                <Card.Body>
                  <Card.Title>{t("apis.scienceTitle")}</Card.Title>
                  <Card.Text>{t("apis.scienceDescription")}</Card.Text>
                  <Button
                    variant="outline-light"
                    href={localizePath("/sciencenewslist", locale)}
                  >
                    {t("apis.seeMore")}
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              !scienceError && <p>{t("apis.scienceLoading")}</p>
            )}
          </Col>
          <Col md={4}>
            {technologyError && <p>{technologyError}</p>}

            {technologyNews ? (
              <Card className="text-light mb-3">
                <Card.Img
                  variant="top"
                  src={technologyNews.multimedia?.[0]?.url}
                  alt={technologyNews.title}
                />
                <Card.Body>
                  <Card.Title>{t("apis.technologyTitle")}</Card.Title>
                  <Card.Text>{t("apis.technologyDescription")}</Card.Text>
                  <Row>
                    <Col md={6}>
                      <Button
                        variant="outline-light"
                        href={localizePath("/technologynewslist", locale)}
                      >
                        {t("apis.seeMore")}
                      </Button>
                    </Col>
                    <Col md={6}>
                      <img
                        src={imageObj.nytWhiteLogo}
                        alt="NYT Logo"
                        style={{ maxWidth: "100%", maxHeight: "100px" }}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              !technologyError && <p>{t("apis.technologyLoading")}</p>
            )}
          </Col>
          <Col md={4}>
            <Card className="text-light mb-3">
              <Card.Img variant="top" src={imageObj.weatherAPILogo} />
              <Card.Body>
                <Card.Title>{t("apis.weatherTitle")}</Card.Title>
                <Card.Text>{t("apis.weatherDescription")}</Card.Text>
                <Row>
                  <Col md={6}>
                    <Button
                      variant="outline-light"
                      href={localizePath("/weatherinfos", locale)}
                    >
                      {t("apis.seeMore")}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
