// components/admin/Sidebar.jsx
import {
  ChartBarStacked,
  Image,
  LayoutDashboard,
  MessageSquareDiff,
  PackageSearch,
  NotepadText,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <h2 className="text-xl font-bold p-5 border-b border-gray-700 text-center">AdminPanel</h2>
      <nav className="space-y-2 p-4 text-md font-medium flex-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard /> Dashboard
        </NavLink> 
        <NavLink to="/admin/categories" className={linkClass}>
          <ChartBarStacked /> Categories
        </NavLink>
        <NavLink to="/admin/reviews" className={linkClass}>
          <MessageSquareDiff /> Fake Reviews
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          <PackageSearch /> Products
        </NavLink>
        <NavLink to="/admin/template" className={linkClass}>
          <NotepadText /> Pages
        </NavLink>
        <NavLink to="/admin/banner-upload" className={linkClass}>
          <Image /> Banners
        </NavLink>
        <NavLink to="/admin/settings" className={linkClass}>
          <Settings /> Settings
        </NavLink>
      </nav>

      <div className="mt-auto  text-white cursor-pointer border-t border-gray-700 flex items-center gap-2 p-5 hover:bg-gray-700">
        <button className="flex items-center text-md gap-2 w-full" onClick={handleLogout}>
        <LogOut /> Logout
       </button>
      </div>
    </aside>
  );
};

export default Sidebar;
