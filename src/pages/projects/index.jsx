import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar";
import PortfolioItem from "../../components/PortfolioItem";
import projects from "../../data/projects";
import "./style.css";

const PROJECTS_PER_PAGE = 3;

export default function Projects() {
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
          <p>Portfólio</p>
          <h1>Projetos</h1>
          <p>
            Uma seleção completa de sites, automações, integrações e cases
            profissionais que conectam tecnologia, operação e comunicação.
          </p>
        </header>

        <section className="projects-page-list" aria-label="Lista de projetos">
          {visibleProjects.map((project) => (
            <PortfolioItem key={project.title} {...project} />
          ))}
        </section>

        <nav className="projects-pagination" aria-label="Paginação de projetos">
          <Button
            type="button"
            variant="outline-light"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            type="button"
            variant="outline-light"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </nav>
      </Container>
      <Footer />
    </>
  );
}
