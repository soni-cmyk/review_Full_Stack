import { useState, useEffect } from "react";
import axios, { BASE_URL } from "../../api/axios";
import Swal from "sweetalert2";

export default function BannerUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [banners, setBanners] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const res = await axios.get("/banners");
    setBanners(res.data.data || res.data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadBanner = async () => {
    if (!image) return alert("Select an image first");
    if (!title.trim()) return alert("Title is required");

    const formData = new FormData();

    //  must match your multer field name
    formData.append("image", image);
    //  other schema fields
    formData.append("title", title);
    formData.append("link", link);
    formData.append("isActive", isActive);

    await axios.post("/banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire("Success", "Banner uploaded successfully", "success");
    setImage(null);
    setPreview("");
    setTitle("");
    setLink("");
    setIsActive(true);
    fetchBanners();
  };

  const deleteBanner = async (id) => {
    await axios.delete(`/banners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBanners();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 ">
      <div className="bg-white rounded-2xl shadow">
        <h2 className="text-xl font-bold p-6 border-b border-gray-200">Banner Management</h2>
        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow p-6  space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Banner Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2"
              placeholder="Summer Sale | 50% Off"
              required
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Redirect Link (optional)
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2"
              placeholder="https://example.com/product"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm font-medium">Show banner on website</span>
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-200 rounded-lg cursor-pointer p-2"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="font-medium">Preview</p>
              <img
                src={preview}
                alt="preview"
                className="w-full max-w-md rounded-xl shadow mt-2"
              />
            </div>
          )}

          <button
            onClick={uploadBanner}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Upload Banner
          </button>
        </div>
      </div>
      {/* Existing Banners */}
      
      <h3 className="text-xl font-bold p-6 border-b border-gray-200">Existing Banners</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow p-3 border border-gray-200 space-y-2"
          >
            <img
              src={BASE_URL + b?.imageUrl}
              alt="banner"
              className="rounded-xl shadow w-full h-40 object-cover"
            />
            <p className="font-semibold">{b.title}</p>
            {b.link && (
              <a
                href={b.link}
                target="_blank"
                className="text-sm text-blue-600 underline"
              >
                Open Link
              </a>
            )}

            <p
              className={`text-xs font-medium ${
                b.isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              {b.isActive ? "Active" : "Inactive"}
            </p>

            <button
              onClick={() => deleteBanner(b._id)}
              className="w-full mt-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
