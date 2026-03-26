import type { Article } from '../types';

export const getArticles = async (): Promise<Article[]> => {
  const includeDrafts = true
  const url = includeDrafts
    ? 'https://www.remipepin.com/cms/api/articles?populate[0]=hero.image&publicationState=preview'
    : 'https://www.remipepin.com/cms/api/articles?populate[0]=hero.image'
  
  const response = await fetch(url);
  const data = await response.json();

  const articles = data.data.map((article: any) => processArticle(article)).filter((article: Article | null) => article !== null);

  return articles;
};

const processArticle = (article: any): Article | null => {
  try {
    return {
      id: article.id,
      ...article.attributes,
      caption: article.attributes.hero.caption,
      hero: `https://www.remipepin.com/cms/${article.attributes.hero.image.data.attributes.url}`,
    };
  } catch (error) {
    console.log("Error processing article");
    return null;
  }
};
