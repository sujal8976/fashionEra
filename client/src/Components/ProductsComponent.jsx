import FilterComponent from "./FilterComponent.jsx";
import ProductCard from "./ProductCard.jsx";
import { useState } from "react";
import { productsInfo } from "@/utils/productsInfo.js";
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

export default function ProductsComponent() {
  const [selectedSortBy, setSelectedSortBy] = useState("");

  const handleSortChange = (e) => {
    setSelectedSortBy(e.target.value);
  };

  return (
    <>
      <div className="productsComponentWrapper relative w-full flex justify-between gap-5">
        <div className="filterSection mt-12 h-max-content sticky top-10">
          <FilterComponent />
        </div>
        <div className="w-full productsSection flex flex-col gap-1">
          <div className="py-10 flex justify-center text-3xl font-semibold">
            <h1>Top Mens Product</h1>
          </div>
          <div className="border border-solid bg-[#f9f9f9] flex items-center justify-around">
            <div className="itemsFound py-5 text-sm font-medium">
              <p>{productsInfo.length} Items Found</p>
            </div>
            <div className="sortBy flex items-center gap-2">
              <p className="text-sm font-medium text-gray-500/90">SORT BY</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="py-0 px-16">
                    <p className="flex items-center">
                      {selectedSortBy
                        ? selectedSortBy.charAt(0).toUpperCase() +
                          selectedSortBy.slice(1)
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
                    <DropdownMenuRadioItem value="trending">
                      Trending
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="discount">
                      Discount
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="low-price">
                      Low-Price
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high-price">
                      High-Price
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="">None</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="products w-full grid grid-cols-3 justify-items-center gap-5 mt-3">
            {productsInfo.map((info, index) => (
              <ProductCard key={index} props={info} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
