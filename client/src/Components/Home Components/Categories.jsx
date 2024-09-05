import Slide from "../Slide.jsx";
import CategoriesCard from "../CategoriesCard.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Categories() {
  const catInfo = [
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
    {
      img: "/images/watch.png",
      desc: "WATCHES",
    },
  ];

  return (
    <>
      <div className="categories py-[50px] flex justify-center">
        <div className="categoriesContainer w-[1400px] flex flex-col gap-12">
          <div className="w-full self-start">
            <h1 className="text-black text-4xl font-medium">Top Categories</h1>
            <p className=" text-gray-400 text-lg ">Amazing deals on products</p>
          </div>
          <div className="categoriesSlides self-center">
            {/* <Slide>
            </Slide> */}
            <Carousel className="w-full">
              <CarouselContent className="-ml-4 w-full">
                {catInfo.map((info, i) => (
                  <CarouselItem key={i} className="w-full md:basis-1/4 lg:basis-1/5">
                    <div className="p-1 w-full">
                      <CategoriesCard categoryInfo={info} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
