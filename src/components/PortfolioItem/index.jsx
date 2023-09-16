import { Card, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./style.css";

const PortfolioItem = ({
  title,
  logo,
  screenshot,
  websiteLink,
  technologies,
}) => {
  return (
    <Card className="portfolio-card text-light mb-5 pt-3 pb-3" bg="none">
      <Row className="p-3">
        <Col md={4}>
          <a href={websiteLink} target="_blank" rel="noopener noreferrer">
            <Card.Img
              src={logo}
              alt={`${title} Logo`}
              className="portfolio-logo"
              style={{
                maxWidth: "100px",
                height: "auto",
                marginBottom: "10px",
              }}
            />
          </a>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Button
              variant="outline-primary"
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginBottom: "10px",
              }}
            >
              Acessar o Site
            </Button>
            <h5>Tecnologias Utilizadas:</h5>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </Card.Body>
        </Col>
        <Col md={8}>
          <a href={websiteLink} target="_blank" rel="noopener noreferrer">
            <Card.Img
              src={screenshot}
              alt={`${title} Screenshot`}
              className="portfolio-screenshot"
              style={{
                marginTop: "10px",
              }}
            />
          </a>
        </Col>
      </Row>
    </Card>
  );
};

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  screenshot: PropTypes.string.isRequired,
  websiteLink: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PortfolioItem;
