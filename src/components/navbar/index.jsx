import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/GV.png";
import "./style.css";

function NavBar() {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Encontrar a altura da navbar
    const navbar = document.querySelector(".custom-navbar");
    const navbarHeight = navbar.clientHeight;

    // Encontrar todos os links da navbar que levam a elementos com IDs
    const links = document.querySelectorAll(".nav-link[href^='#']");

    // Adicionar um evento de clique a cada link
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Calcular a posição do elemento de destino com base na altura da navbar
          const targetPosition = targetElement.offsetTop - navbarHeight;

          // Rolagem suave para o elemento de destino
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="text-light custom-navbar"
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="text-light" href="#home">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toggler"
        >
          <div
            className={`toggle-button ${isActive ? "is-active" : ""}`}
            onClick={toggleButton}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>{" "}
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-light">
              Gui Vilas v2.0
            </Nav.Link>
            <Nav.Link href="/funwithapis" className="text-light">
              Consumo de API's
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#aboutMe" className="text-light">
              01. Sobre mim
            </Nav.Link>
            <Nav.Link href="#workHistory" className="text-light">
              02. Experiência
            </Nav.Link>
            <Nav.Link href="#projects" className="text-light">
              03. Projetos
            </Nav.Link>
            <Nav.Link href="#contact" className="text-light">
              04. Contato
            </Nav.Link>
            <Button
              type="button"
              variant="dark"
              href="https://drive.google.com/file/d/1aAYxwLNBzo6xNNkPv5YcuX6Z8TbmkOMK/view?usp=sharing"
              target="_blank"
            >
              Currículo
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
