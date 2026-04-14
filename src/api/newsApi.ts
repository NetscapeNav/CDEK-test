import type { NewsResponse } from "../types/news.ts";

const BASE_URL = 'http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/';

const cache = new Map<string, NewsResponse>();

export const fetchNews = async (
    page: number,
    perPage: number = 3,
    mode: 'short' | 'empty' = 'short'
) => {
    const url = `${BASE_URL}/${mode}?perPage=${perPage}&page=${page}`;
    if (cache.has(url)) {
        return cache.get(url);
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке новостей');
    }
    const data = await response.json();
    cache.set(url, data);
    return data;

}