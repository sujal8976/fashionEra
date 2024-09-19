import WomensBanner from "@/Components/Womens Components/Womens.Banner.jsx";
import WomensCategory from "@/Components/Womens Components/Womens.Category.jsx";
import { useAllCategoriesQuery } from "@/services/categoryApi";
import Products from "./Products";

export default function Womens() {
  const { data, isFetching } = useAllCategoriesQuery();

  const parentCatWomen = {};

  if (data && data?.categories) {
    data?.categories
      .filter((category) => !category?.parentCategory)
      .forEach((category) => {
        if (category.catName.toLowerCase() === "womens") {
          (parentCatWomen._id = category._id),
            (parentCatWomen.catName = category.catName);
        }
      });
  }

  return (
    <>
      <div className="womens">
        <WomensBanner />
        <WomensCategory />
        <div className="womensProducts py-[50px] flex justify-center">
          <div className="womensProductContainer w-[1400px] flex flex-col gap-10">
            <div className="texts self-start">
              <h1 className="text-black text-[40px] font-medium">
                Top Womens Products
              </h1>
            </div>
            <Products parentCategory={parentCatWomen._id} />
          </div>
        </div>
      </div>
    </>
  );
}
