const blogModules = import.meta.glob("../content/blog/*.mdx", { eager: true });
const astroModules = import.meta.glob("../content/astrofotografia/*.mdx", {
  eager: true,
});

const getSlugFromPath = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.mdx$/, "");

const normalizeEntry = ([path, module], collection) => {
  const metadata = module.metadata || {};
  const slug = metadata.slug || getSlugFromPath(path);

  return {
    ...metadata,
    collection,
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

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export const getAstrophotographyPostBySlug = (slug) =>
  astrophotographyPosts.find((post) => post.slug === slug);

