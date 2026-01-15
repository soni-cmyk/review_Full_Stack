import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReview } from "../context/ReviewContext";
import { Menu, X } from "lucide-react";
import axios, { BASE_URL } from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { fakeReviewCount } = useReview();
  const [logo, setLogo] = useState(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    fetchLogo();
    fetchPages();
  }, []);

  const fetchLogo = async () => {
    const res = await axios.get("/logos");
    const activeLogo = res.data.find((l) => l.isActive === true);
    setLogo(activeLogo || null);
  };

  const fetchPages = async () => {
    try {
      const res = await axios.get("/templates");
      setPages(res.data);
    } catch (err) {
      console.error("Failed to load pages");
    }
  };

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
          onClick={() => setMenuOpen(false)}
        >
          {logo ? (
            <img
              src={BASE_URL + logo.logoUrl}
              alt="Logo"
              className="h-8 object-contain"
            />
          ) : (
            <span className="text-2xl font-semibold">My App</span>
          )}
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden"
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
              <li><Link to="/admin/products">Products</Link></li>
              <li><Link to="/admin/banner-upload">Banner Upload</Link></li>
              <li className="relative">
                <Link to="/admin/reviews" className="flex gap-2">
                  Fake Reviews
                  {fakeReviewCount > 0 && (
                    <span className="bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {fakeReviewCount}
                    </span>
                  )}
                </Link>
              </li>
              <li><Link to="/admin/template">Page Editor</Link></li>
              <li><Link to="/admin/settings">Settings</Link></li>
            </>
          )}

          {/* User Links (DYNAMIC) */}
          {role === "user" && (
            <>
              <li>
                <Link to="/products">Products</Link>
              </li>

              {pages.map((page) => (
                <li key={page._id}>
                  <Link
                    to={`/template/${page.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-yellow-400 transition"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </>
          )}

          {/* Auth */}
          {role ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1.5 rounded-md"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/"
                className="bg-blue-500 px-4 py-1.5 rounded-md"
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
