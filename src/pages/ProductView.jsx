import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

export default function ProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewRes] = await Promise.all([
          axios.get(`/products/${productId}`),
          axios.get(`/reviews/${productId}`),
        ]);
        setProduct(productRes.data);
        const allReviews = reviewRes.data || [];
        // Filter out fake reviews
        const filteredReviews = allReviews.filter((review) => !review.isFake);
        setReviews(filteredReviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-3">
        {/* Product Card */}
        <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
            <img
              src={"http://localhost:5000" + product.image.url}
              alt={product.name}
              className="max-h-80 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed">
                {product.desc}
              </p>
              <div className="mt-5 space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-medium text-gray-700">SKU:</span>{" "}
                  {product.sku}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Supplier:</span>{" "}
                  {product.supplierId}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* Stars */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${
                        product?.averageRating >= star
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
                  {product?.averageRating?.toFixed(1) || "0.0"}
                </span>
                {/* Review count */}
                <span className="text-xs text-gray-500">
                  ({product?.totalReviews || 0} reviews)
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Link
                to={`/reviews/${product._id}`}
                className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Write Review
              </Link>

              <Link
                to="/products"
                className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow p-6 text-left">
          <h3 className="text-xl font-semibold text-gray-900">
            Customer Reviews
          </h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product.
            </p>
          ) : (
            <div className="space-y-2">
              {reviews.map((r) => (
                <div key={r._id} className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {r.userId?.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <p className="font-medium text-gray-800">
                        {r.userId?.email || "Anonymous"}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-yellow-500">
                      {r.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed lg:pl-12">
                    {r.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
