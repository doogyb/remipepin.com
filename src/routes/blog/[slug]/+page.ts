import { getArticles } from '../../../lib/blog/articles';

export const entries = async () => {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
};
