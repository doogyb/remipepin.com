export type TileItem = {
  id: number | string;
  attributes: {
    publisher?: string;
    left?: { data?: { id: number | string } | null };
    square?: { data?: { attributes?: { url?: string } } };
    cover?: { data?: { attributes?: { url?: string } } };
  };
};

export type Article = {
  id: number;
  content: string;
  blurb: string;
  title: string;
  slug: string;
  hero: string;
  caption?: string;
  main?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};
