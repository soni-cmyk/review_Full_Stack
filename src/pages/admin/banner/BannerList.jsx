import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import AdminTable from "../../../components/admin/AdminTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Pencil, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import AdminMainHeader from "../../../components/admin/AdminMainHeader";

export default function BannerList({
  addBanner,
  setAddBanner,
  editBannerId,
  setEditBannerId,
  singleBannerData,
  setSingleBannerData,
}) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("/banners");
      setBanners(res.data.data || res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    const res = await Swal.fire({
      title: "Delete banner?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!res.isConfirmed) return;

    await axios.delete(`/banners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire("Deleted", "Banner removed", "success");
    fetchBanners();
  };

  const toggleBannerStatus = async (id, status) => {
    await axios.patch(
      `/banners/${id}/toggle`,
      { isActive: !status },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchBanners();
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Manage Banners" />
        <button
          onClick={() => setAddBanner(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Banner
        </button>
      </div>
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg shadow">
          <AdminTable
            loading={loading}
            data={banners}
            emptyText="No banners found"
            columns={[
              "Image",
              "Title",
              "Description",
              "Button",
              "Link",
              "Status",
              "Actions",
            ]}
            renderRow={(banner) => (
              <tr
                key={banner._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-3 py-3">
                  <img
                    src={banner.imageUrl}
                    className="h-8 rounded object-cover w-10"
                    alt=""
                  />
                </td>
                <td className="px-3 py-3 font-medium truncate max-w-xs">
                  {banner.title
                    ? banner.title?.substring(0, 20) + "..."
                    : banner.title || "-"}
                </td>
                <td className="px-3 py-3 truncate max-w-xs">
                  {banner.description
                    ? banner.description?.substring(0, 20) + "..."
                    : banner.description || "-"}
                </td>
                <td className="px-3 py-3">{banner.buttonText || "-"}</td>
                <td className="px-3 py-3 truncate max-w-xs">
                  {banner.buttonLink
                    ? banner.buttonLink?.substring(0, 20) + "..."
                    : banner.buttonLink || banner.link || "-"}
                </td>
                <td className="px-3 py-3">
                  {banner.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-gray-400">Inactive</span>
                  )}
                </td>
                <td className="px-3 py-3 ">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setEditBannerId(banner._id);
                        setSingleBannerData(banner);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() =>
                        toggleBannerStatus(banner._id, banner.isActive)
                      }
                    >
                      {banner.isActive ? (
                        <ToggleRight size={18}  />
                      ) : (
                        <ToggleLeft size={18}  />
                      )}
                    </button>
                    <button onClick={() => deleteBanner(banner._id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
}
