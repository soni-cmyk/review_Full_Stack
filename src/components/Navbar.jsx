import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReview } from "../context/ReviewContext";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
  };

  return (
    <div className="bg-gray-900">
      <nav className="w-full max-w-7xl mx-auto text-white px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={role === "admin" ? "/admin/products" : "/products"}
          className="text-2xl font-semibold hover:underline transition"
        >
          ShopEasy
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <ul
          className={`md:flex items-center gap-6 text-sm font-medium
          absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent
          transition-all duration-300
          ${menuOpen ? "block" : "hidden"} md:block`}
        >
          {/* Admin Links */}
          {role === "admin" && (
            <>
              <li className="px-6 py-2 md:p-0">
                <Link
                  to="/admin/products"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400 transition"
                >
                  Products
                </Link>
              </li>

              <li className="px-6 py-2 md:p-0">
                <Link
                  to="/admin/banner-upload"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400 transition"
                >
                  Banner Upload
                </Link>
              </li>

              <li className="relative px-6 py-2 md:p-0">
                <Link
                  to="/admin/reviews"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400 transition flex items-center gap-2"
                >
                  Fake Reviews
                  {fakeReviewCount > 0 && (
                    <span className="bg-red-500 text-white absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {fakeReviewCount}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}

          {/* User Links */}
          {role === "user" && (
            <li className="px-6 py-2 md:p-0">
              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400 transition"
              >
                Products
              </Link>
            </li>
          )}

          {/* Auth Buttons */}
          {role ? (
            <li className="px-6 py-2 md:p-0">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md transition w-full md:w-auto"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="px-6 py-2 md:p-0">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md transition block text-center"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
