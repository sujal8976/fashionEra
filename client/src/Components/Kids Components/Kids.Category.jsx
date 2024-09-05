import Slide from "../Slide.jsx";
import CategoriesCard from "../CategoriesCard.jsx";

export default function KidsCategory() {
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
      <div className="kidsCategory py-[50px] flex justify-center">
        <div className="kidsCategoryContainer  w-[1400px] flex flex-col gap-12">
          <div className="w-full self-start">
            <h1 className="text-black text-4xl font-medium">
              Top kids Categories
            </h1>
            <p className=" text-gray-400 text-lg ">Amazing deals on products</p>
          </div>
          <div className="kidsCategory self-center">
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
