// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
}
