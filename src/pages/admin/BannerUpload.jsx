import { useState, useEffect } from "react";
import axios, { BASE_URL } from "../../api/axios";
import AdminTable from "../../components/AdminTable";
import Swal from "sweetalert2";

export default function BannerUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    link: "",
    isActive: true,
  });
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= FETCH ================= */
  const fetchBanners = async () => {
    try {
      const res = await axios.get("/banners");
      setBanners(res.data.data || res.data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= IMAGE ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= CREATE / UPDATE ================= */
  const submitBanner = async () => {
    if (!bannerForm.title.trim()) {
      return Swal.fire("Error", "Title is required", "error");
    }

    const formData = new FormData();
    if (image) formData.append("image", image);

    Object.entries(bannerForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = editingId ? `/banners/${editingId}` : "/banners";
    const method = editingId ? "put" : "post";

    await axios[method](url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire(
      "Success",
      `Banner ${editingId ? "updated" : "created"} successfully`,
      "success"
    );

    resetForm();
    fetchBanners();
  };

  /* ================= EDIT ================= */
  const editBanner = (banner) => {
    setEditingId(banner._id);
    setBannerForm({
      title: banner.title || "",
      description: banner.description || "",
      buttonText: banner.buttonText || "",
      buttonLink: banner.buttonLink || "",
      link: banner.link || "",
      isActive: banner.isActive,
    });
    setPreview(`${BASE_URL}${banner.imageUrl}`);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
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

  /* ================= TOGGLE ================= */
  const toggleBannerStatus = async (id, currentStatus) => {
    await axios.patch(
      `/banners/${id}/toggle`,
      { isActive: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBanners();
  };

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setImage(null);
    setPreview("");
    setBannerForm({
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      link: "",
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Banner Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
          >
            {showForm ? "Close Form" : "+ Add Banner"}
          </button>
        </div>

        {showForm && (
          <div className="p-6 space-y-4 border-b border-gray-200">
            <input
              type="text"
              name="title"
              placeholder="Banner Title *"
              value={bannerForm.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={bannerForm.description}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="buttonText"
                placeholder="Button Text"
                value={bannerForm.buttonText}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-2"
              />
              <input
                type="text"
                name="buttonLink"
                placeholder="Button Link"
                value={bannerForm.buttonLink}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-2"
              />
            </div>

            <input
              type="text"
              name="link"
              placeholder="Redirect Link"
              value={bannerForm.link}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={bannerForm.isActive}
                onChange={handleChange}
              />
              <span className="text-sm">Show banner on website</span>
            </div>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-w-md rounded-lg border border-gray-200"
              />
            )}

            <button
              onClick={submitBanner}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {editingId ? "Update Banner" : "Upload Banner"}
            </button>
          </div>
        )}

        {/* TABLE unchanged */}
        <div className="overflow-x-auto rounded-b-lg">
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
                <td className="px-6 py-4">
                  <img
                    src={`${BASE_URL}${banner.imageUrl}`}
                    className="h-10 object-cover rounded"
                    alt={banner.title}
                  />
                </td>
                <td className="px-6 py-4 font-medium truncate max-w-3xs">{banner.title}</td>
                <td className="px-6 py-4 truncate max-w-3xs">
                  {banner.description || "-"}
                </td>
                <td className="px-6 py-4">{banner.buttonText || "-"}</td>
                <td className="px-6 py-4 truncate max-w-3xs">
                  {banner.buttonLink || banner.link || "-"}
                </td>
                <td className="px-6 py-4">
                  {banner.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-gray-400">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                  <button
                    onClick={() => editBanner(banner)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      toggleBannerStatus(banner._id, banner.isActive)
                    }
                    className={`px-3 py-1.5 rounded text-xs text-white ${
                      banner.isActive
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {banner.isActive ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => deleteBanner(banner._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs"
                  >
                    Delete
                  </button></div>
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
}
