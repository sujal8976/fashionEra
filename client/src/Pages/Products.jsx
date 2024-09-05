import { useAllProductsQuery } from "@/services/productApi";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.jsx";
import { useLocation } from "react-router-dom";
import ProductCardSkeleton from "@/Components/ProductCardSkeleton";
import toast from "react-hot-toast";
import { useAllCategoriesQuery } from "@/services/categoryApi";
import { useGetBrandsQuery } from "@/services/brandApi";

export default function Products({ parentCategory }) {
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [priceCheck, setPriceCheck] = useState(100000);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryCheck, setcategoryCheck] = useState([]);
  const [brandCheck, setbrandCheck] = useState([]);
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state) {
      if (state.inputValue) setSearch(state.inputValue);

      if (state.category) setCategory(state.category);
    }
    if (parentCategory) setGender(parentCategory);
  }, [location.state]);

  const { data, isFetching } = useAllProductsQuery({
    search,
    page,
    price,
    brand,
    category,
    sort: selectedSortBy,
    parentCategory: gender,
  });

  const { data: categoryData } = useAllCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();

  function handleFilterChange(event, catType) {
    const { checked, id } = event.target;
    if (catType === "subCat") {
      setcategoryCheck((prev) => {
        if (checked) {
          return [...prev, id];
        } else {
          return prev.filter((categoryId) => categoryId !== id);
        }
      });
    } else if (catType === "brand") {
      setbrandCheck((prev) => {
        if (checked) {
          return [...prev, id];
        } else {
          return prev.filter((brand) => brand !== id);
        }
      });
    }
  }

  const formatArrayToString = (arr) => {
    return arr.length > 0 ? arr.join(",") : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (brandCheck || categoryCheck || priceCheck !== 100000) {
      setBrand(formatArrayToString(brandCheck));
      setCategory(formatArrayToString(categoryCheck));
      setPrice(priceCheck);
    } else {
      toast.error("First, Apply filters");
    }
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    if (
      brandCheck ||
      categoryCheck ||
      brand ||
      category ||
      priceCheck !== 100000 ||
      price
    ) {
      setbrandCheck([]);
      setcategoryCheck([]);
      setBrand("");
      setCategory("");
      setGender("");
      setPrice(null);
      setPriceCheck(100000);
      setPage(1);
    } else {
      toast.error("First, Select filters");
    }
  };

  const isPrevPage = page > 1;
  const isNextPage = page < data?.totalPage;

  return (
    <>
      <div className="products flex justify-center">
        <div className="productsContainer w-[1400px] flex-col">
          <div className="productsComponentWrapper relative w-full flex justify-between gap-5">
            <div className="filterSection mt-12 h-max-content sticky top-10">
              <div className="filterComponent w-60 flex flex-col">
                <div className="flex items-center justify-start pl-12 ">
                  <h1 className="h-full text-2xl font-semibold text-black py-5">
                    FILTERS
                  </h1>
                </div>
                <hr className=" border border-solid" />
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-category">
                      <AccordionTrigger>Category</AccordionTrigger>
                      {categoryData &&
                        categoryData?.categories.map(
                          (category, ind) =>
                            category.parentCategory !== null && (
                              <AccordionContent key={ind}>
                                <div className="flex items-center justify-start pl-5 gap-4">
                                  <input
                                    type="checkbox"
                                    id={category._id}
                                    checked={
                                      categoryCheck
                                        ? categoryCheck.includes(category._id)
                                        : false
                                    }
                                    onChange={(event) =>
                                      handleFilterChange(event, "subCat")
                                    }
                                  />
                                  <label
                                    htmlFor={category._id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {category.catName.charAt(0).toUpperCase() +
                                      category.catName.slice(1)}
                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                    <span className="text-gray-400">
                                      {category.parentCategory.catName}
                                    </span>
                                  </label>
                                </div>
                              </AccordionContent>
                            )
                        )}
                    </AccordionItem>
                    <AccordionItem value="item-brand">
                      <AccordionTrigger>Brands</AccordionTrigger>
                      {brandData &&
                        brandData?.brandNames.map((brand, ind) => (
                          <AccordionContent key={ind}>
                            <div className="flex items-center justify-start pl-5 gap-4">
                              <input
                                type="checkbox"
                                id={brand}
                                checked={
                                  brandCheck
                                    ? brandCheck.includes(brand)
                                    : false
                                }
                                onChange={(event) =>
                                  handleFilterChange(event, "brand")
                                }
                              />
                              <label
                                htmlFor={brand}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {brand}
                              </label>
                            </div>
                          </AccordionContent>
                        ))}
                    </AccordionItem>
                    <AccordionItem value="item-price">
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex-col py-2 ml-5">
                          <h4 className="text-base pl-3">
                            Max Price :{" "}
                            <span className="font-semibold">
                              {priceCheck || ""}
                            </span>
                          </h4>

                          <input
                            className="mt-3 w-36 font-semibold border-2 rounded-lg border-black ml-1 p-1 outline-none focus:border-gray-500 focus:border-2"
                            type="number"
                            placeholder="Enter MaxPrice"
                            onChange={(e) =>
                              setPriceCheck(Number(e.target.value))
                            }
                          />

                          <h1 className="text-lg py-2 font-semibold ml-5 text-gray-400">
                            OR
                          </h1>
                          <input
                            type="range"
                            max={100000}
                            min={100}
                            value={priceCheck}
                            step={100}
                            onChange={(e) =>
                              setPriceCheck(Number(e.target.value))
                            }
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="action-btns w-full flex items-center justify-around p-3">
                    <Button variant="outline" onClick={handleResetFilter}>
                      Reset
                    </Button>
                    <Button type="submit">Apply</Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full productsSection flex flex-col gap-1">
              <div className="py-10 flex justify-center text-3xl font-semibold">
                <h1>Top Product</h1>
              </div>
              <div className="border border-solid bg-[#f9f9f9] flex items-center justify-around">
                <div className="itemsFound py-5 text-sm font-medium">
                  <p>{data && data?.totalProductsNo} Items Found</p>
                </div>
                <div className="sortBy flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-500/90">
                    SORT BY
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="py-0 px-16">
                        <p className="flex items-center">
                          {selectedSortBy === "asc"
                            ? "Low to High Price"
                            : selectedSortBy === "dsc"
                            ? "High to Low Price"
                            : "None"}
                          <ChevronDown />
                        </p>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Sort</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={selectedSortBy}
                        onValueChange={setSelectedSortBy}
                      >
                        <DropdownMenuRadioItem value="asc">
                          Low to High Price
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dsc">
                          High to Low Price
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="">
                          None
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {data && data?.products.length === 0 ? (
                <div className="flex justify-center items-center my-32">
                  <h1 className="text-3xl font-bold">No Products Found</h1>
                </div>
              ) : (
                <div className="products w-full grid grid-cols-3 justify-items-center gap-5 mt-3">
                  {isFetching
                    ? Array.from({ length: 9 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))
                    : data &&
                      data.products &&
                      data.products.map((product, index) => (
                        <ProductCard key={index} props={product} />
                      ))}
                </div>
              )}
              {data && data.totalPage !== 0 && (
                <div className="pagination self-center mt-12 flex gap-5 items-center">
                  <Button
                    disabled={!isPrevPage}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Prev
                  </Button>
                  <span className="text-lg">
                    <span className="font-bold text-2xl">{page}</span> of{" "}
                    {data.totalPage}
                  </span>
                  <Button
                    disabled={!isNextPage}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
