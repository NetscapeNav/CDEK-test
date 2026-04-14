import './NewsCard.css';
import type { NewsItem } from "../../types/news";
import { IconThumbUp, IconEye } from "@tabler/icons-react";

interface NewsCardProps {
    item: NewsItem;
    displayImages: 'all' | 'first';
    index: number;
}

function NewsCard({item, displayImages, index} : NewsCardProps) {
    const showImages = (displayImages === 'all') || (displayImages === 'first' && index === 0);
    const rawImageUrl = item.cover?.images[0]?.m;
    const imageUrl = rawImageUrl?.startsWith('/')
        ? `http://1e14c3489fcb.vps.myjino.ru:5000${rawImageUrl}`
        : rawImageUrl;
    console.log("Картинка:", item.title, imageUrl);

    const dateObj = new Date(item.publishedAt);
    const dayAndMonth = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const formattedDate = `${dayAndMonth} ${hours}:${minutes}`;

    return (
        <div className={`news-container ${!showImages || !imageUrl ? 'no-images' : ''} ${displayImages === 'first' && index === 0 ? 'first-image' : ''}`}>
            {showImages && imageUrl && <img className="news-image" src={imageUrl} alt={item.title} loading="lazy"/>}
            <div className="news-header-text">
                <p className="news-date">{formattedDate}</p>
                <h2 className="header">{item.title}</h2>
                <div className="info-container">
                    {displayImages === 'all' ? (
                        <div className="tags-container">
                            {item.rubrics.map(rubric => (
                                <span className="tag" key={rubric.id}>{rubric.name}</span>
                            ))}
                        </div>
                    ) : (
                        <div className="business-tags">
                        {item.rubrics.map(rubric => (
                             <span className="hashtag" key={rubric.id}>#{rubric.name.toLowerCase().replaceAll(' ', '_')} </span>
                        ))}
                        </div>
                    )}
                    <div className="view-count">
                        <div className="counter">
                            <IconThumbUp/> {item.likeCount}
                        </div>
                        <div className="counter">
                            <IconEye/> {item.viewCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
