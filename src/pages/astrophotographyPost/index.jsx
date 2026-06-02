import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import ShareButton from "../../components/ShareButton";
import { getAstrophotographyPostBySlug } from "../../data/content";
import "./style.css";

const details = [
  ["Objeto", "target"],
  ["Constelacao", "constellation"],
  ["Local aproximado", "locationLabel"],
  ["Camera", "camera"],
  ["Lente/Telescopio", "lensOrTelescope"],
  ["Exposicao", "exposure"],
  ["ISO", "iso"],
  ["Abertura", "aperture"],
  ["Stacking", "stacking"],
  ["Processamento", "processing"],
];

const getPostImages = (post) => {
  if (Array.isArray(post.images) && post.images.length > 0) {
    return post.images;
  }

  return post.image ? [post.image] : [];
};

export default function AstrophotographyPost() {
  const { slug } = useParams();
  const post = getAstrophotographyPostBySlug(slug);

  if (!post) {
    return (
      <>
        <NavBar />
        <Container className="content-page text-light">
          <section className="content-empty">
            <h1>Foto nao encontrada</h1>
            <p>Esse registro nao existe ou ainda nao foi publicado.</p>
            <Link to="/astrofotografia">Voltar para astrofotografia</Link>
          </section>
        </Container>
        <Footer />
      </>
    );
  }

  const Content = post.Content;
  const visibleDetails = details.filter(([, key]) => post[key]);
  const images = getPostImages(post);
  const [featuredImage, ...supportingImages] = images;

  return (
    <>
      <NavBar />
      <Container className="astro-detail-page text-light">
        <div className="post-page-actions">
          <Link to="/astrofotografia" className="post-back-link">
            Voltar para astrofotografia
          </Link>
          <ShareButton
            title={post.title}
            text={post.excerpt || "Confira este registro no GuiVilas Dev."}
            path={`/astrofotografia/${post.slug}`}
            imagePath={`/social/astrofotografia/${post.slug}-square.png`}
          />
        </div>
        <article className="astro-detail">
          <header className="post-header">
            <div className="content-meta">
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </time>
              )}
              {post.constellation && <span>{post.constellation}</span>}
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
          </header>

          {featuredImage && (
            <figure className="astro-featured-figure">
              <CloudinaryImage
                image={featuredImage}
                alt={featuredImage.alt || post.title}
                className="astro-detail-image"
                sizes="(max-width: 992px) 100vw, 1100px"
                width={1440}
                loading="eager"
              />
              {featuredImage.caption && (
                <figcaption>{featuredImage.caption}</figcaption>
              )}
            </figure>
          )}

          {supportingImages.length > 0 && (
            <section className="astro-image-gallery" aria-label="Imagens complementares">
              {supportingImages.map((image, index) => (
                <figure className="astro-gallery-item" key={image.publicId || image.url || index}>
                  <CloudinaryImage
                    image={image}
                    alt={image.alt || `${post.title} - imagem ${index + 2}`}
                    className="astro-gallery-image"
                    sizes="(max-width: 992px) 100vw, 540px"
                    width={900}
                  />
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </section>
          )}

          {visibleDetails.length > 0 && (
            <dl className="astro-details-list">
              {visibleDetails.map(([label, key]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{post[key]}</dd>
                </div>
              ))}
            </dl>
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
