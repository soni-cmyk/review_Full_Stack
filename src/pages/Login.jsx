import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "admin") {
        navigate("/admin/products", { replace: true });
      } else {
        navigate("/products", { replace: true });
      }
    }
  }, [navigate]);

    // Validation
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "* Email is required";
    if (!password) newErrors.password = "* Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });
      const { token, role, userId } = res.data;
      // Store auth info
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      Swal.fire({
        title: "Success!",
        text: "You have successfully logged in!",
        icon: "success",
      });
      // Role-based redirect after login
      if (role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/products");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password, please try again!",
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-center justify-center py-20 px-4  w-full"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="mb-4 text-left">
          <label className="block text-sm text-gray-600 mb-1" >Email <span className="text-red-500">*</span></label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer select-none"
          >
            {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium p-2 w-full rounded-md mt-2"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
