import { useGetReviewQuery } from "@/services/reviewApi";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

export default function ProductReviews({
  coverImg,
  productId,
  ratings,
  numOfReviews,
  numOfRatings,
}) {
  if (!numOfReviews) numOfReviews = 0;
  if (!numOfRatings) numOfRatings = 1;

  const { data, isFetching } = useGetReviewQuery(productId);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Product Feedback</h1>
      <hr className="w-full bg-slate-400 my-6 h-[3px]" />
      <div className="flex gap-12 items-center mb-8">
        <img
          src={coverImg}
          alt="cover-image"
          className="object-contain w-44 h-56 rounded-xl"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl">{ratings}</h1>
          <h3>Based on {numOfRatings} ratings</h3>
          <div className="stars flex gap-1">
            {Array.from({
              length: Math.round(ratings),
            }).map((_, i) => (
              <img
                key={i}
                src="/images/star.png"
                alt="star"
                className="h-4 w-4"
              />
            ))}
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Reviews({numOfReviews})</h1>
      <div className="flex flex-col gap-6 mb-10">
        {data?.reviews.length === 0 && (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-semibold">No Reviews Added</h1>
          </div>
        )}
        {isFetching &&
          Array.from({
            length: 4,
          }).map((_, i) => <ReviewCardSkeleton key={i} />)}
        {data &&
          data.reviews.map(
            (review) =>
              review.comment && <ReviewCard key={review._id} review={review} />
          )}
      </div>
    </div>
  );
}
