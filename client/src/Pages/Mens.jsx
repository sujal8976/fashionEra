import { useAllCategoriesQuery } from "@/services/categoryApi.js";
import MensBanner from "../Components/Mens Components/Mens.Banner.jsx";
import MensCategory from "../Components/Mens Components/Mens.Category.jsx";
import Products from "./Products.jsx";

export default function Mens() {
  const { data, isFetching } = useAllCategoriesQuery();

  const parentCatMen = {};

  if (data && data?.categories) {
    data?.categories
      .filter((category) => !category?.parentCategory)
      .forEach((category) => {
        if (category.catName.toLowerCase() === "mens") {
          (parentCatMen._id = category._id),
            (parentCatMen.catName = category.catName);
        }
      });
  }

  return (
    <>
      <div className="mens">
        <MensBanner />
        <MensCategory />
        <div className="mensProducts py-[50px] flex justify-center">
          <div className="mensProductContainer w-[1400px] flex flex-col gap-10">
            <div className="texts self-start">
              <h1 className="text-black text-[40px] font-medium">
                Top Mens Products
              </h1>
            </div>
            <Products parentCategory={parentCatMen._id} />
          </div>
        </div>
      </div>
    </>
  );
}
