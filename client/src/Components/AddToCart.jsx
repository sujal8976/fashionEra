import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const sizes = ["s", "m", "l", "xl", "2xl", "3xl"];

export default function AddToCart() {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <>
      <div className="addToCart flex justify-center">
        <div className="addToCartContainer flex flex-col border-[0.5px] border-slate-300 border-solid w-56 rounded-lg shadow-xl">
          <h1 className="text-gray-800 text-xl font-medium text-center py-3">
            Add to Cart
          </h1>
          <div className="selectSize mb-3">
            <h1 className="font-normal text-center pb-1">Select Size</h1>
            <div className="sizesBtn flex justify-center">
              <div className="grid grid-cols-3 justify-items-center gap-1">
                {sizes.map((size, index) => (
                  <Button
                    onClick={() => setSelectedSize(size)}
                    variant={selectedSize === size ? "" : "outline"}
                    className="w-12"
                    key={index}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="quantity mb-3 flex justify-center">
            {/* <h1 className="font-normal text-center pb-1">Quantity</h1>
            <div className="flex justify-center items-center">
              <Button variant="outline" className="w-12">
                <Minus className="size-full p-0" />
              </Button>
              <div className="quantityDisplay text-lg p-2 px-3">1</div>
              <Button variant="outline" className="w-12">
                <Plus className="size-full p-0" />
              </Button>
            </div> */}
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  );
}
