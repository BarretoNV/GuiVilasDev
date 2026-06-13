import { useCallback, useEffect, useState } from "react";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import NavBar from "../../components/navbar";
import imageObj from "../../assets/images";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";

export default function FunWithAPIs() {
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
        setScienceError("Chave da API do New York Times não configurada.");
        return;
      }

      const url = new URL(
        "https://api.nytimes.com/svc/topstories/v2/science.json"
      );
      url.searchParams.set("api-key", NYTToken);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NYT science request failed: ${response.status}`);
      }

      const data = await response.json();
      setScienceNews(data.results?.[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setScienceError("Não foi possível carregar notícias de ciência.");
    }
  }, [NYTToken]);

  const fetchNYTTechnologyNews = useCallback(async () => {
    try {
      setTechnologyError("");

      if (!NYTToken) {
        setTechnologyNews(null);
        setTechnologyError("Chave da API do New York Times não configurada.");
        return;
      }

      const url = new URL(
        "https://api.nytimes.com/svc/topstories/v2/technology.json"
      );
      url.searchParams.set("api-key", NYTToken);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`NYT technology request failed: ${response.status}`);
      }

      const data = await response.json();
      setTechnologyNews(data.results?.[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setTechnologyError("Não foi possível carregar notícias de tecnologia.");
    }
  }, [NYTToken]);

  const fetchRandomAdvice = useCallback(async (showInlineLoading = false) => {
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
      setAdviceError("Não foi possível carregar o conselho agora.");
    } finally {
      if (showInlineLoading) {
        setAdviceLoading(false);
      }
    }
  }, []);

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
                  <b>Venha me conhecer por meio destas integrações básicas</b>
                </h1>
              </Col>
              <Col md={12}>
                <h3>
                  <b>Mas antes, gere um conselho aleatório para você.</b>
                </h3>
              </Col>
              <Col md={12} className="text-center">
                <Button
                  variant="primary"
                  onClick={() => fetchRandomAdvice(true)}
                  disabled={adviceLoading}
                >
                  Obter Novo Conselho
                </Button>
                {adviceError && <p>{adviceError}</p>}

                {adviceLoading ? (
                  <p>Carregando conselho...</p>
                ) : randomAdvice ? (
                  <h4 style={{ marginTop: "20px" }}>
                    <b>{randomAdvice.advice}</b>
                  </h4>
                ) : (
                  <p>Carregando conselho...</p>
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
                      <Card.Title>Notícias da Ciência</Card.Title>
                      <Card.Text>
                        Notícias da comunidade científica a partir do New York
                        Times
                      </Card.Text>
                      <Button variant="outline-light" href="/sciencenewslist">
                        Ver mais
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  !scienceError && <p>Carregando notícias de ciência...</p>
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
                      <Card.Title>Notícias da Tecnologia</Card.Title>
                      <Card.Text>
                        Notícias de tecnologia a partir do New York Times
                      </Card.Text>
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="outline-light"
                            href="/technologynewslist"
                          >
                            Ver mais
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
                  !technologyError && (
                    <p>Carregando notícias de tecnologia...</p>
                  )
                )}
              </Col>
              <Col md={4}>
                <Card className="text-light mb-3">
                  <Card.Img variant="top" src={imageObj.weatherAPILogo} />
                  <Card.Body>
                    <Card.Title>Ver Clima em alguma cidade</Card.Title>
                    <Card.Text>
                      API de meteorologia, ver informações de tempo em qualquer
                      cidade.
                    </Card.Text>
                    <Row>
                      <Col md={6}>
                        <Button variant="outline-light" href="/weatherinfos">
                          Ver mais
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
