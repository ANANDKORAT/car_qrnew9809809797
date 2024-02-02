import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ isSinglePage = false }) => (
  <div className="w-100">
    <Skeleton height={isSinglePage ? 410 : 210} />
    {!isSinglePage && <Skeleton width={80} />}
    <Skeleton count={2} height={10} />
  </div>
);

export default SkeletonLoader;
