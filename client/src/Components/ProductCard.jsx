import { Link } from "react-router-dom";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import AddToCart from "./AddToCart";

export default function ProductCard({ props, isLoading }) {
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      <div className="productCardWrapper">
        <div className="productCard border-2 border-gray-400/25 border-solid flex flex-col p-3 w-72 shadow-md transition-all delay-100 hover:shadow-xl rounded-xl gap-5">
          <div className="flex justify-center rounded-xl">
            <Link to={`/product/${props._id}`}>
              <img
                className=" h-64 w-full object-contain cursor-pointer"
                src={props.images[0]}
                alt={props.title}
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="text-md text-slate-500">
              {props.brand}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
              {props.category &&
                props.category.catName.charAt(0).toUpperCase() +
                  props?.category.catName.slice(1)}
              &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
              {props.category &&
                props.category.parentCategory?.catName.toUpperCase()}
            </p>
            <Link to="/product/:id">
              <h1 className="text-black text-lg font-normal truncate cursor-pointer">
                {props.title}
              </h1>
            </Link>
            <div className="info flex justify-between items-center">
              <div className="price&rating flex flex-col gap-1">
                <div className="stars  flex gap-1">
                  {Array.from({
                    length: Math.round(props.ratings),
                  }).map((_, i) => (
                    <img
                      key={i}
                      src="/images/star.png"
                      alt="star"
                      className="h-4 w-4"
                    />
                  ))}
                </div>
                <div className="prices w-full flex items-center">
                  <h1 className="curentPrice text-xl font-medium ">
                    &#8377; {props.sellingPrice}
                  </h1>
                  <span className="oldPrice ml-6 text-lg text-slate-400 font-base line-through">
                    &#8377; {props.oldPrice}
                  </span>
                </div>
              </div>
              <AddToCart props={props}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-slate-400"
                >
                  <ShoppingCart className="size-[38px]" />
                </Button>
              </AddToCart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
