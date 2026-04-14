import './ViewsAndLikes.css';
import {IconEye, IconThumbUp} from "@tabler/icons-react";

interface ViewsAndLikesProps {
    likes: number;
    views: number;
}

function ViewsAndLikes({likes, views}: ViewsAndLikesProps)  {
    return (
        <div className="view-count">
            <div className="counter">
                <IconThumbUp/> {likes}
            </div>
            <div className="counter">
                <IconEye/> {views}
            </div>
        </div>
    );
}

export default ViewsAndLikes;