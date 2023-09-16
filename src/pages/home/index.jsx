import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import PortfolioItem from "../../components/PortfolioItem";
import ContactForm from "../../components/ContactForm";
import { Container, Col, Row, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import aureaLogo from "../../assets/aurea.jpg";
import vettaLogo from "../../assets/vetta.jpg";
import retornarLogo from "../../assets/retornar.jpg";
import ficharioLogo from "../../assets/fichario.svg";
import cactusLogo from "../../assets/cactopng2.png";
import cLogo from "../../assets/logo-c-1024.png";
import cssLogo from "../../assets/logo-css-3-1024.png";
import htmlLogo from "../../assets/logo-html-5-1024.png";
import javascriptLogo from "../../assets/logo-javascript-1024.png";
import nodeLogo from "../../assets/logo-node-js-1024.png";
import reactLogo from "../../assets/logo-react-1024.png";
import wordpressLogo from "../../assets/logo-wordpress-1024.png";
import aureaSite from "../../assets/AureaSite.png";
import cactusSite from "../../assets/CactusSite.png";

import "./style.css";

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState("Fichar.io");
  const [ficharioSelected, setFicharioSelected] = useState("light");
  const [vettaSelected, setVettaSelected] = useState("outline-light");
  const [retornarSelected, setRetornarSelected] = useState("outline-light");
  const [aureaSelected, setAureaSelected] = useState("outline-light");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule um carregamento demorado, por exemplo, com um setTimeout
    setTimeout(() => {
      setLoading(false); // Após o carregamento, defina loading como falso
    }, 2000); // Tempo de simulação em milissegundos
  }, []);

  const companyColors = {
    "Fichar.io": {
      fichario: "light",
      vetta: "outline-light",
      retornar: "outline-light",
      aurea: "outline-light",
    },
    "Vetta.Digital": {
      fichario: "outline-light",
      vetta: "light",
      retornar: "outline-light",
      aurea: "outline-light",
    },
    "Retornar Tecnologia": {
      fichario: "outline-light",
      vetta: "outline-light",
      retornar: "light",
      aurea: "outline-light",
    },
    "Aurea Empresa Júnior": {
      fichario: "outline-light",
      vetta: "outline-light",
      retornar: "outline-light",
      aurea: "light",
    },
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);

    const { fichario, vetta, retornar, aurea } = companyColors[company];

    setFicharioSelected(fichario);
    setVettaSelected(vetta);
    setRetornarSelected(retornar);
    setAureaSelected(aurea);
  };

  const companies = [
    {
      value: "Fichar.io",
      text: "Desenvolvimento em Front-End com React + Vite, usando Bootstrap. Trabalhando como bolsista a partir do Instituto Federal Fluminense em parceria com a Fichar.io",
      stack: "React · Javascript · CSS Bootstrap · Consumo de APIs · Vite",
      logo: ficharioLogo,
    },
    {
      value: "Vetta.Digital",
      text: "Estágio de Desenvolvimento de programas e sistemas em Javascript e Back-End em Java, mobile e desktop. PairPogramming e uso  de Frameworks próprios da empresa.",
      stack: "React · Javascript · Java · PostGre · React Native",
      logo: vettaLogo,
    },
    {
      value: "Retornar Tecnologia",
      text: "O foco do meu trabalho com a Retornar foi garantir o lançamento e manutenção das várias Landing Pages da empresa, feitas com HTML, CSS e Javascript, além de auxiliar na manutenção de projetos em React.js, trabalhando em conjunto com designers UI/UX.O foco do meu trabalho com a Retornar foi garantir o lançamento e manutenção das várias Landing Pages da empresa, feitas com HTML, CSS e Javascript, além de auxiliar na manutenção de projetos em React.js, trabalhando em conjunto com designers UI/UX.",
      stack:
        "GitFlow · Git · HTML · JavaScript · React.js · E-mails em HTML · Bootstrap · Informática · HTML5 · CSS",
      logo: retornarLogo,
    },
    {
      value: "Aurea Empresa Júnior",
      text: "Primeiro contato profissional com desenvolvimento web / Front-End. Desenvolvendo websites em Wordpress e React.js",
      stack:
        "GitFlow · Git · HTML · SASS · JavaScript · React.js · Informática · CSS",
      logo: aureaLogo,
    },
  ];

  if (!selectedCompany) {
    return null;
  }

  const selectedCompanyData = companies.find(
    (opt) => opt.value === selectedCompany
  );

  const projects = [
    {
      title: "Site Aurea Empresa Júnior",
      logo: aureaLogo,
      screenshot: aureaSite,
      websiteLink: "https://www.aureaej.com",
      technologies: ["React.js", "Javascript", "HTML", "CSS", "FireBase"],
    },
    {
      title: "Site Cactus SketchBooks",
      logo: cactusLogo,
      screenshot: cactusSite,
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
          <Container>
            <Row
              className="mb-5 mt-5 align-items-center"
              style={{ height: "80vh" }}
            >
              <Col>
                <div className="mt-4 text-light">
                  <p>Olá mundo, meu nome é</p>
                  <h1>
                    <b>Guilherme Vilas</b>
                  </h1>
                  <h2>Desenvolvedor Front-End</h2>
                  <p>
                    Desenvolvedor Front-End, com foco em React.js, com formação
                    em design e atualmente cursando Engenharia de Computação no
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
                  >
                    Meu Linkedin
                  </Button>
                </div>
              </Col>
            </Row>
            <Row id="aboutMe" className="mt-5 mb-5 text-light">
              <Col sm={12}>
                <div>
                  <h2>01. Sobre mim</h2>
                  <p>
                    Trabalho com Desenvolvimento Web e Desenvolvimento
                    Front-End, com bastante experiência com HTML5, CSS e
                    Javascript puros, mas principalmente em REACT.JS.
                  </p>{" "}
                  <p>
                    {" "}
                    Sempre tive facilidade com pessoas, talvez esse seja o
                    motivo pelo qual sempre fui representante de turma em todas
                    as minhas turmas e, dentro da faculdade, me tornei
                    Coordenador dentro da
                    <a
                      href="https://www.aureaej.com"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      Aurea Empresa Júnior{" "}
                    </a>
                    (Fiz parte do desenvolvimento desse site também 😉), onde
                    aprimorei ainda mais minhas Soft Skills.
                  </p>
                  <p>
                    Hoje sou bolsista na Universidade, em um projeto de
                    desenvolvimento em React.js, onde sou responsável pelas
                    tarefas no front-end, como design de telas, funcionalidades
                    variadas, integrações em APIs e etc.
                  </p>
                  <p>
                    Aqui estão algumas das tecnologias que tenho trabalhado
                    recentemente:
                  </p>
                  <Row>
                    <Col>
                      <ul
                        style={{
                          listStyleType: "none",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={javascriptLogo}
                              alt="Javascript"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>Javascript</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={nodeLogo}
                              alt="Node.js"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>Node.js</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={reactLogo}
                              alt="React.js"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>React.js</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={cLogo}
                              alt="C"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>C</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={wordpressLogo}
                              alt="WordPress"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>WordPress</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={htmlLogo}
                              alt="HTML"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>HTML</p>
                          </div>
                        </li>
                        <li style={{ margin: "10px", textAlign: "center" }}>
                          <div>
                            <img
                              src={cssLogo}
                              alt="CSS"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>CSS</p>
                          </div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
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
                    <li>
                      <Button
                        variant={ficharioSelected}
                        onClick={() => handleCompanyClick("Fichar.io")}
                      >
                        Fichar.io 2023-Presente
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={vettaSelected}
                        onClick={() => handleCompanyClick("Vetta.Digital")}
                      >
                        Vetta.Digital 2022-2023
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={retornarSelected}
                        onClick={() =>
                          handleCompanyClick("Retornar Tecnologia")
                        }
                      >
                        Retornar Tecnologia 2021-2022
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={aureaSelected}
                        onClick={() =>
                          handleCompanyClick("Aurea Empresa Júnior")
                        }
                      >
                        Aurea Empresa Júnior 2019-2021
                      </Button>
                    </li>
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
                        <p>{selectedCompanyData.text}</p>
                      </div>
                      <div className="company-stack">
                        <p>{selectedCompanyData.stack}</p>
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
              <ContactForm />
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
