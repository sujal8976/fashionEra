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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AddToCart({ children, props }) {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
                {selectedSize ? selectedSize.toUpperCase() : "Select Size"}
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
                {selectedColor ? selectedColor.toUpperCase() : "Select Color"}
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
  );
}
