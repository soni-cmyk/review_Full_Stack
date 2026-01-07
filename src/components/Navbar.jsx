import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReview } from "../context/ReviewContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const { fakeReviewCount } = useReview();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };


  return (
    <div className="bg-gray-900" >
    <nav className="w-full max-w-7xl mx-auto text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to={role === "admin" ? "/admin/products" : "/products"} className="text-2xl font-semibold hover:underline transition">
        MyShop</Link>
      {/* Menu */}
      <ul className="flex items-center gap-6 text-sm font-medium">
        {/* Admin Links */}
        {role === "admin" && (
          <>
            <li>
              <Link
                to="/admin/products"
                className="hover:text-yellow-400 transition"
              >
                 Products
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/admin/reviews"
                className="hover:text-yellow-400 transition flex items-center gap-2"
              >
                Fake Reviews
                  {fakeReviewCount > 0 &&
                  <span className="bg-red-500 text-white absolute -top-[10px] -right-[10px] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {fakeReviewCount}
                  </span>
                  }
              </Link>
            </li>
          </>
        )}

        {/* User Links */}
        {role === "user" && (
          <>
            <li>
              <Link to="/products" className="hover:text-yellow-400 transition">
                Products
              </Link>
            </li>
          </>
        )}

        {/* Auth Buttons */}
        {role ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md transition"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav></div>
  );
};

export default Navbar;
