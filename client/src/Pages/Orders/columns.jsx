import { Ellipsis } from "lucide-react";

export const ordersCol = [
  {
    accessorKey: "_id",
    header: <div className="text-foreground">ORDER ID</div>,
  },
  {
    accessorKey: "orders",
    header: <div className="text-foreground">ORDERS</div>,
  },
  {
    accessorKey: "date",
    header: <div className="text-foreground">DATE</div>,
  },
  {
    accessorKey: "items",
    header: <div className="text-foreground">ITEMS</div>,
  },
  {
    accessorKey: "totalPrice",
    header: <div className="text-right text-foreground">TOTAL</div>,
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(totalPrice);

      return <div className="text-right font-normal">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: <div className="text-foreground">STATUS</div>,
  },
];
