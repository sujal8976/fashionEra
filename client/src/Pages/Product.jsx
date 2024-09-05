import { useState } from "react";
import { MyntraCarousel, Slider } from "6pp";
import { ArrowLeft, ArrowRight, BadgePercent, Dot, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1689974465650-b223928cdc9e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
  },
];

export default function Product() {
  const onPage = useSelector((state) => state.onPageCategory.onPage);
  const [carouselOpen, setCarouselOpen] = useState(false);
  return (
    <>
      <div className="product flex justify-center">
        <div className="productContainer w-[1400px] flex flex-col">
          <div className="breadcrumb text-xl font-medium my-10">
            Home{"   "}/{"   "}
            {onPage.charAt(0).toUpperCase() + onPage.slice(1)}
            {"   "}/{"   "}category
          </div>
          <section className="flex w-full">
            <div className="flex-[.6] mb-10">
              <div className="imagesSection w-[80%] h-[90vh]">
                <Slider
                  objectFit="cover"
                  showThumbnails
                  showNav={false}
                  onClick={() => setCarouselOpen(true)}
                  images={images.map((i) => i.img) || []}
                />
                {carouselOpen && (
                  <MyntraCarousel
                    NextButton={NextButton}
                    PrevButton={PrevButton}
                    setIsOpen={setCarouselOpen}
                    images={images.map((i) => i.img) || []}
                  />
                )}
              </div>
            </div>
            <div className="productInfoSection flex-col flex-[.4]">
              <div className="text-sm font-medium my-5">NEW</div>
              <div className="productTitle text-xl font-medium mb-1">
                Lorem ipsum dolor sit.
              </div>
              <div className="brandName text-lg text-slate-600 font-medium">
                Nike
              </div>
              <div className="price flex flex-col">
                <div className="my-5 text-2xl font-semibold">
                  &#8377; 1299.00{" "}
                  <span className="oldPrice ml-5 text-lg font-medium text-slate-500 line-through">
                    &#8377; 1799.00
                  </span>{" "}
                </div>
                <div className="discountPercentage text-base font-medium bg-green-500 rounded-full flex items-center p-1 w-32 justify-center mb-6">
                  <BadgePercent className="size-5" />
                  &nbsp;
                  <span>{(((1799 - 1299) / 1799) * 100).toFixed(2)}% OFF</span>
                </div>
              </div>
              <div className="productDesc text-lg flex flex-col">
                <div className="text-xl font-semibold">Product Details</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam sapiente praesentium vitae blanditiis placeat
                voluptatibus porro dolore doloremque perspiciatis vero!
                <ul className="features ml-5">
                  <li className="flex items-center">
                    <Dot className="size-7" />
                    feature 1
                  </li>
                  <li className="flex items-center">
                    <Dot className="size-7" />
                    feature 2
                  </li>
                  <li className="flex items-center">
                    <Dot className="size-7" />
                    feature 3
                  </li>
                  <li className="flex items-center">
                    <Dot className="size-7" />
                    feature 4
                  </li>
                </ul>
              </div>
              <div className="buttons flex flex-col my-12">
                <div className="flex gap-10 ">
                  <Button className="rounded-none text-lg py-6 flex-[.5]">
                    ADD TO CART
                  </Button>

                  <Button variant="outline" className="py-6 rounded-none">
                    <Heart className="size-8" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const NextButton = ({ onClick }) => {
  <ArrowRight />;
};

const PrevButton = ({ onClick }) => {
  <ArrowLeft />;
};
