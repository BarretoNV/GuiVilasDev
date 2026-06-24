export const isValidNYTArticle = (article) =>
  article?.item_type === "Article" &&
  Boolean(article.title?.trim()) &&
  Boolean(article.uri?.trim()) &&
  Boolean(article.url?.trim()) &&
  article.url !== "null";

export const getValidNYTArticles = (results) =>
  Array.isArray(results) ? results.filter(isValidNYTArticle) : [];
