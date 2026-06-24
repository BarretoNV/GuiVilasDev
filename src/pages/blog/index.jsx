import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import CloudinaryImage from "../../components/CloudinaryImage";
import useLocale from "../../hooks/useLocale";
import { getLocaleDate, localizePath } from "../../utils/i18nRouting";
import { getBlogPosts } from "../../data/content";
import "./style.css";

export default function Blog() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const blogPosts = getBlogPosts(locale);

  return (
    <>
      <NavBar />
      <Container className="content-page text-light">
        <header className="content-page-header">
          <p>{t("blog.kicker")}</p>
          <h1>{t("blog.title")}</h1>
          <p>{t("blog.description")}</p>
        </header>

        {blogPosts.length === 0 ? (
          <section className="content-empty">
            <h2>{t("blog.emptyTitle")}</h2>
            <p>{t("blog.emptyDescription")}</p>
          </section>
        ) : (
          <section className="blog-list" aria-label={t("blog.listAria")}>
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                {post.coverImage && (
                  <Link
                    to={localizePath(`/blog/${post.slug}`, locale)}
                    className="blog-card-image"
                  >
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
                        {new Date(post.date).toLocaleDateString(getLocaleDate(locale))}
                      </time>
                    )}
                    {post.category && <span>{post.category}</span>}
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>
                  <h2>
                    <Link to={localizePath(`/blog/${post.slug}`, locale)}>
                      {post.title}
                    </Link>
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
