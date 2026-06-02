import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import ShareButton from "../../components/ShareButton";
import { getBlogPostBySlug } from "../../data/content";
import "./style.css";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <>
        <NavBar />
        <Container className="content-page text-light">
          <section className="content-empty">
            <h1>Post nao encontrado</h1>
            <p>Esse texto nao existe ou ainda nao foi publicado.</p>
            <Link to="/blog">Voltar para o blog</Link>
          </section>
        </Container>
        <Footer />
      </>
    );
  }

  const Content = post.Content;

  return (
    <>
      <NavBar />
      <Container className="post-page text-light">
        <div className="post-page-actions">
          <Link to="/blog" className="post-back-link">
            Voltar para o blog
          </Link>
          <ShareButton
            title={post.title}
            text={post.excerpt || "Confira este post no GuiVilas Dev."}
            path={`/blog/${post.slug}`}
            imagePath={`/social/blog/${post.slug}.png`}
          />
        </div>
        <article className="post-article">
          <header className="post-header">
            <div className="content-meta">
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </time>
              )}
              {post.category && <span>{post.category}</span>}
              {post.readingTime && <span>{post.readingTime}</span>}
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
          </header>

          {post.coverImage && (
            <CloudinaryImage
              image={post.coverImage}
              alt={post.coverImage.alt || post.title}
              className="post-cover"
              sizes="(max-width: 992px) 100vw, 960px"
              width={1200}
              loading="eager"
            />
          )}

          {post.tags?.length > 0 && (
            <ul className="tag-list" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div className="post-body">
            <Content />
          </div>
        </article>
      </Container>
      <Footer />
    </>
  );
}
