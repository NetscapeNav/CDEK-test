import './CompanyNewsCard.css';
import type { NewsItem } from "../../types/news";
import { IconThumbUp, IconEye} from "@tabler/icons-react";

interface NewsCardProps {
    item: NewsItem;
    index: number;
}

function CompanyNewsCard({item, index} : NewsCardProps) {
    const rawImageUrl = item.cover?.images[0]?.m;
    const imageUrl = rawImageUrl?.startsWith('/')
        ? `http://1e14c3489fcb.vps.myjino.ru:5000${rawImageUrl}`
        : rawImageUrl;

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
        <div className={`news-container ${!imageUrl ? 'no-images' : ''} ${index > 0 ? 'not-first-item' : ''}`}>
            {imageUrl && <img className="news-image" src={imageUrl} alt={item.title} loading="lazy"/>}
            <div className="news-header-text">
                <p className="news-date">{formattedDate}</p>
                <h2 className="header">{item.title}</h2>
                <div className="info-container">
                    <div className="tags-container">
                        {item.rubrics.map((rubric, index) => (
                            <span
                                className={`tag ${index === 0 ? 'tag-first' : ''} ${index === 1 ? 'tag-second' : ''}`}
                                key={rubric.id}>{rubric.name}</span>
                        ))}
                    </div>
                    {viewsAndLikes}
                </div>
            </div>
        </div>
    );
}

export default CompanyNewsCard;
