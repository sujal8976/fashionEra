import { Link } from "react-router-dom";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductCard({ props, isLoading }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const addToCartHandler = () => {
    if (props.stock < 1) return toast.error("Out of Stock");
    dispatch(
      addToCart({
        productId: props._id,
        title: props.title,
        description: props.description,
        oldPrice: props.oldPrice,
        sellingPrice: props.sellingPrice,
        size: selectedSize,
        color: selectedColor,
        image: props.images[0],
        stock: props.stock,
        quantity: 1,
      })
    );
    toast.success("Added to Cart");
  };

  return (
    <>
      <div className="productCardWrapper">
        <div className="productCard border-2 border-gray-400/25 border-solid flex flex-col p-3 w-72 shadow-md transition-all delay-100 hover:shadow-xl rounded-xl gap-5">
          <div className="flex justify-center rounded-xl">
            <Link to="/product">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-slate-400"
                  >
                    <ShoppingCart className="size-[38px]" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add to Cart</DialogTitle>
                    <DialogDescription>Select Size and Color</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-3 space-x-2">
                    <img
                      className="h-32 w-28 object-contain"
                      src={props.images[0]}
                      alt={props.title}
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold">{props.title}</h1>
                      <p className="text-slate-500">{props.description}</p>
                      <div className="flex items-center gap-3 text-lg font-medium">
                        &#8377;{props.sellingPrice}
                        <div className="text-base font-normal text-slate-600 line-through">
                          &#8377;{props.oldPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {selectedSize
                            ? selectedSize.toUpperCase()
                            : "Select Size"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        {props.sizes.map((size, i) => (
                          <DropdownMenuItem
                            key={i}
                            className="font-semibold"
                            onClick={() => setSelectedSize(size)}
                          >
                            {size.toUpperCase()}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {selectedColor
                            ? selectedColor.toUpperCase()
                            : "Select Color"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        {props.color.map((col, i) => (
                          <DropdownMenuItem
                            key={i}
                            className="font-semibold"
                            onClick={() => setSelectedColor(col)}
                          >
                            {col.toUpperCase()}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => addToCartHandler()}
                        disabled={!(selectedColor && selectedSize)}
                      >
                        Add To Cart
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
