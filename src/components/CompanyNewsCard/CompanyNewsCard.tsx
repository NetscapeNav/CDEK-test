import './CompanyNewsCard.css';
import type { NewsItem } from "../../types/news";
import ViewsAndLikes from "../ViewsAndLikes/ViewsAndLikes.tsx";
import {getFormattedDate, getImageUrl} from "../../utils/constats.ts";

interface NewsCardProps {
    item: NewsItem;
    index: number;
}

function CompanyNewsCard({item, index} : NewsCardProps) {
    const imageUrl = getImageUrl(item);
    const formattedDate = getFormattedDate(item.publishedAt);

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
                                className={`tag ${index % 2 === 0 ? 'tag-first' : 'tag-second'}`}
                                key={rubric.id}>{rubric.name}</span>
                        ))}
                    </div>
                    <ViewsAndLikes likes={item.likeCount} views={item.viewCount}/>
                </div>
            </div>
        </div>
    );
}

export default CompanyNewsCard;
