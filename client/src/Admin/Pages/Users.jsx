import Header from "@/Components/DashboardHeader";
import StatCard from "@/Components/StatCard";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import UsersTable from "../Users/UsersTable";
import UsersDemographicsChart from "../Users/UsersDemographicsChart";
import UsersActivityHeatmap from "../Users/UsersActivityHeatmap";
import UsersGrowthChart from "../Users/UsersGrowthChart";

const USERS_STATS = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
}

export default function Users() {
  return (
    <div className="flex-1 overflow-auto relative">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={USERS_STATS.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={USERS_STATS.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={USERS_STATS.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={USERS_STATS.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <UsersTable />

        {/* Users Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UsersGrowthChart/>
          <UsersActivityHeatmap/>
          <UsersDemographicsChart/>
        </div>
      </main>
    </div>
  );
}
