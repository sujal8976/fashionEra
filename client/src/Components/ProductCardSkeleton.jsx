export default function ProductCardSkeleton() {
  return (
    <>
      <div className="">
        <div className="border-2 border-gray-400/25 border-solid flex flex-col p-3 w-72 shadow-md transition-all delay-100 hover:shadow-xl rounded-xl gap-5 animate-pulse">
          <div className="flex justify-center rounded-xl">
            <div className="h-64 w-full object-contain cursor-pointer bg-gray-200"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-md h-4 bg-gray-200 w-1/3"></div>
            <div className="text-black text-lg font-normal cursor-pointer h-6 bg-gray-200 w-3/4"></div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="stars flex gap-1 h-4 bg-gray-200 w-16"></div>
                <div className="w-full flex items-center">
                  <div className="text-xl font-medium h-6 bg-gray-200 w-1/3"></div>
                  <div className="ml-6 text-lg text-slate-400 font-base line-through w-1/4 h-6 bg-gray-200"></div>
                </div>
              </div>
              <div className="cursor-pointer transition-all delay-75 hover:bg-slate-400/60 rounded-full p-1 h-8 w-8 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
