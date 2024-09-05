import KidsBanner from "@/Components/Kids Components/Kids.Banner";
import KidsCategory from "@/Components/Kids Components/Kids.Category.jsx";
import Products from "./Products";
import { useAllCategoriesQuery } from "@/services/categoryApi";

export default function Kids() {
  const { data, isFetching } = useAllCategoriesQuery();

  const parentCatKids = {};

  if (data && data?.categories) {
    data?.categories
      .filter((category) => !category?.parentCategory)
      .forEach((category) => {
        if (category.catName.toLowerCase() === "kids") {
          (parentCatKids._id = category._id),
            (parentCatKids.catName = category.catName);
        }
      });
  }
  return (
    <>
      <div className="kids">
        <KidsBanner />
        <KidsCategory />
        <div className="kidsProducts py-[50px] flex justify-center">
          <div className="kidsProductContainer w-[1400px] flex flex-col gap-10">
            <div className="texts self-start">
              <h1 className="text-black text-[40px] font-medium">
                Top Kids Products
              </h1>
            </div>
            <Products parentCategory={parentCatKids._id} />
          </div>
        </div>
      </div>
    </>
  );
}
