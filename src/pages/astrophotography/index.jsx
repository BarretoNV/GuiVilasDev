import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import { astrophotographyPosts } from "../../data/content";
import "./style.css";

export default function Astrophotography() {
  return (
    <>
      <NavBar />
      <Container className="content-page text-light">
        <header className="content-page-header">
          <p>Ceu profundo e registros do quintal</p>
          <h1>Astrofotografia</h1>
          <p>
            Uma galeria para fotos do ceu, com contexto astronomico, detalhes da
            captura, equipamento usado e um pouco do processo por tras de cada
            imagem.
          </p>
        </header>

        {astrophotographyPosts.length === 0 ? (
          <section className="content-empty">
            <h2>Nenhuma foto publicada ainda</h2>
            <p>
              Quando os arquivos MDX forem adicionados em
              src/content/astrofotografia, eles aparecem aqui automaticamente.
            </p>
          </section>
        ) : (
          <section className="astro-grid" aria-label="Galeria de astrofotografia">
            {astrophotographyPosts.map((post) => (
              <article className="astro-card" key={post.slug}>
                <Link to={`/astrofotografia/${post.slug}`}>
                  <CloudinaryImage
                    image={post.image}
                    alt={post.image?.alt || post.title}
                    sizes="(max-width: 768px) 100vw, 420px"
                    width={840}
                    className="astro-card-image"
                  />
                </Link>
                <div className="astro-card-content">
                  <div className="content-meta">
                    {post.date && (
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </time>
                    )}
                    {post.constellation && <span>{post.constellation}</span>}
                  </div>
                  <h2>
                    <Link to={`/astrofotografia/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.target && <p className="astro-target">{post.target}</p>}
                  {post.excerpt && <p>{post.excerpt}</p>}
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

