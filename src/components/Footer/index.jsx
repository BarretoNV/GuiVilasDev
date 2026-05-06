import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./style.css";

export default function Footer() {
  const [userData, setUserData] = useState({});
  const [repoData, setRepoData] = useState({});
  const username = "BarretoNV";
  const repoName = "GuiVilasDev";
  const apiKey = import.meta.env.VITE_GITHUB_KEY;

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: apiKey ? `Bearer ${apiKey}` : "",
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do GitHub:", error);
      });
  }, [apiKey]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${username}/${repoName}`, {
        headers: {
          Authorization: apiKey ? `Bearer ${apiKey}` : "",
        },
      })
      .then((response) => {
        setRepoData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do repositório:", error);
      });
  }, [apiKey]);

  return (
    <footer className="footer text-light">
      <Container>
        <Row className="footer-content">
          <Col md={6}>
            <h3>Meu Perfil do GitHub</h3>
            <p>{userData.name}</p>
            <p>Repositórios públicos: {userData.public_repos}</p>
            <p>Seguidores: {userData.followers}</p>
            <Button
              href="https://github.com/BarretoNV"
              target="_blank"
              rel="noreferrer"
              variant="outline-primary"
              className="mb-2"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </Button>
          </Col>
          <Col md={6}>
            <h3>Desenvolvido com React + Vite</h3>
            <p>Repositório: {repoData.name}</p>
            <p>Stars: {repoData.stargazers_count}</p>
            <Button
              href={repoData.html_url}
              target="_blank"
              rel="noreferrer"
              variant="outline-primary"
              className="mb-2"
            >
              <FontAwesomeIcon icon={faGithub} /> Ver código fonte
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
