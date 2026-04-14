import type { NewsItem } from "../types/news";

export const getImageUrl = (item: NewsItem): string | undefined => {
    const rawImageUrl = item.cover?.images[0]?.m;
    return rawImageUrl?.startsWith('/')
        ? `/proxy${rawImageUrl}`
        : rawImageUrl;
};

export const getFormattedDate = (dateString: string): string => {
    const dateObj = new Date(dateString);
    const dayAndMonth = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${dayAndMonth} ${hours}:${minutes}`;
};