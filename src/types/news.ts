export interface NewsImage {
    s: string;
    m: string;
    l: string;
    hd: string;
}

export interface NewsCover {
    type: string;
    images: NewsImage[];
}

export interface NewsRubric {
    id: number;
    slug: string;
    name: string;
}

export interface NewsItem {
    id: string;
    title: string;
    cover: NewsCover;
    likeCount: number;
    viewCount: number;
    publishedAt: string;
    rubrics: NewsRubric[];
}

export interface NewsResponse {
    totalPages: number;
    perPage: number;
    news: NewsItem[];
    minDatePublication: string;
}

