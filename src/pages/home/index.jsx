import { useState } from "react";
import NavBar from "../../components/navbar";
import { Container, Col, Row, Button } from "react-bootstrap";
import ProfilePic from "../../assets/profilePic.png";
import aureaLogo from "../../assets/aurea.jpg";
import vettaLogo from "../../assets/vetta.jpg";
import retornarLogo from "../../assets/retornar.jpg";
import ficharioLogo from "../../assets/fichario.svg";

import "./style.css";

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState("Fichar.io");
  const [ficharioSelected, setFicharioSelected] = useState('light');
  const [vettaSelected, setVettaSelected] = useState('outline-light');
  const [retornarSelected, setRetornarSelected] = useState('outline-light');
  const [aureaSelected, setAureaSelected] = useState('outline-light');

  const companyColors = {
    'Fichar.io': { fichario: 'light', vetta: 'outline-light', retornar: 'outline-light', aurea: 'outline-light' },
    'Vetta.Digital': { fichario: 'outline-light', vetta: 'light', retornar: 'outline-light', aurea: 'outline-light' },
    'Retornar Tecnologia': { fichario: 'outline-light', vetta: 'outline-light', retornar: 'light', aurea: 'outline-light' },
    'Aurea Empresa Júnior': { fichario: 'outline-light', vetta: 'outline-light', retornar: 'outline-light', aurea: 'light' },
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

  return (
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
              <h2>Desenvolvedor React | Designer</h2>
              <p>
                Desenvolvedor Front-End, com foco em React.js, com formação em
                design e atualmente cursando Engenharia de Computação no
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
          <Col md={6} sm={12}>
            <div>
              <h2>01. Sobre mim</h2>
              <p>
                Desde pequeno eu já brincava com programas de edição de imagem,
                e depois me vi viciado em edição de vídeos. Atualmente trabalho
                com Desenvolvimento Web e Desenvolvimento Front-End, com
                bastante experiência com HTML5, CSS e Javascript puros, mas
                principalmente em REACT.JS.
              </p>{" "}
              <p>
                {" "}
                Sempre tive facilidade com pessoas, talvez esse seja o motivo
                pelo qual sempre fui representante de turma em todas as minhas
                turmas, e dentro da faculdade, me tornei Coordenador dentro da
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
                desenvolvimento em React.js, onde estou responsável pelas
                tarefas no front-end, como design de telas, funcionalidades
                variadas, integrações em APIs e etc.
              </p>
              <p>
                Aqui estão algumas das tecnologias que tenho trabalhado
                recentemente:
              </p>
              <Row>
                <Col col={6}>
                  <li>Javascript</li>
                  <li>Node.js</li>
                  <li>React.js</li>
                </Col>
                <Col col={6}>
                  <li>C</li>
                  <li>WordPress</li>
                  <li>HTML e CSS</li>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={6} sm={12} className="text-center">
            <img src={ProfilePic} style={{ maxWidth: "80%" }} alt="MyPic" />
            <h3>Eu em preto e branco</h3>
          </Col>
        </Row>
        <Row id="workHistory" className="mt-5 mb-5 text-light">
          <Col md={12}>
            <h2>02. Onde Trabalhei</h2>
          </Col>
          <Row>
            <Col
              md={4}
              className="d-grid gap-5 mb-4"
              style={{ height: "50vh" }}
            >
              <Button
                variant={ficharioSelected}
                onClick={() => handleCompanyClick("Fichar.io")}
              >
                Fichar.io
              </Button>
              <Button
                variant={vettaSelected}
                onClick={() => handleCompanyClick("Vetta.Digital")}
              >
                Vetta.Digital
              </Button>
              <Button
                variant={retornarSelected}
                onClick={() => handleCompanyClick("Retornar Tecnologia")}
              >
                Retornar Tecnologia
              </Button>
              <Button
                variant={aureaSelected}
                onClick={() => handleCompanyClick("Aurea Empresa Júnior")}
              >
                Aurea Empresa Júnior
              </Button>
            </Col>
            <Col md={8}>
              {selectedCompany && (
                <>
                  <Row>
                    <Col md={3}>
                      <img
                        style={{ width: "100%", height: "auto" }}
                        src={
                          companies.find((opt) => opt.value === selectedCompany)
                            .logo
                        }
                      />
                    </Col>
                    <Col md={8}>
                      <div>
                        <h3>{selectedCompany}</h3>
                        <p>
                          {
                            companies.find(
                              (opt) => opt.value === selectedCompany
                            ).text
                          }
                        </p>
                      </div>
                      <div>
                        <p>
                          {
                            companies.find(
                              (opt) => opt.value === selectedCompany
                            ).stack
                          }
                        </p>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Row>
        <Row id="projects" className="mt-5 mb-5 text-light">
          <Col md={12}>
            <h2>03. Alguns projetos que fiz</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
