import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar";
import PortfolioItem from "../../components/PortfolioItem";
import useLocale from "../../hooks/useLocale";
import { getProjectTags, getProjects } from "../../data/projects";
import "./style.css";

const PROJECTS_PER_PAGE = 3;
const ALL_PROJECTS_TAG = "all";

export default function Projects() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const projects = getProjects(locale);
  const projectTags = getProjectTags(locale);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTagId, setActiveTagId] = useState(ALL_PROJECTS_TAG);
  const filteredProjects =
    activeTagId === ALL_PROJECTS_TAG
      ? projects
      : projects.filter((project) => project.tagIds.includes(activeTagId));
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const pageStart = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(
    pageStart,
    pageStart + PROJECTS_PER_PAGE,
  );

  const handleTagSelect = (tagId) => {
    setActiveTagId(tagId);
    setCurrentPage(1);
  };

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

        <section className="projects-filter" aria-label={t("projects.filtersAria")}>
          <div className="projects-filter-tags">
            {projectTags.map((tag) => (
              <button
                type="button"
                className="projects-filter-button"
                key={tag.id}
                aria-pressed={activeTagId === tag.id}
                onClick={() => handleTagSelect(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
          <p>
            {t("projects.resultsCount", { count: filteredProjects.length })}
          </p>
        </section>

        {visibleProjects.length > 0 ? (
          <section className="projects-page-list" aria-label={t("projects.listAria")}>
            {visibleProjects.map((project) => (
              <PortfolioItem
                key={project.key}
                {...project}
                onTagSelect={handleTagSelect}
              />
            ))}
          </section>
        ) : (
          <section className="projects-empty">
            <p>{t("projects.emptyByTag")}</p>
          </section>
        )}

        {totalPages > 1 && (
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
        )}
      </Container>
      <Footer />
    </>
  );
}
