// components/admin/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-slate-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">AdminPanel</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/admin/reviews" className={linkClass}>
          Reviews
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/template" className={linkClass}>
          Pages
        </NavLink>
        <NavLink to="/admin/banner-upload" className={linkClass}>
          Banners
        </NavLink>
        <NavLink to="/admin/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>

      <div className="mt-10 text-sm text-red-400 cursor-pointer">
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
