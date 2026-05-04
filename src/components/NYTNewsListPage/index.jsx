import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Footer from "../Footer";
import NavBar from "../navbar";
import "./style.css";

const formatPubDate = (timestampString) => {
  const date = new Date(timestampString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
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

export default function NYTNewsListPage({ section, title, errorMessage }) {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState("");
  const NYTToken = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchNYTNews = async () => {
      setLoading(true);
      setRequestError("");

      if (!NYTToken) {
        setArticles([]);
        setRequestError("Chave da API do New York Times não configurada.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYTToken}`
        );

        const results = response.data?.results;
        setArticles(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Erro: ", error);
        setArticles([]);
        setRequestError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchNYTNews();
  }, [NYTToken, errorMessage, section]);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setShow(true);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setShow(false);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="mb-5 mt-5 align-items-center text-light text-center">
          <h1>
            {title} <b>NEW YORK TIMES</b>
          </h1>
          <Button variant="outline-light" href="/funwithapis">
            Voltar
          </Button>
        </Row>

        <Row>
          {loading && <p className="text-light">Carregando notícias...</p>}
          {requestError && <p className="text-light">{requestError}</p>}
          {!loading && !requestError && articles.length === 0 && (
            <p className="text-light">Nenhuma notícia encontrada.</p>
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
                    <p>{formatPubDate(article.published_date)}</p>
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
                      Ver
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
                  Ver artigo original
                </a>
              </Modal.Body>
              <Modal.Footer className="bg-dark">
                <Button onClick={handleCloseModal}>Fechar</Button>
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
  errorMessage: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
