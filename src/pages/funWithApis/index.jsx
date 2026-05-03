import Loader from "../../components/Loader";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import imageObj from "../../assets/images";

export default function FunWithAPIs() {
  const [loading, setLoading] = useState(true);
  const [scienceNews, setScienceNews] = useState(null);
  const [technologyNews, setTechnologyNews] = useState(null);
  const [randomAdvice, setRandomAdvice] = useState(null);

  const [scienceError, setScienceError] = useState("");
  const [technologyError, setTechnologyError] = useState("");
  const [adviceError, setAdviceError] = useState("");

  const NYTToken = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const fetchNYTScienceNews = async () => {
    try {
      setScienceError("");

      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${NYTToken}`,
      );

      setScienceNews(response.data.results?.[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setScienceError("Não foi possível carregar notícias de ciência.");
    }
  };

  const fetchNYTTechnologyNews = async () => {
    try {
      setTechnologyError("");

      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${NYTToken}`,
      );

      setTechnologyNews(response.data.results?.[0] ?? null);
    } catch (error) {
      console.error("Erro: ", error);
      setTechnologyError("Não foi possível carregar notícias de tecnologia.");
    }
  };

  const fetchRandomAdvice = async () => {
    try {
      setAdviceError("");

      const response = await axios.get("https://api.adviceslip.com/advice");

      setRandomAdvice(response.data.slip);
    } catch (error) {
      console.error("Erro ao pegar advice: ", error);
      setAdviceError("Não foi possível carregar o conselho agora.");
    }
  };

  useEffect(() => {
    fetchRandomAdvice();
  }, []);

  useEffect(() => {
    fetchNYTScienceNews();
    fetchNYTTechnologyNews();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
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
                <Button variant="primary" onClick={fetchRandomAdvice}>
                  Obter Novo Conselho
                </Button>
                {adviceError && <p>{adviceError}</p>}

                {randomAdvice ? (
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
                  <p>Carregando notícias de ciência...</p>
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
                  <p>Carregando notícias de tecnologia...</p>
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
        </>
      )}
      <Footer />
    </>
  );
}
