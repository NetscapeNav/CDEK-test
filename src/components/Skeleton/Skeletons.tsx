const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
    </div>
);

function Skeleton() {
    return (
        <div className="news-list">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </div>
    )
}

export default Skeleton;