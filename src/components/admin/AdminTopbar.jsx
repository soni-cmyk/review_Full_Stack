import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const AdminTopBar = ({ title }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Admin Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            {user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        <ChevronDown size={18} />
        </button>
        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <Link to="/admin/dashboard">
              <button className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100">
                <User size={18} /> Profile
              </button>
            </Link>
            <Link to="/admin/settings">
              <button className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100">
                <Settings size={18} /> Settings
              </button>
            </Link>
            <button className="w-full px-4 py-2 border-t border-gray-300 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50"
              onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

