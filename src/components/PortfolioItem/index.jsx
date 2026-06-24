import { Card, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./style.css";

const PortfolioItem = ({
  title,
  logo,
  screenshot,
  websiteLink,
  buttonLabel,
  description,
  note,
  technologies,
}) => {
  const { t } = useTranslation("common");
  const isExternalLink = websiteLink?.startsWith("http");
  const linkProps = isExternalLink
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const linkedLogo = (
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
  );

  const linkedScreenshot = (
    <Card.Img
      src={screenshot}
      alt={`${title} Screenshot`}
      className="portfolio-screenshot"
      style={{
        marginTop: "10px",
      }}
    />
  );

  return (
    <Card className="portfolio-card text-light mb-5 pt-3 pb-3" bg="none">
      <Row className="p-3">
        <Col md={4}>
          {websiteLink ? (
            <a href={websiteLink} {...linkProps}>
              {linkedLogo}
            </a>
          ) : (
            linkedLogo
          )}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            {description && (
              <Card.Text className="portfolio-description">
                {description}
              </Card.Text>
            )}
            {websiteLink && (
              <Button
                variant="outline-primary"
                href={websiteLink}
                {...linkProps}
                style={{
                  marginBottom: "10px",
                }}
              >
                {buttonLabel || t("portfolio.defaultButton")}
              </Button>
            )}
            {note && <p className="portfolio-note">{note}</p>}
            <h5>{t("portfolio.technologies")}</h5>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </Card.Body>
        </Col>
        <Col md={8}>
          {websiteLink ? (
            <a href={websiteLink} {...linkProps}>
              {linkedScreenshot}
            </a>
          ) : (
            linkedScreenshot
          )}
        </Col>
      </Row>
    </Card>
  );
};

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  screenshot: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  note: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PortfolioItem;
