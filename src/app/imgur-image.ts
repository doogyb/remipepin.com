export interface ImgurImage {
  datetime: number,
  description: string,
  height: number,
  coverLink: string,
  squareLink: string,
  size: number,
  tags: string[],
  title?: string,
  type: string,
  width: number,
  hoverable?: boolean,
  front: boolean;
  side: string;
  id?: string;
}
