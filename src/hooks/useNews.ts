import {useEffect, useState} from "react";
import type { NewsResponse } from "../types/news";
import { fetchNews } from "../api/newsApi.ts";

export const useNews = (page: number, perPage: number, mode: 'short' | 'empty') => {
    const [data, setData] = useState<NewsResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadNews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const responseData = await fetchNews(page, perPage, mode);
                if (isMounted) {
                    setData(responseData);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error instanceof Error ? error.message : 'Ошибка при загрузке новостей');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadNews();

        return () => {
            isMounted = false;
        }
    }, [page, perPage, mode]);

    return {data , isLoading, error};
}