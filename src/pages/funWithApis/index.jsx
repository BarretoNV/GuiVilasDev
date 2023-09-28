import Loader from "../../components/Loader";
import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import ImagesObject from "../../assets/images";

export default function FunWithAPIs() {
  const [loading, setLoading] = useState(true);
  const [NYTScienceData, setNYTScienceData] = useState([]);
  const [NYTTechnologyData, setNYTTechnologyData] = useState([]);
  const [randomAdvice, setRandomAdvice] = useState([]);
  const NYTToken = "B0qUCjKC46AvyPpAlIIgsGV62GOhnrzw";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const fetchNYTScienceNews = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${NYTToken}`
      );
      setNYTScienceData(response.data);
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  const fetchNYTTechnologyNews = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${NYTToken}`
      );
      setNYTTechnologyData(response.data);
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  const fetchRandomAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setRandomAdvice(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao pegar advice: ", error);
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
                <h4 style={{ marginTop: "20px" }}>
                  <b>" {randomAdvice.slip.advice} "</b>
                </h4>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Card className="text-light">
                  <Card.Img
                    variant="top"
                    src={NYTScienceData.results[0].multimedia[0].url}
                  />
                  <Card.Body>
                    <Card.Title>Notícias da Ciência</Card.Title>
                    <Card.Text>
                      Notícias da comunidade científica a partir do New York
                      Times
                    </Card.Text>
                    <Row>
                      <Col md={6}>
                        <Button variant="outline-light" href="/sciencenewslist">
                          Ver mais
                        </Button>
                      </Col>
                      <Col md={6}>
                        <img
                          src={ImagesObject.nytWhiteLogo}
                          alt="NYT Logo"
                          style={{ maxWidth: "100%", maxHeight: "100px" }} // Defina a largura máxima e a altura máxima aqui
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-light">
                  <Card.Img
                    variant="top"
                    src={NYTTechnologyData.results[0].multimedia[0].url}
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
                          src={ImagesObject.nytWhiteLogo}
                          alt="NYT Logo"
                          style={{ maxWidth: "100%", maxHeight: "100px" }} // Defina a largura máxima e a altura máxima aqui
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
