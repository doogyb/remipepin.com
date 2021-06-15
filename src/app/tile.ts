
export interface Thumbnail {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: any;
    url: string;
}

export interface Large {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: any;
    url: string;
}

export interface Medium {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: any;
    url: string;
}

export interface Small {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: any;
    url: string;
}

export interface Formats {
    thumbnail: Thumbnail;
    large: Large;
    medium: Medium;
    small: Small;
}

export interface Cover {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    created_at: Date;
    updated_at: Date;
}

export interface Thumbnail2 {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: any;
    url: string;
}

export interface Formats2 {
    thumbnail: Thumbnail2;
}

export interface Square {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: Formats2;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    created_at: Date;
    updated_at: Date;
}

export interface Tile {
    id: string;
    position: number;
    title: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    cover: Cover;
    square: Square;
}

