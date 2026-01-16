import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Swal from "sweetalert2";

export default function AddEditBanner({
  editBannerId,
  setEditBannerId,
  setAddBanner,
  singleBannerData,
  setSingleBannerData,
}) {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    link: "",
    isActive: true,
  });

  // Fetch banner for edit
  useEffect(() => {
    if (editBannerId) {
      setBannerForm({
        title: singleBannerData.title || "",
        description: singleBannerData.description || "",
        buttonText: singleBannerData.buttonText || "",
        buttonLink: singleBannerData.buttonLink || "",
        link: singleBannerData.link || "",
        isActive: singleBannerData.isActive,
      });
      setPreview(singleBannerData.imageUrl || "");
    } else {
      resetForm();
      setSingleBannerData({});
    }
  }, [editBannerId, token]);

  // Handle file select & preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit create or update
  const submitBanner = async () => {
    if (!bannerForm.title.trim()) {
      return Swal.fire("Error", "Title is required", "error");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      Object.entries(bannerForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const url = editBannerId ? `/banners/${editBannerId}` : "/banners";
      const method = editBannerId ? "put" : "post";

      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire(
        "Success",
        `Banner ${editBannerId ? "updated" : "created"} successfully`,
        "success"
      );

      resetForm();
      setEditBannerId(null);
      setAddBanner(false);
    } catch (error) {
      Swal.fire("Error", "Failed to save banner", "error");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
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
  };

  const handleCancel = () => {
    resetForm();
    setEditBannerId(null);
    setAddBanner(false);
  };
   
  return (
    <div className="flex justify-center items-center">
      <div className="p-6 w-full max-w-xl space-y-4 bg-white rounded-lg shadow m-6">
        <h2 className="text-2xl font-bold mb-4">
          {editBannerId ? "Edit Banner" : "Add New Banner"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Banner Title *"
          value={bannerForm.title}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg p-2"
          disabled={loading}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={bannerForm.description}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg p-2"
          disabled={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="buttonText"
            placeholder="Button Text"
            value={bannerForm.buttonText}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2"
            disabled={loading}
          />
          <input
            type="text"
            name="buttonLink"
            placeholder="Button Link"
            value={bannerForm.buttonLink}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2"
            disabled={loading}
          />
        </div>

        <input
          type="text"
          name="link"
          placeholder="Redirect Link"
          value={bannerForm.link}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg p-2"
          disabled={loading}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={bannerForm.isActive}
            onChange={handleChange}
            disabled={loading}
          />
          <span className="text-sm">Show banner on website</span>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="max-w-md rounded-lg border border-gray-200"
          />
        )}

        <div className="flex gap-4 w-full">
          <button
            onClick={() => handleCancel()}
            disabled={loading}
            className={`bg-red-600 w-1/2 hover:bg-red-700 text-white px-6 py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancel
          </button>

          <button
            onClick={submitBanner}
            disabled={loading}
            className={`bg-blue-600 w-1/2 hover:bg-blue-700 text-white px-6 py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {editBannerId ? "Update Banner" : "Upload Banner"}
          </button>
        </div>
      </div>
    </div>
  );
}
