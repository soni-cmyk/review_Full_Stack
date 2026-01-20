import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useReview } from "../../context/ReviewContext";
import Swal from "sweetalert2";
import AdminTable from "../../components/admin/AdminTable";
import { confirmDelete } from "../../utils/confirmDelete";
import { AdminTopBar } from "../../components/admin/AdminTopbar";
import AdminMainHeader from "../../components/admin/AdminMainHeader";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchFakeReviewCount } = useReview();

  const fetchFakeReviews = async () => {
    try {
      const res = await axios.get("/admin/fake-reviews");
      setReviews(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    const confirmed = await confirmDelete({
      text: "This fake review will be permanently deleted!",
    });

    if (!confirmed) return;

    await axios.delete(`/reviews/${id}`);
    Swal.fire("Deleted!", "Review deleted successfully", "success");

    fetchFakeReviews();
    fetchFakeReviewCount();
  };

  useEffect(() => {
    fetchFakeReviews();
  }, []);

  return (
    <div>
      <AdminTopBar title="Fake Review Management" />
      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Manage your fake reviews" />
      </div>
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">

          <AdminTable
            loading={loading}
            data={reviews}
            emptyText="No fake reviews found"
            columns={[
              "Sr No",
              "Review",
              "Rating",
              "Product",
              "User",
              "IP",
              "Status",
              "Action",
            ]}
            renderRow={(r, idx) => (
              <tr
                key={r._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4 truncate max-w-xs">{r.review}</td>
                <td className="px-6 py-4">{r.rating}</td>
                <td className="px-6 py-4">{r.productId?.name}</td>
                <td className="px-6 py-4">{r.userId?.email}</td>
                <td className="px-6 py-4 text-xs font-mono">{r.ipAddress}</td>
                <td className="px-6 py-4 ">
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                    FAKE
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteReview(r._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          />
        </div>
      </div>{" "}
    </div>
  );
}
