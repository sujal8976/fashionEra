import Header from "@/Components/DashboardHeader";
import StatCard from "@/Components/StatCard";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  IndianRupee,
  Package,
  TrendingUp,
} from "lucide-react";
import ProductsTable from "../Products/ProductsTable";
import CategoryDistributionChart from "../Overview/CategoryDistributionChart";
import SalesTrendChart from "../Products/SalesTrendChart";

export default function AdminProducts() {
  return (
    <>
      <div className="flex-1 overflow-auto relative">
        <Header title="Products" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Sales"
              icon={Package}
              value={1234}
              color="#6366f1"
            />
            <StatCard
              name="New Users"
              icon={TrendingUp}
              value={89}
              color="#10b981"
            />
            <StatCard
              name="Total Products"
              icon={AlertTriangle}
              value={23}
              color="#f59e0b"
            />
            <StatCard
              name="Conversion Rate"
              icon={IndianRupee}
              value=" ₹2,000,100"
              color="#ef4444"
            />
          </motion.div>

          {/* <ProductsTable/> */}
          <ProductsTable />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesTrendChart />
            <CategoryDistributionChart />
          </div>
        </main>
      </div>
    </>
  );
}
