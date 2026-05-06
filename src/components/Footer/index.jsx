import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import "./style.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer text-light">
      <Container>
        <Row className="footer-content">
          <Col lg={5} className="footer-brand">
            <p className="footer-kicker">Gui Vilas</p>
            <h3>Tecnologia e Marketing.</h3>
            <p>
              Site pessoal mantido como portfólio, arquivo de projetos e um
              pequeno mapa das coisas que eu tenho construído e acompanhado. Se
              quiser conversar, pode entrar em contato comigo pelos links ao
              lado.
            </p>
          </Col>
          <Col lg={7}>
            <nav className="footer-links" aria-label="Links do rodapé">
              <Button
                href="https://github.com/BarretoNV"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </Button>
              <Button
                href="https://www.linkedin.com/in/guibarreto/"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </Button>
              <Button
                href="https://www.instagram.com/barretonvilas/"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </Button>
              <Button
                href="https://open.spotify.com/playlist/37i9dQZF1F5p3rmiWPIYgZ"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faSpotify} /> Spotify
              </Button>
              <Button
                href="https://boxd.it/6Flzt"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                Letterboxd
              </Button>
              <Button
                href="https://github.com/BarretoNV/GuiVilasDev"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> Código fonte
              </Button>
            </nav>
          </Col>
        </Row>
        <div className="footer-meta">
          <span>© {currentYear} Guilherme Vilas</span>
          <span>Desenvolvido com React + Vite</span>
        </div>
      </Container>
    </footer>
  );
}
