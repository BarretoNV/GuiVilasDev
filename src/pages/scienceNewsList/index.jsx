import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Container, Button, Col, Row, Card, Modal } from "react-bootstrap";
import "./style.css";

export default function NewsList() {
  const [NYTData, setNYTData] = useState([]);
  const [NYTArticle, setNYTArticle] = useState(null);
  const NYTToken = import.meta.env.VITE_NYT_API_KEY;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNYTNews = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${NYTToken}`
      );

      const articles = response.data?.results;

      setNYTData(Array.isArray(articles) ? articles : []);
    } catch (error) {
      console.error("Erro: ", error);
      setNYTData([]);
      setErrorMessage("Não foi possível carregar as notícias de ciência.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article) => {
    setNYTArticle(article);
    setShow(true);
  };

  const handleCloseModal = () => {
    setNYTArticle(null);
    setShow(false);
  };

  const formatPubDate = (timestampString) => {
    const date = new Date(timestampString);

    // Obtém a data no formato DD/MM/YYYY
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adiciona +1 porque os meses em JavaScript são baseados em zero (janeiro é 0)
    const year = date.getFullYear();

    // Obtém a hora e os minutos no formato HH:MM
    const hours = date.getHours().toString().padStart(2, "0"); // Adiciona um zero à esquerda, se necessário
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Adiciona um zero à esquerda, se necessário

    // Obtém o fuso horário no formato +HH:MM ou -HH:MM
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.floor(offsetMinutes / 60);
    const offsetMinutesPart = Math.abs(offsetMinutes % 60);

    const offsetFormatted = `${offsetHours >= 0 ? "+" : "-"}${Math.abs(
      offsetHours
    )
      .toString()
      .padStart(2, "0")}:${offsetMinutesPart.toString().padStart(2, "0")}`;

    return `${day}/${month}/${year} ${hours}:${minutes} (GMT ${offsetFormatted})`;
  };

  useEffect(() => {
    fetchNYTNews();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Row className="mb-5 mt-5 align-items-center text-light text-center">
          <h1>
            Notícias científicas do <b>NEW YORK TIMES</b>
          </h1>
          <Button variant="outline-light" href="/funwithapis">
            Voltar
          </Button>
        </Row>
        <Row>
          {loading && <p className="text-light">Carregando notícias...</p>}
          {errorMessage && <p className="text-light">{errorMessage}</p>}
          {!loading && !errorMessage && NYTData.length === 0 && (
            <p className="text-light">Nenhuma notícia encontrada.</p>
          )}
          {NYTData.map((article) => (
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
                      <p>{formatPubDate(article.published_date)}</p>
                    </Card.Title>
                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-light"
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenModal(article);
                        }}
                      >
                        Ver
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
          ))}
              <Modal
                size="lg"
                centered
                show={show}
                onHide={handleCloseModal}
                className="text-light"
              >
                {NYTArticle && (
                  <>
                    <Modal.Header closeButton className="bg-dark">
                      <Modal.Title className="bg-dark">
                        <h4 className="bg-dark">{NYTArticle.title}</h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark">
                      <p className="bg-dark">{NYTArticle.abstract}</p>
                      {NYTArticle.multimedia?.[0]?.url && (
                        <img
                          className="news-modal-image"
                          src={NYTArticle.multimedia[0].url}
                          alt={NYTArticle.title}
                        />
                      )}
                      <a href={NYTArticle.url} target="_blank" rel="noopener noreferrer">
                        Ver artigo original
                      </a>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark">
                      <Button onClick={handleCloseModal}>Fechar</Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}
