// pages/admin/AdminDashboard.jsx
import { Package, Layers, Boxes, Flame } from "lucide-react";
import HotProducts from "./dashboard/HotProducts";
import RecentlyAdded from "./dashboard/RecenltyAdded";
import AdminStatCard from "../../components/admin/AdminStatCard";
import { useEffect, useState } from "react";
import { AdminTopBar } from "../../components/admin/AdminTopbar";


const AdminDashboard = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

      setCurrentDate(now);
    };
    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AdminTopBar title="Dashboard" />
      <div className="space-y-6 p-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold">Welcome, Admin</h2>
          <p className="text-gray-500 mt-1">{currentDate}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AdminStatCard
            title="Total Products"
            value="156"
            icon={<Package />}
          />
          <AdminStatCard
            title="Total Categories"
            value="24"
            icon={<Layers />}
          />
          <AdminStatCard
            title="Total Subcategories"
            value="89"
            icon={<Boxes />}
          />
          <AdminStatCard title="Hot Products" value="12" icon={<Flame />} />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HotProducts />
          <RecentlyAdded />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
