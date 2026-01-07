import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const SUPPLIERS = ["SUP1", "SUP2", "SUP3"];

export default function AddProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEdit = Boolean(productId);

  const [data, setData] = useState({
    name: "",
    desc: "",
    sku: "",
    supplierId: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch product (edit mode)
  useEffect(() => {
    if (isEdit) {
      axios.get(`/products/${productId}`).then((res) => {
        setData({
          name: res.data.name,
          desc: res.data.desc,
          sku: res.data.sku,
          supplierId: res.data.supplierId,
        });
        if (res.data.image?.url) {
          setPreview(`http://localhost:5000${res.data.image.url}`);
        }
      });
    }
  }, [isEdit, productId]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Only image files are allowed" });
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.sku.trim()) newErrors.sku = "SKU is required";
    if (!data.supplierId) newErrors.supplierId = "Supplier is required";
    if (!isEdit && !imageFile) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("sku", data.sku);
      formData.append("supplierId", data.supplierId);
      if (imageFile) formData.append("image", imageFile);
      if (isEdit) {
        await axios.put(`/products/${productId}`, formData);
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post("/products", formData);
        await Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Product added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      navigate("/admin/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>

        {/* Product Name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name *
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="desc"
          value={data.desc}
          onChange={handleChange}
        />

        {/* SKU */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SKU *
        </label>
        <input
          className={`w-full rounded-lg border px-3 py-2 mb-1 focus:outline-none ${
            isEdit
              ? "bg-gray-100 cursor-not-allowed border-gray-300"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
          name="sku"
          value={data.sku}
          onChange={handleChange}
          disabled={isEdit}
        />
          <p className="text-red-500 text-sm mb-3">{errors.sku}</p>

        {/* Image Upload */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image *
        </label>

        <div className="flex items-center gap-4 mb-1 bg-gray-100 rounded-md">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer inline-flex items-center justify-center rounded-tl-lg rounded-bl-lg   bg-gray-300 px-4 py-2 text-sm font-medium  "
          >
            Upload Image
          </label>
          {imageFile && (
            <span className="text-sm text-gray-600 truncate max-w-[180px]">
              {imageFile.name}
            </span>
          )}
        </div>
          <p className="text-red-500 text-sm mb-3">{errors.image}</p>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full object-cover rounded-lg border border-gray-300 mb-4"
          />
        )}
        {/* Supplier */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier *
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="supplierId"
          value={data.supplierId}
          onChange={handleChange}
        >
          <option value="">Select Supplier</option>
          {SUPPLIERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.supplierId && (
          <p className="text-red-500 text-sm mb-4">{errors.supplierId}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {isEdit && (
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="flex-1 rounded-lg bg-red-500 py-2 text-white font-medium hover:bg-red-600 transition"
            >
              Cancel
            </button>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className={`flex-1 rounded-lg py-2 font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
