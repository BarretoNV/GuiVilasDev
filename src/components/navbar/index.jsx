import { useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/GV.png";
import "./style.css";

const pageLinks = [
  { href: "/", label: "Início" },
  { href: "/projects", label: "Projetos" },
  { href: "/portfolio-audiovisual", label: "Portfólio Audiovisual" },
  { href: "/tcc", label: "TCC" },
  { href: "/funwithapis", label: "Consumo de APIs" },
  { href: "/blog", label: "Blog" },
  { href: "/astrofotografia", label: "Astrofotografia" },
];

const homeLinks = [
  { href: "/#aboutMe", label: "Sobre mim" },
  { href: "/#workHistory", label: "Experiência" },
  { href: "/#projects", label: "Destaques" },
  { href: "/#audiovisual", label: "Audiovisual" },
  { href: "/#culture", label: "Outros" },
];

const resumeLinks = [
  {
    href: "https://drive.google.com/file/d/1NcG-JwL5efz0XSZZGEkvCtosFVR4tB9E/view?usp=sharing",
    label: "Dev & Tecnologia",
  },
  {
    href: "https://drive.google.com/file/d/1G1UHlPCz28z57uGBokAww2hceBLbxxIB/view?usp=sharing",
    label: "Marketing & Conteúdo",
  },
];

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const [activeKey, setActiveKey] = useState(
    () => `${window.location.pathname}${window.location.hash}`
  );

  const isPagesDropdownActive =
    pageLinks.some((link) => activeKey === link.href) ||
    activeKey.startsWith("/blog/") ||
    activeKey.startsWith("/astrofotografia/");
  const isHomeDropdownActive = homeLinks.some((link) => activeKey === link.href);

  const toggleButton = () => {
    setIsActive((currentState) => !currentState);
  };

  const getDropdownItemClass = (href) =>
    `nav-dropdown-item ${activeKey === href ? "active" : ""}`;

  const handleBrandClick = (event) => {
    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", "/");
    setActiveKey("/");
    setIsActive(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageLinkClick = (href) => {
    setActiveKey(href);
    setIsActive(false);
  };

  const scrollToHomeTarget = useCallback((href, behavior = "smooth") => {
    const targetId = href.split("#")[1];
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (!targetElement) {
      return false;
    }

    const navbar = document.querySelector(".custom-navbar");
    const navbarHeight = navbar?.clientHeight || 0;
    const targetPosition = targetElement.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior,
    });

    return true;
  }, []);

  const handleHomeLinkClick = (event, href) => {
    if (window.location.pathname === "/" && scrollToHomeTarget(href)) {
      event.preventDefault();

      window.history.pushState(null, "", href);
      setActiveKey(href);
      setIsActive(false);

      return;
    }

    setActiveKey(href);
    setIsActive(false);
  };

  useEffect(() => {
    const syncActiveKey = () => {
      setActiveKey(`${window.location.pathname}${window.location.hash}`);
    };

    const alignInitialHash = () => {
      if (window.location.pathname !== "/" || !window.location.hash) {
        return;
      }

      window.requestAnimationFrame(() => {
        scrollToHomeTarget(`/${window.location.hash}`, "auto");
      });
    };

    alignInitialHash();

    window.addEventListener("popstate", syncActiveKey);
    window.addEventListener("hashchange", syncActiveKey);

    return () => {
      window.removeEventListener("popstate", syncActiveKey);
      window.removeEventListener("hashchange", syncActiveKey);
    };
  }, [scrollToHomeTarget]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="text-light custom-navbar"
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            className="navbar-brand-custom"
            href="/"
            onClick={handleBrandClick}
          >
            <img
              src={Logo}
              width="30"
              height="30"
              className="navbar-logo"
              alt="Logo Gui Vilas"
            />
            <span>Gui Vilas v3.0</span>
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
            <Nav className="me-auto navbar-primary-links">
              <NavDropdown
                title="Páginas"
                id="pages-nav-dropdown"
                className={`nav-dropdown-custom ${
                  isPagesDropdownActive ? "active" : ""
                }`}
              >
                {pageLinks.map((link) => (
                  <NavDropdown.Item
                    key={link.href}
                    href={link.href}
                    className={getDropdownItemClass(link.href)}
                    onClick={() => handlePageLinkClick(link.href)}
                  >
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown
                title="Home"
                id="home-nav-dropdown"
                className={`nav-dropdown-custom ${
                  isHomeDropdownActive ? "active" : ""
                }`}
              >
                {homeLinks.map((link) => (
                  <NavDropdown.Item
                    key={link.href}
                    href={link.href}
                    className={getDropdownItemClass(link.href)}
                    onClick={(event) => handleHomeLinkClick(event, link.href)}
                  >
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Nav className="navbar-section-links">
              <NavDropdown
                title="Currículo"
                id="resume-nav-dropdown"
                className="nav-dropdown-custom nav-resume-dropdown"
              >
                {resumeLinks.map((link) => (
                  <NavDropdown.Item
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="nav-dropdown-item"
                    onClick={() => setIsActive(false)}
                  >
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="navbar-page-offset" aria-hidden="true" />
    </>
  );
}

export default NavBar;
