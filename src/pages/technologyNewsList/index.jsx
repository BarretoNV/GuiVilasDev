import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import { Container, Button, Col, Row, Card, Modal } from "react-bootstrap";
import "./style.css";

export default function TechNewsList() {
  const [NYTData, setNYTData] = useState([]);
  const [NYTArticle, setNYTArticle] = useState(null);
  const NYTToken = "B0qUCjKC46AvyPpAlIIgsGV62GOhnrzw";
  const [show, setShow] = useState(false);

  const fetchNYTNews = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&fq=section_name:("Science")&api-key=${NYTToken}`
      );

      const articles = response.data.response.docs;

      setNYTData(articles);
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  console.log(NYTData);

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
            Notícias do mundo da tecnologia pelo <b>NEW YORK TIMES</b>
          </h1>
          <Button variant="outline-light" href="/funwithapis">
            Voltar
          </Button>
        </Row>
        <Row>
          {NYTData.map((article) => (
            <>
              <Col key={article.uri} md={4}>
                <Card className="text-light mt-3 mb-3" border="light">
                  <Card.Img
                    variant="top"
                    src={`https://www.nytimes.com/${article.multimedia[0].url}`}
                    alt={article.headline.main}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h4>{article.headline.main}</h4>
                      <p>{formatPubDate(article.pub_date)}</p>
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
                        <h4 className="bg-dark">{NYTArticle.headline.main}</h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark">
                      <p className="bg-dark">{NYTArticle.lead_paragraph}</p>
                      <img
                        src={`https://www.nytimes.com/${NYTArticle.multimedia[0].url}`}
                        alt={NYTArticle.headline.main}
                      />
                    </Modal.Body>
                    <Modal.Footer className="bg-dark">
                      <Button onClick={handleCloseModal}>Fechar</Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal>
            </>
          ))}
        </Row>
      </Container>
    </>
  );
}
