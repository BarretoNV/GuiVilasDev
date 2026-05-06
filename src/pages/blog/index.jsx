import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import { blogPosts } from "../../data/content";
import "./style.css";

export default function Blog() {
  return (
    <>
      <NavBar />
      <Container className="content-page text-light">
        <header className="content-page-header">
          <p>Textos soltos</p>
          <h1>Blog</h1>
          <p>
            Pensamentos, revisoes, opinioes e registros sobre jogos, filmes,
            livros e qualquer ideia que mereca virar texto.
          </p>
        </header>

        {blogPosts.length === 0 ? (
          <section className="content-empty">
            <h2>Nenhum post publicado ainda</h2>
            <p>
              Quando os arquivos MDX forem adicionados em src/content/blog,
              eles aparecem aqui automaticamente.
            </p>
          </section>
        ) : (
          <section className="blog-list" aria-label="Lista de posts do blog">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                {post.coverImage && (
                  <Link to={`/blog/${post.slug}`} className="blog-card-image">
                    <CloudinaryImage
                      image={post.coverImage}
                      alt={post.coverImage.alt || post.title}
                      sizes="(max-width: 768px) 100vw, 340px"
                      width={720}
                    />
                  </Link>
                )}
                <div className="blog-card-content">
                  <div className="content-meta">
                    {post.date && (
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </time>
                    )}
                    {post.category && <span>{post.category}</span>}
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  {post.tags?.length > 0 && (
                    <ul className="tag-list" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </Container>
      <Footer />
    </>
  );
}

