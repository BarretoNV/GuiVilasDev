import { useState } from "react";
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

  return (
    <Navbar collapseOnSelect expand="lg" className="text-light">
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
            <Nav.Link href="/" className="text-light">
              Diversão com APIs
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
            <Button type="button" variant="dark">
              Currículo
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
