import { useState, useEffect } from "react";
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
import projects from "../../data/projects";

import "./style.css";
import imageObj from "../../assets/images";

const formatDurationSince = (
  startYear,
  startMonthIndex,
  referenceDate = new Date(),
) => {
  const currentYear = referenceDate.getFullYear();
  const currentMonthIndex = referenceDate.getMonth();
  const totalMonths =
    (currentYear - startYear) * 12 + currentMonthIndex - startMonthIndex + 1;

  if (totalMonths <= 0) {
    return "0 meses";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  }

  return parts.join(" ");
};

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState("Food Digital");
  const foodDigitalDuration = formatDurationSince(2025, 3);

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

  const companies = [
    {
      value: "Food Digital",
      companyMeta: "Tempo integral",
      location: "Remota",
      logo: ImagesObject.foodDigitalLogo,
      roles: [
        {
          title: "Gerente de mídias sociais",
          period: `abr de 2025 - o momento · ${foodDigitalDuration}`,
          description:
            "Gestão de mídias sociais. Edição de vídeos e imagens. Planejamento estratégico de marketing. Gestão de projetos.",
          stack:
            "Gestão de projetos · Publicidade em mídias sociais · Edição de vídeo · Planejamento estratégico",
        },
      ],
    },
    {
      value: "Rush Co",
      companyMeta: "Tempo integral · 10 m",
      location: "Remota",
      logo: ImagesObject.rushCoDigitalLogo,
      roles: [
        {
          title: "Gerente de contas",
          period: "mar de 2025 - abr de 2025 · 2 meses",
          description:
            "Gestão de projetos e liderança de equipes multidisciplinar. Manutenção de relacionamento próximo e produtivo com a carteira de clientes. Identificação de oportunidades de negócios. Gestão de expectativas dos clientes. Monitoramento do uso de produtos e serviços. Gestão de crises. Representação da empresa e das necessidades dos clientes. Provisão de suporte diário para atender às necessidades dos clientes.",
          stack:
            "Gestão de projetos · Suporte ao cliente · Métricas de mídias sociais · Gestão de tráfego",
        },
        {
          title: "Social Media",
          period: "jul de 2024 - mar de 2025 · 9 meses",
          description:
            "Gerenciamento, planejamento, estruturação e manutenção de redes sociais.",
          stack: "Instagram · Copywriting",
        },
      ],
    },
    {
      value: "Infinite Growth",
      companyMeta: "Tempo integral",
      location: "Campos dos Goytacazes · Híbrida",
      logo: ImagesObject.infiniteLogo,
      roles: [
        {
          title: "Social Media",
          period: "jan de 2024 - jun de 2024 · 6 meses",
          description:
            "Elaboração e desenvolvimento de criativos para redes sociais, assim como idealização de roteiros e editoriais de postagens para utilização em campanhas ou em simples posts em plataformas, como: Meta, Google, Tiktok, Kwai e outras similares.",
          stack:
            "Desenvolvimento de ideias · Marketing de mídias sociais · Narrativas visuais · Produção de vídeo",
        },
      ],
    },
    {
      value: "Fichar.io",
      logo: ImagesObject.ficharioLogo,
      roles: [
        {
          title: "Desenvolvedor Front-End",
          period: "jun de 2023 - jan de 2024 · 8 meses",
          description:
            "Desenvolvimento em Front-End com React + Vite, usando Bootstrap. Trabalhando como bolsista a partir do Instituto Federal Fluminense em parceria com a Fichar.io.",
          stack: "React · Javascript · CSS Bootstrap · Consumo de APIs · Vite",
        },
      ],
    },
    {
      value: "Vetta.Digital",
      logo: ImagesObject.vettaLogo,
      roles: [
        {
          title: "Estagiário de desenvolvimento",
          period: "nov de 2022 - jun de 2023 · 8 meses",
          description:
            "Estágio de desenvolvimento de programas e sistemas em Javascript e Back-End em Java, mobile e desktop. Pair programming e uso de frameworks próprios da empresa.",
          stack: "React · Javascript · Java · PostGre · React Native",
        },
      ],
    },
    {
      value: "Retornar Tecnologia",
      logo: ImagesObject.retornarLogo,
      roles: [
        {
          title: "Desenvolvedor Front-End",
          period: "nov de 2021 - ago de 2022 · 10 meses",
          description:
            "Lançamento e manutenção de landing pages feitas com HTML, CSS e Javascript, além de auxiliar na manutenção de projetos em React.js, trabalhando em conjunto com designers UI/UX.",
          stack:
            "GitFlow · Git · HTML · JavaScript · React.js · E-mails em HTML · Bootstrap · Informática · HTML5 · CSS",
        },
      ],
    },
    {
      value: "Aurea Empresa Júnior",
      companyMeta: "2 anos 10 meses",
      location: "Campos dos Goytacazes, Rio de Janeiro, Brasil",
      logo: ImagesObject.aureaLogo,
      roles: [
        {
          title: "Desenvolvedor da web",
          period: "abr de 2019 - jan de 2022 · 2 anos 10 meses",
          description:
            "Primeiro contato profissional com desenvolvimento web e front-end, criando sites em WordPress e React.js.",
          stack:
            "CSS · React.js · GitFlow · Git · Informática · SASS · JavaScript · HTML",
        },
        {
          title: "Coordenador de Endomarketing",
          period: "jan de 2021 - dez de 2021 · 1 ano",
          description:
            "Coordenação de comunicação interna, ações de endomarketing e alinhamento da equipe.",
          stack:
            "Mídias sociais · Adobe Photoshop · Informática · Edição de imagens · Design gráfico · Corel Draw · Adobe Premiere",
        },
        {
          title: "Assessor de comunicação",
          period: "abr de 2019 - jan de 2021 · 1 ano 10 meses",
          description:
            "Atuação com comunicação, marketing interno, edição de imagem e vídeo, divulgação da marca e aprendizado sobre equipe, liderança e relações com clientes.",
          stack:
            "Mídias sociais · Adobe Photoshop · Informática · Edição de imagens · Design gráfico · Corel Draw · Adobe Premiere",
        },
      ],
    },
  ];

  if (!selectedCompany) {
    return null;
  }

  const selectedCompanyData = companies.find(
    (opt) => opt.value === selectedCompany,
  );

  const featuredProjects = projects.slice(0, 3);
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
                <p>Olá mundo, meu nome é</p>
                <h1>
                  <b>Guilherme Vilas</b>
                </h1>
                <h2>Engenheiro da Computação</h2>
                <p>
                  Trabalho na interseção entre tecnologia, marketing digital e
                  criação visual. Atuo com estratégia de conteúdo para
                  restaurantes, edição de vídeos, social media, disparos de
                  mensagens e otimização de Google Meu Negócio.
                </p>{" "}
                <p>
                  Tenho experiência com Front-End em React.js e JavaScript, além
                  de formação inicial em design e fotografia. Formado em
                  engenharia pelo
                  <a
                    href="https://portal1.iff.edu.br"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    Instituto Federal Fluminense.
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
                    Meu Linkedin
                  </Button>
                  <ShareButton
                    title="GuiVilas Dev"
                    text="Projetos, blog e astrofotografia por Guilherme Barreto."
                    path="/"
                    imagePath="/social/home-profile-square.png"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <small className="hero-credit">Imagem: NASA.gov</small>
          <div className="hero-scroll-indicator">
            <img src={imageObj.scrollDown} alt="Role para baixo" />
          </div>
        </Container>
      </section>
      <Container>
        <Row id="aboutMe" className="mt-5 mb-5 text-light">
          <Col sm={12}>
            <div className="about-section">
              <h2>01. Sobre mim</h2>
              <p>
                Sou engenheiro da computação e trabalho na interseção entre
                produto digital, conteúdo e operação de marketing. Minha
                trajetória passou por desenvolvimento front-end, projetos em
                React.js e, mais recentemente, pela rotina de social media,
                gestão de contas e presença digital para marcas e restaurantes.
              </p>
              <p>
                Gosto de atuar onde a parte técnica encontra o problema de
                negócio: estruturar interfaces, consumir APIs, organizar
                processos, criar narrativas para redes sociais, acompanhar
                métricas e transformar demandas soltas em entregas mais claras
                para clientes e equipes.
              </p>
              <p>Hoje meu trabalho conecta:</p>
              <div className="about-pillars">
                <article className="about-pillar">
                  <h3>Estratégia e conteúdo</h3>
                  <p>
                    Planejamento editorial, narrativas para redes sociais,
                    criativos e consistência de comunicação.
                  </p>
                </article>
                <article className="about-pillar">
                  <h3>Operação e relacionamento</h3>
                  <p>
                    Gestão de contas, suporte, rotina com clientes e alinhamento
                    de expectativas.
                  </p>
                </article>
                <article className="about-pillar">
                  <h3>Produto e tecnologia</h3>
                  <p>
                    React, JavaScript, APIs, interfaces, automações e pensamento
                    de engenharia aplicado.
                  </p>
                </article>
                <article className="about-pillar">
                  <h3>Métricas e melhoria contínua</h3>
                  <p>
                    Google Meu Negócio, campanhas, leitura de resultados e
                    ajustes de presença digital.
                  </p>
                </article>
              </div>
              <div className="about-credential">
                <img
                  src={ImagesObject.clickUpPowerUserBadge}
                  alt="Selo ClickUp Power User"
                  className="about-credential-badge"
                />
                <div className="about-credential-content">
                  <h3>ClickUp Power User</h3>
                  <p>
                    Usuário avançado autenticado pela ClickUp, reconhecimento
                    associado ao uso intenso da plataforma em operações,
                    dashboards, tarefas e processos.
                  </p>
                  <a
                    href="https://clickup.com/verified-power-user"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver programa ClickUp Verified
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="workHistory" className="mt-5 mb-5 text-light">
          <Col md={12}>
            <h2>02. Minha carreira</h2>
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
                          <b>Competências:</b> {role.stack}
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
            <h2>03. Alguns projetos que fiz</h2>
          </Col>
          <section className="portfolio">
            <div className="portfolio-grid">
              {featuredProjects.map((project, index) => (
                <PortfolioItem key={index} {...project} />
              ))}
            </div>
            <div className="projects-cta">
              <Button
                type="button"
                variant="outline-primary"
                href="/projects"
                size="lg"
              >
                Ver todos os projetos
              </Button>
            </div>
          </section>
        </Row>
        <Row id="culture" className="mt-5 mb-5 text-light culture-section">
          <Col md={12}>
            <h2>04. Outros</h2>
            <p className="culture-intro">
              Músicas e filmes que eu gosto.
            </p>
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
                  <h3>Meu diário de filmes</h3>
              <p>
                Não espere resenhas profundas.
              </p>
              <Button
                href="https://letterboxd.com/guibarr3to/"
                target="_blank"
                rel="noreferrer"
                variant="outline-primary"
                className="letterboxd-link"
              >
                Abrir Letterboxd
              </Button>
            </article>
          </Col>
        </Row>
        <Row
          id="contact-legacy"
          className="mb-5 mt-5 align-items-center text-light contact-section"
        >
          <Col md={12}>
            <h2>05. Entre em contato comigo</h2>
          </Col>
          <Col lg={5}>
            <p className="contact-copy">
              Para conversar sobre projetos, conteúdo, tecnologia ou uma boa
              ideia ainda meio solta, estes são os melhores caminhos.
            </p>
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
