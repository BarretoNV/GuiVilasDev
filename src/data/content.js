const blogModules = import.meta.glob("../content/blog/*/*.mdx", { eager: true });
const astroModules = import.meta.glob("../content/astrofotografia/*/*.mdx", {
  eager: true,
});

const getSlugFromPath = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.mdx$/, "");

const getLocaleFromPath = (path) => {
  const segments = path.split("/");
  const fileName = segments.pop();
  const locale = segments.pop();

  return fileName && locale === "en" ? "en" : "pt-BR";
};

const normalizeEntry = ([path, module], collection) => {
  const metadata = module.metadata || {};
  const slug = metadata.slug || getSlugFromPath(path);
  const locale = metadata.lang || getLocaleFromPath(path);

  return {
    ...metadata,
    collection,
    locale,
    lang: locale,
    translationKey: metadata.translationKey || slug,
    slug,
    Content: module.default,
  };
};

const byNewestDate = (a, b) => new Date(b.date) - new Date(a.date);

const loadCollection = (modules, collection) =>
  Object.entries(modules)
    .map((entry) => normalizeEntry(entry, collection))
    .filter((entry) => !entry.draft && !entry.template)
    .sort(byNewestDate);

export const blogPosts = loadCollection(blogModules, "blog");
export const astrophotographyPosts = loadCollection(
  astroModules,
  "astrofotografia",
);

export const getBlogPosts = (locale = "pt-BR") =>
  blogPosts.filter((post) => post.lang === locale);

export const getAstrophotographyPosts = (locale = "pt-BR") =>
  astrophotographyPosts.filter((post) => post.lang === locale);

export const getBlogPostBySlug = (slug, locale = "pt-BR") =>
  getBlogPosts(locale).find((post) => post.slug === slug);

export const getAstrophotographyPostBySlug = (slug, locale = "pt-BR") =>
  getAstrophotographyPosts(locale).find((post) => post.slug === slug);

const findTranslatedPost = (posts, slug, fromLocale, toLocale) => {
  const sourcePost = posts.find(
    (post) => post.slug === slug && post.lang === fromLocale,
  );

  if (!sourcePost) {
    return null;
  }

  return (
    posts.find(
      (post) =>
        post.lang === toLocale &&
        post.translationKey === sourcePost.translationKey,
    ) || null
  );
};

export const findTranslatedBlogPost = (slug, fromLocale, toLocale) =>
  findTranslatedPost(blogPosts, slug, fromLocale, toLocale);

export const findTranslatedAstrophotographyPost = (slug, fromLocale, toLocale) =>
  findTranslatedPost(astrophotographyPosts, slug, fromLocale, toLocale);
