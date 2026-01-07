import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();
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
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1 text-left">
            Password
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
