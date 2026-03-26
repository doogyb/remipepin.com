import type { Article } from '../../types';

export const getArticles = async (): Promise<Article[]> => {
  const includeDrafts = true;
  const url = includeDrafts
    ? 'https://www.remipepin.com/cms/api/articles?populate[0]=hero.image&publicationState=preview'
    : 'https://www.remipepin.com/cms/api/articles?populate[0]=hero.image';

  const response = await fetch(url);
  const data = (await response.json()) as { data?: unknown[] };

  return (data.data ?? [])
    .map((article) => processArticle(article))
    .filter((article): article is Article => article !== null);
};

const processArticle = (raw: unknown): Article | null => {
  try {
    const article = raw as any;
    return {
      id: article.id,
      ...article.attributes,
      caption: article.attributes.hero.caption,
      hero: `https://www.remipepin.com/cms/${article.attributes.hero.image.data.attributes.url}`
    };
  } catch {
    return null;
  }
};
