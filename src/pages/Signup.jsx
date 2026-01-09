import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      navigate(role === "admin" ? "/admin/products" : "/products", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Passwords do not match",
      });
      return;
    }
    try {
      const res = await axios.post("/users/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });
      const { token, role, userId } = res.data?.user;
      console.log(token, role, userId)
      // Store auth info
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      Swal.fire({
        title: "Account Created Successfully",
        text: "You can now login with your credentials",
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
        title: "Signup Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-center justify-center bg-gray-100 px-4 py-20"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mobile Number
          </label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            type="number"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
        >
          Create Account
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
