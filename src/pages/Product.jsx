import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data) , setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Products
      </h2>
       {loading && (
          <div className="p-6 text-center text-gray-600">
            Loading products...
          </div>
        )}
      {!loading && products.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {products.map((p) => (
          <Link to={`/products/${p._id}`}>
            <div
              key={p._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={"http://localhost:5000" + p.image.url}
                alt={p.name}
                className="h-48 w-full object-contain"
              />

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  {/* Stars */}
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          p.averageRating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.176 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>

                  {/* Rating number */}
                  <span className="text-sm font-medium text-gray-700">
                    {p.averageRating?.toFixed(1) || "0.0"}
                  </span>

                  {/* Review count */}
                  <span className="text-xs text-gray-500">
                    ({p.totalReviews || 0} reviews)
                  </span>
                </div>

                <span className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  View Products →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>)}
       {!loading && products.length === 0 && (
          <div className="p-6 text-center text-gray-600">No products found</div>
        )}
    </div>
  );
}
