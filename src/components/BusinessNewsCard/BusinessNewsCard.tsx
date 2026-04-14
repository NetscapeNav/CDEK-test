import './BusinessNewsCard.css';
import type { NewsItem } from "../../types/news";
import { IconThumbUp, IconEye, IconStarFilled } from "@tabler/icons-react";

interface NewsCardProps {
    item: NewsItem;
    index: number;
}

function BusinessNewsCard({item, index} : NewsCardProps) {
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

    const viewsAndLikes = (
        <div className="view-count">
            <div className="counter">
                <IconThumbUp/> {item.likeCount}
            </div>
            <div className="counter">
                <IconEye/> {item.viewCount}
            </div>
        </div>
    );

    return (
        <div className={`news-container ${!imageUrl ? 'no-images' : ''} ${index === 0 ? 'first-image' : ''}`}>
            {imageUrl && <img className="news-image" src={imageUrl} alt={item.title} loading="lazy"/>}
            <div className="news-header-text">
                {index === 0 && (
                    <div className="top-news-badge"><IconStarFilled size={18}/> Топ новость</div>
                )}
                <h2 className="header">{item.title}</h2>
                <div className="business-tags">
                    {item.rubrics.map(rubric => (
                        <span className="hashtag" key={rubric.id}>
                            #{rubric.name.toLowerCase().replaceAll(' ', '_')}
                        </span>
                    ))}
                    <span>&middot;</span>
                    <span className="news-date">{formattedDate}</span>
                    <span>&middot;</span>
                    {viewsAndLikes}
                </div>
            </div>
        </div>
    );
}

export default BusinessNewsCard;
