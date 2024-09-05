import { ordersCol } from "./columns";
import { DataTable } from "./data-table";
import { ordersData, orderD2 } from "@/utils/order.js";

export default function Orders() {
  return (
    <>
      <div className="orders container mx-auto py-10">
        <DataTable columns={ordersCol} data={ordersData} />
      </div>
    </>
  );
}
