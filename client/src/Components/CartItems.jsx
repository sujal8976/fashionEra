import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItems({ itemDetail,incrementHandler,
  decrementHandler,
  removeHandler }) {
  return (
    <div className="cartItemWrapper flex flex-col w-full py-2">
      <div className="cartItem flex gap-8 w-full py-5">
        <img
          className="w-32 h-36 object-contain"
          src={itemDetail.image}
          alt={itemDetail.title}
        />
        <div className="cartItemInfo flex flex-col justify-between">
          <h1 className="title text-xl font-medium">{itemDetail.title}</h1>
          <h1 className="desc text-lg font-normal">{itemDetail.description}</h1>
          <h1 className="sizeColor text-lg text-slate-500 font-normal">
            Size:{" "}
            <span className="font-medium text-black">
              {itemDetail.size.toUpperCase()}
            </span>
            &nbsp; / &nbsp;Color:{" "}
            <span className="font-medium text-black">
              {itemDetail.color.toUpperCase()}
            </span>
          </h1>
          <h1 className="price flex text-xl font-medium">
            &#8377;{itemDetail.sellingPrice}&nbsp;&nbsp;
            <span className="text-base line-through self-end text-slate-500 font-normal">
              &#8377;{itemDetail.oldPrice}
            </span>
          </h1>
        </div>
      </div>
      <hr className="border-solid border-slate-400 w-full" />
      <div className="functionBtns px-6 flex justify-between items-center py-4">
        <div className="inc&dec flex gap-3 items-center">
          <span onClick={()=>decrementHandler(itemDetail)} className="p-2 bg-gray-100 cursor-pointer hover:bg-slate-400">
            <Minus  className="size-4" />
          </span>
          {itemDetail.quantity}
          <span onClick={()=>incrementHandler(itemDetail)} className="p-2 bg-gray-100 cursor-pointer hover:bg-slate-400">
          <Plus  className="size-4" />
          </span>
        </div>
        <div onClick={() => removeHandler(itemDetail.productId)} className="deleteBtn cursor-pointer p-2 bg-gray-100 hover:bg-slate-400">
          <Trash2  className="size-5" />
        </div>
      </div>
    </div>
  );
}
