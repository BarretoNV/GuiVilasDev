import { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import PortfolioItem from "../../components/PortfolioItem";
import ShareButton from "../../components/ShareButton";
import { Container, Col, Row, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import ImagesObject from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";
import useLocale from "../../hooks/useLocale";
import { getHomeContent, formatDurationSince } from "../../data/homeContent";
import { getProjects } from "../../data/projects";
import { getAudiovisualPortfolio } from "../../data/audiovisualPortfolio";
import { localizePath } from "../../utils/i18nRouting";
import AudiovisualCard from "../../components/AudiovisualCard";

import "./style.css";
import imageObj from "../../assets/images";

export default function Home() {
  const locale = useLocale();
  const content = getHomeContent(locale);
  const projects = getProjects(locale);
  const audiovisualPortfolio = getAudiovisualPortfolio(locale);
  const [selectedCompany, setSelectedCompany] = useState("Food Digital");
  const foodDigitalDuration = formatDurationSince(2025, 3, locale);

  const [pageReady, setPageReady] = useState(false);
  const loading = useMinimumLoadingTime(!pageReady);

  useEffect(() => {
    const preloadImage = (src) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      });

    Promise.allSettled([
      preloadImage(imageObj.scrollDown),
      preloadImage(imageObj.heroPic),
    ]).finally(() => {
      setPageReady(true);
    });
  }, []);

  if (!selectedCompany) {
    return null;
  }

  const companies = content.companies.map((company) => ({
    ...company,
    roles: company.roles.map((role) => ({
      ...role,
      period: role.dynamicDuration
        ? `${role.periodPrefix} · ${foodDigitalDuration}`
        : role.period,
    })),
  }));
  const selectedCompanyData = companies.find(
    (opt) => opt.value === selectedCompany,
  );

  const featuredProjects = projects.slice(0, 3);
  const featuredVideos = audiovisualPortfolio
    .filter((video) => video.featured)
    .slice(0, 3);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <section
        className="hero-section"
        style={{ "--hero-image": `url(${imageObj.heroPic})` }}
      >
        <Container className="hero-container">
          <Row className="hero-row align-items-center">
            <Col lg={9} xl={8}>
              <div className="hero-content text-light">
                <p>{content.hero.greeting}</p>
                <h1>
                  <b>{content.hero.name}</b>
                </h1>
                <h2>{content.hero.title}</h2>
                <p>{content.hero.paragraphs[0]}</p>
                <p>
                  {content.hero.paragraphs[1]}{" "}
                  <a
                    href="https://portal1.iff.edu.br"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {content.hero.institute}
                  </a>
                </p>
                <div className="hero-actions">
                  <Button
                    type="button"
                    variant="dark"
                    href="https://www.linkedin.com/in/guibarreto/"
                    target="_blank"
                    size="lg"
                    className="hero-linkedin-button"
                  >
                    {content.hero.linkedin}
                  </Button>
                  <ShareButton
                    title="GuiVilas Dev"
                    text={content.hero.shareText}
                    path={localizePath("/", locale)}
                    imagePath="/social/home-profile-square.png"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <small className="hero-credit">{content.hero.credit}</small>
          <div className="hero-scroll-indicator">
            <img src={imageObj.scrollDown} alt={content.hero.scrollAlt} />
          </div>
        </Container>
      </section>
      <Container>
        <Row id="aboutMe" className="mt-5 mb-5 text-light">
          <Col sm={12}>
            <div className="about-section">
              <h2>{content.about.title}</h2>
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="about-pillars">
                {content.about.pillars.map((pillar) => (
                  <article className="about-pillar" key={pillar.title}>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </article>
                ))}
              </div>
              <div className="about-credential">
                <img
                  src={ImagesObject.clickUpPowerUserBadge}
                  alt={content.about.credential.alt}
                  className="about-credential-badge"
                />
                <div className="about-credential-content">
                  <h3>{content.about.credential.title}</h3>
                  <p>{content.about.credential.text}</p>
                  <a
                    href="https://clickup.com/verified-power-user"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.about.credential.link}
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="workHistory" className="mt-5 mb-5 text-light">
          <Col md={12}>
            <h2>{content.sections.career}</h2>
          </Col>
          <Row>
            <Col md={4} className="d-grid gap-2 gap-md-5 mb-4 menu-container">
              <ul className="menu-list">
                {companies.map((company) => (
                  <li key={company.value}>
                    <Button
                      variant={
                        selectedCompany === company.value
                          ? "light"
                          : "outline-light"
                      }
                      onClick={() => setSelectedCompany(company.value)}
                    >
                      {company.value}
                    </Button>
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={8}>
              <Row className="company-info">
                <Col md={3}>
                  <img
                    src={selectedCompanyData.logo}
                    alt={selectedCompanyData.value}
                    className="company-logo"
                  />
                </Col>
                <Col md={8}>
                  <div className="company-details">
                    <h3>{selectedCompanyData.value}</h3>
                    {selectedCompanyData.companyMeta && (
                      <p className="company-meta">
                        {selectedCompanyData.companyMeta}
                      </p>
                    )}
                    {selectedCompanyData.location && (
                      <p className="company-location">
                        {selectedCompanyData.location}
                      </p>
                    )}
                  </div>
                  <div className="company-roles">
                    {selectedCompanyData.roles.map((role) => (
                      <article className="company-role" key={role.title}>
                        <h4>{role.title}</h4>
                        <p className="role-period">{role.period}</p>
                        <p>{role.description}</p>
                        <p className="company-stack">
                          <b>{content.sections.skills}</b> {role.stack}
                        </p>
                      </article>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row id="projects" className="mt-5 mb-5 text-light">
          <Col md={12}>
            <h2>{content.sections.projects}</h2>
          </Col>
          <section className="portfolio">
            <div className="portfolio-grid">
              {featuredProjects.map((project) => (
                <PortfolioItem key={project.key} {...project} />
              ))}
            </div>
            <div className="projects-cta">
              <Button
                type="button"
                variant="outline-primary"
                href={localizePath("/projects", locale)}
                size="lg"
              >
                {content.sections.allProjects}
              </Button>
            </div>
          </section>
        </Row>
        <Row
          id="audiovisual"
          className="mt-5 mb-5 text-light audiovisual-home-section"
        >
          <Col md={12}>
            <h2>{content.sections.audiovisual}</h2>
            <p className="audiovisual-home-intro">
              {content.sections.audiovisualIntro}
            </p>
          </Col>
          <Col md={12}>
            <div className="audiovisual-home-grid">
              {featuredVideos.map((video) => (
                <AudiovisualCard
                  key={video.key}
                  video={video}
                  href={localizePath("/portfolio-audiovisual", locale)}
                />
              ))}
            </div>
            <div className="audiovisual-home-cta">
              <Button
                type="button"
                variant="outline-primary"
                href={localizePath("/portfolio-audiovisual", locale)}
                size="lg"
              >
                {content.sections.audiovisualCta}
              </Button>
            </div>
          </Col>
        </Row>
        <Row id="culture" className="mt-5 mb-5 text-light culture-section">
          <Col md={12}>
            <h2>{content.sections.culture}</h2>
            <p className="culture-intro">{content.sections.cultureIntro}</p>
          </Col>
          <Col lg={8} className="mb-4 mb-lg-0">
            <div className="spotify-embed-wrapper">
              <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/playlist/3XYLiGb2FzX7kgpM84BWXX?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </Col>
          <Col lg={4}>
            <article className="letterboxd-card">
              <img
                src={ImagesObject.letterboxdLogo}
                alt="Letterboxd"
                className="letterboxd-logo"
              />
              <h3>{content.sections.filmDiary}</h3>
              <p>{content.sections.filmDiaryText}</p>
              <Button
                href="https://letterboxd.com/guibarr3to/"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
                className="letterboxd-link"
              >
                {content.sections.openLetterboxd}
              </Button>
            </article>
          </Col>
        </Row>
        <Row
          id="contact-legacy"
          className="mb-5 mt-5 align-items-center text-light contact-section"
        >
          <Col md={12}>
            <h2>{content.sections.contact}</h2>
          </Col>
          <Col lg={5}>
            <p className="contact-copy">{content.sections.contactCopy}</p>
          </Col>
          <Col lg={7}>
            <div className="contact-links">
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
                href="https://www.instagram.com/gbarretodesign/"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faInstagram} /> Design
              </Button>
              <Button
                href="https://github.com/BarretoNV"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </Button>
              <Button
                href="https://open.spotify.com/playlist/37i9dQZF1F5p3rmiWPIYgZ"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faSpotify} /> Spotify
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
