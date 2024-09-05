import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function FilterComponent() {
  const filterMenu = [
    {
      category: "Category",
      options: ["Tshirts", "Jeans", "Jacket", "Shirts", "more..."],
    },
    {
      category: "Price",
      options: ["min", "max"],
    },
    {
      category: "Brand",
      options: ["Gucci", "Nike", "Adidas", "more..."],
    },
  ];
  return (
    <>
      <div className="filterComponent w-60 flex flex-col">
        <div className="flex items-center justify-start pl-12 ">
          <h1 className="h-full text-2xl font-semibold text-black py-5">
            FILTERS
          </h1>
        </div>
        <hr className=" border border-solid" />
        <form className="flex flex-col">
          {filterMenu.map((menuItems, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{menuItems.category}</AccordionTrigger>
                {menuItems.options.map((option, ind) => (
                  <AccordionContent key={ind}>
                    <div className="flex items-center justify-start pl-5 gap-4">
                      <input type="checkbox" id={option} />
                      <label
                        htmlFor={option}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
          <div className="action-btns w-full flex items-center justify-around p-3">
            <Button variant="outline">Reset</Button>
            <Button>Apply</Button>
          </div>
        </form>
      </div>
    </>
  );
}
