import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import "./style.css";

export default function Footer() {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer text-light">
      <Container>
        <Row className="footer-content">
          <Col lg={5} className="footer-brand">
            <p className="footer-kicker">{t("footer.kicker")}</p>
            <h3>{t("footer.title")}</h3>
            <p>{t("footer.description")}</p>
          </Col>
          <Col lg={7}>
            <nav className="footer-links" aria-label={t("footer.aria")}>
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
                <FontAwesomeIcon icon={faGithub} /> {t("footer.source")}
              </Button>
            </nav>
          </Col>
        </Row>
        <div className="footer-meta">
          <span>© {currentYear} Guilherme Vilas</span>
          <span>{t("footer.builtWith")}</span>
        </div>
      </Container>
    </footer>
  );
}
