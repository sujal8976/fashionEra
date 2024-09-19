import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "@/Components/CartItems";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "@/features/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartItems, tax, shipping, total, subTotal, discount, loading } =
    useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const incrementHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error("Product Stock limited reached.");

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1)
      return toast.error("Product Stock limited reached.");

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <>
      <div className="cartPage flex justify-center mb-10">
        <div className="cartPageContainer w-[1400px] flex flex-col">
          <div className="cartText text-5xl font-medium self-start my-14">
            <h1>Cart</h1>
          </div>
          <div className="cartWrapper relative flex w-full gap-10">
            <div className="cartInfo flex flex-col flex-[.75]">
              <div className="processBreadcrumb">
                <h1 className="process text-xl font-normal mb-2">
                  <span className="font-semibold">1.Cart</span>&nbsp;&nbsp;
                  --------&nbsp;&nbsp; &nbsp;&nbsp;2.Checkout&nbsp;&nbsp;
                  -------- &nbsp;&nbsp;3.Payment
                </h1>
              </div>
              <div className="cartItems flex flex-col py-5">
                {cartItems.length === 0 && (
                  <div className="self-center text-2xl font-bold">
                    No Item Added to Cart
                  </div>
                )}
                {cartItems.map((cartItem) => (
                  <CartItems
                    key={cartItem.productId}
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    removeHandler={removeHandler}
                    itemDetail={cartItem}
                  />
                ))}
              </div>
            </div>
            <div className="cartValue bg-gray-200 flex-[.25] rounded-lg h-max-content sticky top-12">
              <div className="orderSummary flex flex-col px-5">
                <h1 className="orderSummaryText py-6 text-xl font-medium">
                  Order Summary
                </h1>
                <div className="cartDetail">
                  <ul>
                    <li className="summaryItems flex justify-between text-lg font-normal mb-3">
                      Sub Total
                      <span className="font-medium">
                        &#8377;
                        {subTotal}
                      </span>
                    </li>
                    <li className="summaryItems flex justify-between text-lg font-normal mb-3">
                      Discount
                      <span className="font-medium">&#8377;{discount}</span>
                    </li>
                    <li className="summaryItems flex justify-between text-lg font-normal mb-3">
                      <div>
                        Tax&nbsp;
                        <span className="font-light italic">
                          (5% on SubTotal)
                        </span>
                      </div>
                      <span className="font-medium">&#8377;{tax}</span>
                    </li>
                    <li className="summaryItems flex justify-between text-lg font-normal mb-3">
                      Shipping
                      <span className="font-medium text-green-700">
                        &#8377;
                        {shipping
                          ? shipping
                          : cartItems.length === 0
                          ? 0
                          : "Free"}
                      </span>
                    </li>
                    <li className="summaryItems flex justify-between text-lg font-normal">
                      Total
                      <span className="font-medium text-xl">
                        &#8377;{total}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="proceedBtn flex justify-center py-5 w-full">
                  <Button className="w-[90%] rounded-full ">
                    Proceed to Checkout
                  </Button>
                </div>
                <hr className="border-solid border-slate-500 w-[90%]" />
                <div className="text-base font-normal self-center py-5">
                  {cartItems.length === 0 ? (
                    "No Items Added to Cart"
                  ) : (
                    <div>
                      Estimated Delivery by&nbsp;
                      <span className="font-medium">25 April, 2024</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
