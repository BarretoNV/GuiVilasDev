import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import PortfolioItem from "../../components/PortfolioItem";
import ContactForm from "../../components/ContactForm";
import { Container, Col, Row, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import ImagesObject from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import useMinimumLoadingTime from "../../hooks/useMinimumLoadingTime";

import "./style.css";
import imageObj from "../../assets/images";

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState("Food Digital");

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
          period: "abr de 2025 - o momento · 1 ano 2 meses",
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
      logo: ImagesObject.aureaLogo,
      roles: [
        {
          title: "Desenvolvedor Front-End",
          period: "abr de 2019 - jan de 2022 · 2 anos 10 meses",
          description:
            "Primeiro contato profissional com desenvolvimento web e Front-End, desenvolvendo websites em Wordpress e React.js.",
          stack:
            "GitFlow · Git · HTML · SASS · JavaScript · React.js · Informática · CSS",
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

  const projects = [
    {
      title: "Implementação Blockly em sistema embarcado",
      logo: ImagesObject.ficharioLogo,
      screenshot: ImagesObject.blocklyScreenshot,
      websiteLink:
        "https://developers.google.com/blockly?hl=pt-br#build-with-blockly",
      buttonLabel: "Ver biblioteca Blockly",
      description:
        "Projeto profissional desenvolvido na Fichar.io com implementação da biblioteca Blockly em um sistema embarcado fechado. Por sigilo, a imagem é uma referência pública da documentação, não uma tela do produto real.",
      note: "Sistema real não exibido por confidencialidade.",
      technologies: [
        "Blockly",
        "Python",
        "React.js",
        "Sistemas embarcados",
        "Integração de bibliotecas",
        "UI visual",
      ],
    },
    {
      title: "Site Aurea Empresa Júnior",
      logo: ImagesObject.aureaLogo,
      screenshot: ImagesObject.aureaSite,
      websiteLink: "https://www.aureaej.com",
      technologies: ["React.js", "Javascript", "HTML", "CSS", "FireBase"],
    },
    {
      title: "Site Cactus SketchBooks",
      logo: ImagesObject.cactusLogo,
      screenshot: ImagesObject.cactusSite,
      websiteLink: "https://www.cactussketchbooks.com",
      technologies: ["React.js", "Javascript", "HTML", "CSS", "Consumo de API"],
    },
  ];

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
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
                      Trabalho na interseção entre tecnologia, marketing digital
                      e criação visual. Atuo com estratégia de conteúdo para
                      restaurantes, edição de vídeos, social media, disparos de
                      mensagens e otimização de Google Meu Negócio.
                    </p>{" "}
                    <p>
                      Tenho experiência com Front-End em React.js e JavaScript,
                      além de formação inicial em design e fotografia. Formado
                      em engenharia pelo
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
                    gestão de contas e presença digital para marcas e
                    restaurantes.
                  </p>
                  <p>
                    Gosto de atuar onde a parte técnica encontra o problema de
                    negócio: estruturar interfaces, consumir APIs, organizar
                    processos, criar narrativas para redes sociais, acompanhar
                    métricas e transformar demandas soltas em entregas mais
                    claras para clientes e equipes.
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
                        Gestão de contas, suporte, rotina com clientes e
                        alinhamento de expectativas.
                      </p>
                    </article>
                    <article className="about-pillar">
                      <h3>Produto e tecnologia</h3>
                      <p>
                        React, JavaScript, APIs, interfaces, automações e
                        pensamento de engenharia aplicado.
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
                </div>
              </Col>
            </Row>
            <Row id="workHistory" className="mt-5 mb-5 text-light">
              <Col md={12}>
                <h2>02. Onde Trabalhei</h2>
              </Col>
              <Row>
                <Col
                  md={4}
                  className="d-grid gap-2 gap-md-5 mb-4 menu-container"
                >
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
                  {projects.map((project, index) => (
                    <PortfolioItem key={index} {...project} />
                  ))}
                </div>
              </section>
            </Row>
            <Row
              id="contact"
              className="mb-5 mt-5 align-items-center text-light"
              style={{ height: "80vh" }}
            >
              <Col md={12}>
                <h2>04. Entre em contato comigo</h2>
              </Col>
              <Col md={8} className="text-center">
                <h3>Minhas redes sociais:</h3>
                <ul className="list-unstyled">
                  <li>
                    <Button
                      href="https://www.linkedin.com/in/guibarreto/"
                      target="_blank"
                      variant="outline-primary"
                      className="mb-2"
                    >
                      <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://www.instagram.com/barretonvilas/"
                      target="_blank"
                      variant="outline-primary"
                      className="mb-2"
                    >
                      <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://www.instagram.com/gbarretodesign/"
                      target="_blank"
                      variant="outline-primary"
                      className="mb-2"
                    >
                      <FontAwesomeIcon icon={faInstagram} /> Design
                    </Button>
                  </li>
                </ul>
              </Col>
              <Col md={4}>
                <ContactForm />
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
