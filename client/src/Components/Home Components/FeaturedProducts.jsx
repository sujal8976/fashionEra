import ProductCard from "../ProductCard.jsx";
import { featuredInfo } from "../../utils/productsInfo.js";

export default function FeaturedProducts() {
  return (
    <>
      <div className="featuredProducts flex justify-center py-[50px]">
        <div className=" w-[1400px] flex flex-col gap-12">
          <div className="w-full self-start">
            <h1 className="text-black text-4xl font-medium">
              Featured Products
            </h1>
            <p className=" text-gray-400 text-lg ">Amazing deals on products</p>
          </div>
          <div className="productsContainer w-full self-center grid grid-cols-4 justify-items-center gap-5">
            {featuredInfo.map((info, index) => (
              <ProductCard props={info} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
