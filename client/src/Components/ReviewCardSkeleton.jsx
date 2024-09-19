export default function ReviewCardSkeleton() {
  return (
    <div className="border-2 shadow-lg rounded-xl px-5 animate-pulse">
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-1">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="py-3">
        <div className="h-5 bg-gray-200 rounded w-full my-1"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 my-1"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 my-1"></div>
      </div>
      <div className="pb-2 flex items-center gap-3">
        <div className="size-10 rounded-full bg-gray-200"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
