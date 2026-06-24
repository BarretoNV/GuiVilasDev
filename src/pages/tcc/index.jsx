import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar";
import ShareButton from "../../components/ShareButton";
import ImagesObject from "../../assets/images";
import useLocale from "../../hooks/useLocale";
import { localizePath } from "../../utils/i18nRouting";
import { getTccContent, tccLibraryUrl } from "../../data/tccContent";
import "./style.css";

export default function Tcc() {
  const locale = useLocale();
  const content = getTccContent(locale);

  return (
    <>
      <NavBar />
      <main className="tcc-page text-light">
        <section className="tcc-hero">
          <Container>
            <Row className="align-items-center g-4">
              <Col lg={7}>
                <p className="tcc-kicker">{content.hero.kicker}</p>
                <h2>{content.hero.title}</h2>
                <p className="tcc-hero-copy">{content.hero.copy}</p>
                <div className="tcc-meta-list" aria-label={content.hero.kicker}>
                  {content.hero.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="tcc-actions">
                  <Button
                    href={tccLibraryUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outline-primary"
                    size="lg"
                  >
                    {content.hero.cta}
                  </Button>
                  <ShareButton
                    title="TCC - Gui Vilas"
                    text={content.shareText}
                    path={localizePath("/tcc", locale)}
                    imagePath="/social/og-default.png"
                  />
                </div>
              </Col>
              <Col lg={5}>
                <figure className="tcc-hero-figure">
                  <img
                    src={ImagesObject.tccGraphExample}
                    alt={content.hero.imageAlt}
                  />
                  <figcaption>{content.hero.imageCaption}</figcaption>
                </figure>
              </Col>
            </Row>
          </Container>
        </section>

        <Container>
          <section className="tcc-section tcc-problem-section">
            <Row className="g-4">
              <Col lg={5}>
                <p className="tcc-section-label">{content.problem.label}</p>
                <h2>{content.problem.title}</h2>
              </Col>
              <Col lg={7}>
                {content.problem.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Col>
            </Row>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">{content.approach.label}</p>
              <h2>{content.approach.title}</h2>
              <p>{content.approach.copy}</p>
            </div>
            <div className="tcc-approach-grid">
              {content.approach.steps.map((step) => (
                <article className="tcc-approach-item" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section tcc-ranking-section">
            <Row className="g-4 align-items-center">
              <Col lg={5}>
                <p className="tcc-section-label">{content.ranking.label}</p>
                <h2>{content.ranking.title}</h2>
                {content.ranking.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Col>
              <Col lg={7}>
                <figure className="tcc-feature-figure">
                  <img
                    src={ImagesObject.tccNeuralNetwork}
                    alt={content.ranking.imageAlt}
                    loading="lazy"
                  />
                  <figcaption>{content.ranking.imageCaption}</figcaption>
                </figure>
              </Col>
            </Row>
            <div className="tcc-insight-grid">
              {content.ranking.cards.map((card) => (
                <article className="tcc-insight-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">{content.model.label}</p>
              <h2>{content.model.title}</h2>
              <p>{content.model.copy}</p>
            </div>
            <div className="tcc-model-grid">
              {content.model.cards.map((card) => (
                <article className="tcc-model-card" key={card.title}>
                  <span>{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <div className="tcc-model-outcome">
              <strong>{content.model.outcomeLabel}</strong>
              <span>{content.model.outcome}</span>
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">{content.rigor.label}</p>
              <h2>{content.rigor.title}</h2>
              <p>{content.rigor.copy}</p>
            </div>
            <div className="tcc-rigor-grid">
              {content.rigor.cards.map((card) => (
                <article className="tcc-rigor-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">{content.visuals.label}</p>
              <h2>{content.visuals.title}</h2>
            </div>
            <div className="tcc-visual-grid">
              {content.visuals.items.map((item) => (
                <figure className="tcc-visual-item" key={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="tcc-section tcc-results-section">
            <Row className="g-4 align-items-start">
              <Col lg={5}>
                <p className="tcc-section-label">{content.results.label}</p>
                <h2>{content.results.title}</h2>
                {content.results.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Col>
              <Col lg={7}>
                <div className="tcc-highlight-grid">
                  {content.results.highlights.map((highlight) => (
                    <article className="tcc-highlight" key={highlight.value}>
                      <strong>{highlight.value}</strong>
                      <span>{highlight.label}</span>
                    </article>
                  ))}
                </div>
                <div className="tcc-result-images">
                  {content.results.images.map((item) => (
                    <figure key={item.title}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <figcaption>{item.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </Col>
            </Row>
          </section>

          <section className="tcc-section tcc-conclusion-section">
            <Row className="g-4 align-items-center">
              <Col lg={7}>
                <p className="tcc-section-label">{content.conclusion.label}</p>
                <h2>{content.conclusion.title}</h2>
                <p>{content.conclusion.copy}</p>
              </Col>
              <Col lg={5}>
                <div className="tcc-final-cta">
                  <h3>{content.conclusion.boxTitle}</h3>
                  <p>{content.conclusion.boxText}</p>
                  <Button
                    href={tccLibraryUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  >
                    {content.conclusion.boxCta}
                  </Button>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
