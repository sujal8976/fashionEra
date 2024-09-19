import { useState } from "react";
import { MyntraCarousel, Slider } from "6pp";
import { ArrowLeft, ArrowRight, BadgePercent, Dot, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@/services/productApi";
import ProductReviews from "@/Components/ProductReviews";
import Loading from "@/Components/Loading/Loading";
import { useEffect } from "react";
import AddToCart from "@/Components/AddToCart";

export default function Product() {
  const { id } = useParams();
  const { data, isFetching } = useGetProductQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [carouselOpen, setCarouselOpen] = useState(false);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <div className="product flex justify-center">
          <div className="productContainer w-[1400px] flex flex-col">
            <div className="breadcrumb text-xl font-medium my-10">
              Home&nbsp;&nbsp;/&nbsp;&nbsp;
              {data.category.parentCategory.catName.charAt(0).toUpperCase() +
                data.category.parentCategory.catName.slice(1)}
              &nbsp;&nbsp;/&nbsp;&nbsp;category
            </div>
            <section className="flex w-full">
              <div className="flex-[.6] mb-10">
                <div className="imagesSection w-[80%] h-[90vh]">
                  <Slider
                    objectFit="cover"
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarouselOpen(true)}
                    images={data.images.map((i) => i) || []}
                  />
                  {carouselOpen && (
                    <MyntraCarousel
                      NextButton={NextButton}
                      PrevButton={PrevButton}
                      setIsOpen={setCarouselOpen}
                      images={data.images.map((i) => i) || []}
                    />
                  )}
                </div>
              </div>
              <div className="productInfoSection flex-col flex-[.4]">
                <div className="text-sm font-medium my-5">NEW</div>
                <div className="productTitle text-xl font-medium mb-1">
                  {data.title}
                </div>
                <div className="brandName text-lg text-slate-600 font-medium">
                  {data.brand}
                </div>
                <div className="categoryName bg-[#9c9998] rounded-xl px-3 max-w-fit text-lg text-slate-600 font-semibold">
                  {data.category.catName.toUpperCase()}
                </div>
                <div className="price flex flex-col">
                  <div className="my-5 text-2xl font-semibold">
                    &#8377; {data.sellingPrice}{" "}
                    <span className="oldPrice ml-5 text-lg font-medium text-slate-500 line-through">
                      &#8377; {data.oldPrice}
                    </span>{" "}
                  </div>
                  <div className="discountPercentage text-base font-medium bg-green-500 rounded-full flex items-center max-w-fit px-4 py-1 justify-center mb-6">
                    <BadgePercent className="size-5" />
                    &nbsp;
                    <span>
                      {(
                        ((data.oldPrice - data.sellingPrice) /
                          data.sellingPrice) *
                        100
                      ).toFixed(2)}
                      % OFF
                    </span>
                  </div>
                </div>
                <div className="productDesc text-lg flex flex-col">
                  <div className="text-xl font-semibold">Product Details</div>
                  {data.description}
                </div>
                <div className="buttons flex flex-col my-12">
                  <div className="flex gap-10 ">
                    <AddToCart props={data}>
                      <Button className="rounded-none text-lg py-6 flex-[.5]">
                        ADD TO CART
                      </Button>
                    </AddToCart>
                    <Button variant="outline" className="py-6 rounded-none">
                      <Heart className="size-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <div>
              <ProductReviews
                coverImg={data.images[0]}
                numOfReviews={data.numOfReviews}
                ratings={data.ratings}
                productId={id}
                numOfRatings={data.numOfRatings}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const NextButton = ({ onClick }) => {
  <ArrowRight />;
};

const PrevButton = ({ onClick }) => {
  <ArrowLeft />;
};
