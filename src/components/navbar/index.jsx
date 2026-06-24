import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/GV.png";
import {
  getLocaleFromPathname,
  getOppositeLocale,
  getPathWithoutLocale,
  localizePath,
} from "../../utils/i18nRouting";
import {
  findTranslatedAstrophotographyPost,
  findTranslatedBlogPost,
} from "../../data/content";
import "./style.css";

const resumeLinks = [
  {
    href: "https://drive.google.com/file/d/1NcG-JwL5efz0XSZZGEkvCtosFVR4tB9E/view?usp=sharing",
    labelKey: "nav.resumeLinks.tech",
  },
  {
    href: "https://drive.google.com/file/d/1G1UHlPCz28z57uGBokAww2hceBLbxxIB/view?usp=sharing",
    labelKey: "nav.resumeLinks.marketing",
  },
];

function NavBar() {
  const location = useLocation();
  const { t } = useTranslation("common");
  const locale = getLocaleFromPathname(location.pathname);
  const oppositeLocale = getOppositeLocale(locale);
  const currentPathWithoutLocale = getPathWithoutLocale(location.pathname);
  const [isActive, setIsActive] = useState(false);
  const [activeKey, setActiveKey] = useState(
    () => `${getPathWithoutLocale(window.location.pathname)}${window.location.hash}`,
  );

  const pageLinks = [
    { href: "/", label: t("nav.links.home") },
    { href: "/tcc", label: t("nav.links.tcc") },
    { href: "/funwithapis", label: t("nav.links.apis") },
    { href: "/blog", label: t("nav.links.blog") },
    { href: "/astrofotografia", label: t("nav.links.astrophotography") },
  ];

  const featuredLinks = [
    { href: "/projects", label: t("nav.links.projects") },
    { href: "/portfolio-audiovisual", label: t("nav.links.audiovisual") },
  ];

  const homeLinks = [
    { href: "/#aboutMe", label: t("nav.links.about") },
    { href: "/#workHistory", label: t("nav.links.experience") },
    { href: "/#projects", label: t("nav.links.featured") },
    { href: "/#audiovisual", label: t("nav.links.audiovisual") },
    { href: "/#culture", label: t("nav.links.others") },
  ];

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
    if (getPathWithoutLocale(window.location.pathname) !== "/") {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", localizePath("/", locale));
    setActiveKey("/");
    setIsActive(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageLinkClick = (href) => {
    setActiveKey(getPathWithoutLocale(href));
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
    if (getPathWithoutLocale(window.location.pathname) === "/" && scrollToHomeTarget(href)) {
      event.preventDefault();

      window.history.pushState(null, "", localizePath(href, locale));
      setActiveKey(href);
      setIsActive(false);

      return;
    }

    setActiveKey(href);
    setIsActive(false);
  };

  const getLanguageSwitchPath = () => {
    const slugMatch = currentPathWithoutLocale.match(/^\/(blog|astrofotografia)\/(.+)$/);

    if (slugMatch) {
      const [, collection, slug] = slugMatch;
      const translatedPost =
        collection === "blog"
          ? findTranslatedBlogPost(slug, locale, oppositeLocale)
          : findTranslatedAstrophotographyPost(slug, locale, oppositeLocale);

      if (translatedPost) {
        return localizePath(`/${collection}/${translatedPost.slug}${location.hash}`, oppositeLocale);
      }

      return localizePath(`/${collection}`, oppositeLocale);
    }

    return localizePath(
      `${currentPathWithoutLocale}${location.search}${location.hash}`,
      oppositeLocale,
    );
  };

  useEffect(() => {
    const syncActiveKey = () => {
      setActiveKey(`${getPathWithoutLocale(window.location.pathname)}${window.location.hash}`);
    };

    const alignInitialHash = () => {
      if (getPathWithoutLocale(window.location.pathname) !== "/" || !window.location.hash) {
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

  useEffect(() => {
    setActiveKey(`${currentPathWithoutLocale}${location.hash}`);
  }, [currentPathWithoutLocale, location.hash]);

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
            href={localizePath("/", locale)}
            onClick={handleBrandClick}
          >
            <img
              src={Logo}
              width="30"
              height="30"
              className="navbar-logo"
              alt="Logo Gui Vilas"
            />
            <span>{t("nav.brand")}</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-label={t("nav.toggle")}
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
                title={t("nav.pages")}
                id="pages-nav-dropdown"
                className={`nav-dropdown-custom ${
                  isPagesDropdownActive ? "active" : ""
                }`}
              >
                {pageLinks.map((link) => (
                  <NavDropdown.Item
                    key={link.href}
                    href={localizePath(link.href, locale)}
                    className={getDropdownItemClass(link.href)}
                    onClick={() => handlePageLinkClick(link.href)}
                  >
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <NavDropdown
                title={t("nav.home")}
                id="home-nav-dropdown"
                className={`nav-dropdown-custom ${
                  isHomeDropdownActive ? "active" : ""
                }`}
              >
                {homeLinks.map((link) => (
                  <NavDropdown.Item
                    key={link.href}
                    href={localizePath(link.href, locale)}
                    className={getDropdownItemClass(link.href)}
                    onClick={(event) => handleHomeLinkClick(event, link.href)}
                  >
                    {link.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Nav className="navbar-section-links">
              <div className="navbar-featured-links">
                {featuredLinks.map((link) => (
                  <Nav.Link
                    key={link.href}
                    href={localizePath(link.href, locale)}
                    className={`nav-featured-link ${
                      activeKey === link.href ? "active" : ""
                    }`}
                    onClick={() => handlePageLinkClick(link.href)}
                  >
                    {link.label}
                  </Nav.Link>
                ))}
              </div>
              <NavDropdown
                title={t("nav.resume")}
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
                    {t(link.labelKey)}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link
                href={getLanguageSwitchPath()}
                className="nav-featured-link"
                aria-label={t("language.switchTo", {
                  language: t(oppositeLocale === "en" ? "language.en" : "language.pt"),
                })}
                onClick={() => setIsActive(false)}
              >
                {oppositeLocale === "en" ? "EN" : "PT"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="navbar-page-offset" aria-hidden="true" />
    </>
  );
}

export default NavBar;
