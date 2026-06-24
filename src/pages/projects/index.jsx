import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar";
import PortfolioItem from "../../components/PortfolioItem";
import useLocale from "../../hooks/useLocale";
import { getProjects } from "../../data/projects";
import "./style.css";

const PROJECTS_PER_PAGE = 3;

export default function Projects() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const projects = getProjects(locale);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const pageStart = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(
    pageStart,
    pageStart + PROJECTS_PER_PAGE,
  );

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <>
      <NavBar />
      <Container className="projects-page text-light">
        <header className="projects-page-header">
          <p>{t("projects.kicker")}</p>
          <h1>{t("projects.title")}</h1>
          <p>{t("projects.description")}</p>
        </header>

        <section className="projects-page-list" aria-label={t("projects.listAria")}>
          {visibleProjects.map((project) => (
            <PortfolioItem key={project.key} {...project} />
          ))}
        </section>

        <nav className="projects-pagination" aria-label={t("projects.paginationAria")}>
          <Button
            type="button"
            variant="outline-light"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {t("projects.previous")}
          </Button>
          <span>
            {t("projects.pageOf", { current: currentPage, total: totalPages })}
          </span>
          <Button
            type="button"
            variant="outline-light"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            {t("projects.next")}
          </Button>
        </nav>
      </Container>
      <Footer />
    </>
  );
}
