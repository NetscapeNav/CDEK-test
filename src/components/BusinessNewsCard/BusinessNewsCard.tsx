import './BusinessNewsCard.css';
import type { NewsItem } from "../../types/news";
import { IconStarFilled } from "@tabler/icons-react";
import ViewsAndLikes from "../ViewsAndLikes/ViewsAndLikes.tsx";
import {getFormattedDate, getImageUrl} from "../../utils/constats.ts";

interface NewsCardProps {
    item: NewsItem;
    index: number;
    page: number;
}

function BusinessNewsCard({item, index, page} : NewsCardProps) {
    const imageUrl = getImageUrl(item);
    const formattedDate = getFormattedDate(item.publishedAt);

    return (
        <div className={`news-container ${!imageUrl ? 'no-images' : ''} ${index === 0 ? 'first-image' : ''}`}>
            {index === 0 && imageUrl && <img className="news-image" src={imageUrl} alt={item.title} loading="lazy"/>}
            <div className="news-header-text">
                {index === 0 && page === 1 && (
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
                    <ViewsAndLikes likes={item.likeCount} views={item.viewCount}/>
                </div>
            </div>
        </div>
    );
}

export default BusinessNewsCard;
