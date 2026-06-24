import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import useLocale from "../../hooks/useLocale";
import { getLocaleDate, localizePath } from "../../utils/i18nRouting";
import { getAstrophotographyPosts } from "../../data/content";
import "./style.css";

const getCardImage = (post) => post.images?.[0] || post.image;

export default function Astrophotography() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const astrophotographyPosts = getAstrophotographyPosts(locale);

  return (
    <>
      <NavBar />
      <Container className="content-page text-light">
        <header className="content-page-header">
          <p>{t("astrophotography.kicker")}</p>
          <h1>{t("astrophotography.title")}</h1>
          <p>{t("astrophotography.description")}</p>
        </header>

        {astrophotographyPosts.length === 0 ? (
          <section className="content-empty">
            <h2>{t("astrophotography.emptyTitle")}</h2>
            <p>{t("astrophotography.emptyDescription")}</p>
          </section>
        ) : (
          <section className="astro-grid" aria-label={t("astrophotography.listAria")}>
            {astrophotographyPosts.map((post) => {
              const cardImage = getCardImage(post);

              return (
                <article className="astro-card" key={post.slug}>
                  {cardImage && (
                    <Link to={localizePath(`/astrofotografia/${post.slug}`, locale)}>
                      <CloudinaryImage
                        image={cardImage}
                        alt={cardImage.alt || post.title}
                        sizes="(max-width: 768px) 100vw, 420px"
                        width={840}
                        className="astro-card-image"
                      />
                    </Link>
                  )}
                  <div className="astro-card-content">
                    <div className="content-meta">
                      {post.date && (
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(getLocaleDate(locale))}
                        </time>
                      )}
                      {post.constellation && <span>{post.constellation}</span>}
                    </div>
                    <h2>
                      <Link to={localizePath(`/astrofotografia/${post.slug}`, locale)}>
                        {post.title}
                      </Link>
                    </h2>
                    {post.target && <p className="astro-target">{post.target}</p>}
                    {post.excerpt && <p>{post.excerpt}</p>}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </Container>
      <Footer />
    </>
  );
}
