import './NewsBlock.css';
import NewsCard from "../NewsCard/NewsCard.tsx";
import Skeleton from "../Skeleton/Skeletons.tsx";
import {useNews} from "../../hooks/useNews.ts";
import {useState} from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import TrollImg from '../../assets/pictures/troll.svg';

interface NewsBlockProps {
    title: string;
    mode: 'short' | 'empty';
    displayImages: 'all' | 'first';
}

function NewsBlock({title, mode, displayImages}: NewsBlockProps) {
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useNews(page, 3, mode);

    const date = new Date();
    const monthName = date.toLocaleDateString('ru-RU', { month: 'long' });
    const formattedDate = monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + date.getFullYear();

    const handleNext = () => {
        if (data && page < data.totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handlePrev = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="news-block">
            <h1 className="news-header-title">{title}</h1>
            <p className="news-header-date">{formattedDate}</p>
            <hr/>
            {error && <div className="error-message">Ошибка при загрузке новостей</div> }
            {isLoading ? (
                <Skeleton/>
            ) : (
                <div className="news-list">
                    {isLoading ? "Загрузка" : ""}
                    {data?.news.length === 0 ? (
                        <div className="placeholder">
                            <img src={TrollImg} alt="Новостей пока нет"/>
                            <h2>Новостей пока нет</h2>
                        </div>
                    ) : (
                        data?.news.map((newsItem, index) => (
                            <a href={"/news/" + newsItem.id} key={newsItem.id} className="news-link-wrapper">
                                <NewsCard key={newsItem.id} item={newsItem} displayImages={displayImages} index={index}/>
                            </a>
                        ))
                    )}
                </div>
            )}

            {!isLoading && !error && data && data.totalPages > 1 && (
                <div className="buttons-container">
                    <button className="button-icon" onClick={handlePrev} disabled={page <= 1}>
                        <IconArrowLeft/>
                    </button>
                    <button className="button-icon" onClick={handleNext} disabled={page >= data?.totalPages}>
                        <IconArrowRight/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default NewsBlock;