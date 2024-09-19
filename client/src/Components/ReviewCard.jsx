import { User } from "lucide-react";

export default function ReviewCard({ review }) {
  const mongoDate = new Date(review.updatedAt);

  const updatedAtDate = mongoDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border-2 shadow-lg rounded-xl px-5">
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-1">
          {Array.from({
            length: Math.round(review.rating),
          }).map((_, i) => (
            <img
              key={i}
              src="/images/star.png"
              alt="star"
              className="h-4 w-4"
            />
          ))}
        </div>
        <div className="text-sm text-slate-800">{updatedAtDate}</div>
      </div>
      <div className="py-3">{review.comment}</div>
      <div className="pb-2 flex items-center gap-3">
        <div className="size-10">
          {review.author.image ? (
            <img
              src={review.author.image}
              alt={review.author.name}
              className="h-full w-full rounded-full"
            />
          ) : (
            <User className="h-full rounded-full w-full" />
          )}
        </div>
        <h3 className="font-bold">{review.author.name}</h3>
      </div>
    </div>
  );
}
