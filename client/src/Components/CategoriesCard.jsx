import { cn } from "@/lib/utils";

export default function CategoriesCard({ categoryInfo,className }) {
  return (
    <>
      <div className={cn("categoryCard p-2 flex flex-col items-center gap-2 border-solid border mx-5 rounded-lg shadow-lg cursor-pointer max-w-[220px]",className)}>
        <div className="img relative w-full h-56">
          <div className=" absolute bottom-0 w-full h-40 categoryCardBg z-10"></div>
          <img
            className="absolute  w-full h-full z-20"
            src={categoryInfo.img}
            alt=""
          />
        </div>
        <hr className="border border-solid w-full" />
        <div className="info flex justify-center items-center">
          <h2 className="text-xl text-black font-medium">
            {categoryInfo.desc}
          </h2>
        </div>
      </div>
    </>
  );
}
