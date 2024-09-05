import Slide from "../Slide.jsx";
import CategoriesCard from "../CategoriesCard.jsx";

export default function WomensCategory() {
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
      <div className="womensCategory py-[50px] flex justify-center">
        <div className="womensCategoryContainer  w-[1400px] flex flex-col gap-12">
          <div className="w-full self-start">
            <h1 className="text-black text-4xl font-medium">
              Top Mens Categories
            </h1>
            <p className=" text-gray-400 text-lg ">Amazing deals on products</p>
          </div>
          <div className="womensCategory self-center">
            <Slide>
              {catInfo.map((info, i) => {
                return <CategoriesCard key={i} categoryInfo={info} />;
              })}
            </Slide>
          </div>
        </div>
      </div>
    </>
  );
}
