import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";

export default function Reviews() {
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await axios.post("/reviews", {
        productId,
        rating,
        review,
      });
      await Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your review has been submitted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setReview("");
      setRating(0);
      navigate("/products/" + productId);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.response?.data?.message || "Failed to submit review",
      });
    }
  };

  const goBack = () => {
    navigate("/products/" + productId);
  };

  return (
    <div className="flex items-center justify-center p-6 text-left">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Write a Review
        </h2>
        {/* Review Text */}
        <textarea
          className="border border-gray-300 rounded-md w-full p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="4"
          placeholder="Share your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {/* Rating */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1 font-medium">
            Rating (0 - 5)
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="focus:outline-none"
              >
                <span
                  className={`text-2xl transition
          ${num <= rating ? "text-yellow-400" : "text-gray-300"}
        `}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={goBack}
            type="button"
            className="w-1/2 border border-gray-300 bg-gray-100 transition text-gray-700 font-medium p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            type="button"
            className="w-1/2 bg-green-600 hover:bg-green-700 transition text-white font-medium p-2 rounded-md"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
