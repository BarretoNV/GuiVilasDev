import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/GV.png";
import "./style.css";

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const [activeKey, setActiveKey] = useState(
    () => `${window.location.pathname}${window.location.hash}`
  );

  const toggleButton = () => {
    setIsActive((currentState) => !currentState);
  };

  const getNavLinkClass = (href) =>
    `nav-link-custom ${activeKey === href ? "active" : ""}`;

  useEffect(() => {
    const navbar = document.querySelector(".custom-navbar");
    const links = document.querySelectorAll(".nav-link-custom[href*='#']");

    const syncActiveKey = () => {
      setActiveKey(`${window.location.pathname}${window.location.hash}`);
    };

    const scrollToSection = (event) => {
      const link = event.currentTarget;
      const href = link.getAttribute("href");
      const targetId = href?.split("#")[1];
      const targetElement = targetId ? document.getElementById(targetId) : null;

      if (targetElement && window.location.pathname === "/") {
        event.preventDefault();
        const navbarHeight = navbar?.clientHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.history.pushState(null, "", `/#${targetId}`);
        setActiveKey(`/#${targetId}`);
        setIsActive(false);

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", scrollToSection);
    });
    window.addEventListener("popstate", syncActiveKey);
    window.addEventListener("hashchange", syncActiveKey);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", scrollToSection);
      });
      window.removeEventListener("popstate", syncActiveKey);
      window.removeEventListener("hashchange", syncActiveKey);
    };
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="text-light custom-navbar"
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="navbar-brand-custom" href="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="navbar-logo"
            alt="Logo Gui Vilas"
          />
          <span>Gui Vilas v2.0</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          aria-label="Alternar menu de navegação"
          className="custom-toggler"
          onClick={toggleButton}
        >
          <div className={`toggle-button ${isActive ? "is-active" : ""}`}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto navbar-primary-links"
            onSelect={() => setIsActive(false)}
          >
            <Nav.Link
              href="/"
              className={getNavLinkClass("/")}
              onClick={() => setActiveKey("/")}
            >
              Início
            </Nav.Link>
            <Nav.Link
              href="/funwithapis"
              className={getNavLinkClass("/funwithapis")}
              onClick={() => setActiveKey("/funwithapis")}
            >
              Consumo de APIs
            </Nav.Link>
          </Nav>

          <Nav
            className="navbar-section-links"
            onSelect={() => setIsActive(false)}
          >
            <Nav.Link href="/#aboutMe" className={getNavLinkClass("/#aboutMe")}>
              01. Sobre mim
            </Nav.Link>
            <Nav.Link
              href="/#workHistory"
              className={getNavLinkClass("/#workHistory")}
            >
              02. Experiência
            </Nav.Link>
            <Nav.Link href="/#projects" className={getNavLinkClass("/#projects")}>
              03. Projetos
            </Nav.Link>
            <Nav.Link href="/#contact" className={getNavLinkClass("/#contact")}>
              04. Contato
            </Nav.Link>
            <Button
              type="button"
              variant="outline-light"
              className="nav-resume-button"
              href="https://drive.google.com/file/d/1VZI6sMqri527RFEdTOKwwMOeT1l3O2V5/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
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
