import NavBar from "../../components/navbar";
import { Container, Col, Row, Button } from "react-bootstrap";
import ProfilePic from "../../assets/profilePic.png";

export default function Home() {
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
        <Row id="aboutMe" className="mt-5 mb-5">
          <Col md={6} sm={12}>
            <div className="text-light">
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
          <Col md={6} sm={12} className="text-center text-light">
            <img src={ProfilePic} style={{ maxWidth: "80%" }} alt="MyPic" />
            <h3>Eu em preto e branco</h3>
          </Col>
        </Row>
        <Row id="workHistory" className="mt-5 mb-5">
          <Col>
            <div className="text-light">
              <h2>02. Onde Trabalhei</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
