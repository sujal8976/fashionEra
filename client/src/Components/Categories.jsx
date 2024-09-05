import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar.jsx";
import { useAllCategoriesQuery } from "@/services/categoryApi";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const { data } = useAllCategoriesQuery();
  const navigate = useNavigate();

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="border-none text-lg font-medium">
            <p className="flex font-semibold items-center">
              Categories&nbsp;
              <span>
                <ChevronDown />
              </span>
            </p>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Mens</MenubarSubTrigger>
              <MenubarSubContent>
                {data &&
                  data?.categories.map(
                    (category) =>
                      category.parentCategory?.catName === "mens" && (
                        <MenubarItem
                          onClick={() => {
                            navigate("/products", {
                              replace: true,
                              state: { category: category._id },
                            });
                          }}
                          key={category._id}
                        >
                          {category.catName.charAt(0).toUpperCase() +
                            category.catName.slice(1)}
                        </MenubarItem>
                      )
                  )}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Womens</MenubarSubTrigger>
              <MenubarSubContent>
                {data &&
                  data?.categories.map(
                    (category) =>
                      category.parentCategory?.catName === "womens" && (
                        <MenubarItem
                          onClick={() => {
                            navigate("/products", {
                              replace: true,
                              state: { category: category._id },
                            });
                          }}
                          key={category._id}
                        >
                          {category.catName.charAt(0).toUpperCase() +
                            category.catName.slice(1)}
                        </MenubarItem>
                      )
                  )}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Kids</MenubarSubTrigger>
              <MenubarSubContent>
                {data &&
                  data?.categories.map(
                    (category) =>
                      category.parentCategory?.catName === "kids" && (
                        <MenubarItem
                          onClick={() => {
                            navigate("/products", {
                              replace: true,
                              state: { category: category._id },
                            });
                          }}
                          key={category._id}
                        >
                          {category.catName.charAt(0).toUpperCase() +
                            category.catName.slice(1)}
                        </MenubarItem>
                      )
                  )}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <Link to="/products">
              <MenubarItem>All Products</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
