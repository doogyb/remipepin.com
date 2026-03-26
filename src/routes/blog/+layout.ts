import { getArticles } from "../../lib/blog/articles";
import { error } from "@sveltejs/kit";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const load = async ({ params }: { params: { slug?: string } }) => {
  const slug = params?.slug;
  const articles = await getArticles();
  const currentArticle =
    articles.find((article: { slug: string }) => article.slug === slug) ?? articles[0];
  
  if (!currentArticle) {
    throw error(404, 'Article not found');
  }
  
  return { articles, currentArticle };
};
