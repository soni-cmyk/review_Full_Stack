import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AdminTopBar } from "../../components/admin/AdminTopbar";
import AddCancelButton from "../../components/admin/buttons/AddCancelButton";
import AdminUploadFile from "../../components/admin/AdminUploadFile";

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
    categoryId: "",
    subCategoryIds: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/subcategories/all");
    setSubCategories(res.data);
  };

  const fetchCategory = async () => {
    const res = await axios.get("/categories");
    setCategory(res.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetch();
  }, [category]);

  // Fetch product (edit mode)
  useEffect(() => {
    if (isEdit) {
      axios.get(`/products/${productId}`).then((res) => {
        setData({
          name: res.data.name,
          desc: res.data.desc,
          sku: res.data.sku,
          supplierId: res.data.supplierId,
          categoryId: res.data.categoryId || "",
          subCategoryIds: res.data.subCategoryIds || "",
        });
        if (res.data.image?.url) {
          setPreview(`${res.data.image.url}`);
        }
      });
    }
  }, [isEdit, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // reset subcategories if category changes
    if (name === "categoryId") {
      setData({ ...data, categoryId: value, subCategoryIds: [] });
      setErrors({ ...errors, categoryId: "", subCategoryIds: "" });
      return;
    }

    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value,
    );

    setData({ ...data, subCategoryIds: selected });
    setErrors({ ...errors, subCategoryIds: "" });
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
    if (!data.categoryId) newErrors.categoryId = "Category is required";
    if (data.subCategoryIds.length === 0)
      newErrors.subCategoryIds = "Select at least one subcategory";
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
      formData.append("categoryId", data.categoryId?._id);
      formData.append("subCategoryIds", data.subCategoryIds);
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

  const handleCancel = () => navigate("/admin/products");

  return (
    <div>
      <AdminTopBar title={isEdit ? "Edit Product" : "Add Product"} />
      <div className="bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <p className="text-red-500 text-sm">{errors.name}</p>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU *
              </label>
              <input
                className={`w-full rounded-lg border px-3 py-2 mb-1 ${
                  isEdit
                    ? "bg-gray-100 cursor-not-allowed border-gray-300"
                    : "border-gray-300"
                }`}
                name="sku"
                value={data.sku}
                onChange={handleChange}
                disabled={isEdit}
              />
              <p className="text-red-500 text-sm">{errors.sku}</p>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1"
                name="desc"
                value={data.desc}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1 focus:outline-none"
                name="categoryId"
                value={data.categoryId}
                onChange={handleChange}
              >
                <option value="" style={{ display: "none" }}>
                  Select Category
                </option>
                {category.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm">{errors.categoryId}</p>
            </div>

            {/* Subcategories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategories *
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1 focus:outline-none"
                value={data.subCategoryIds}
                onChange={handleSubCategoryChange}
                disabled={!data.categoryId}
              >
                <option value="" style={{ display: "none" }}>
                  Select Subcategory
                </option>
                {subCategories
                  .filter((sc) => {
                    return sc?.parentCategory?._id === data.categoryId;
                  })
                  .map((sc) => (
                    <option key={sc._id} value={sc._id}>
                      {sc.name}
                    </option>
                  ))}
              </select>
              <p className="text-red-500 text-sm">{errors.subCategoryIds}</p>
            </div>

            {/* Supplier */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier *
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mb-1"
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
              <p className="text-red-500 text-sm">{errors.supplierId}</p>
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image *
              </label>

              <AdminUploadFile
                file={imageFile}
                handleFileChange={handleImageChange}
                preview={preview}
              />
              <p className="text-red-500 text-sm">{errors.image}</p>
            </div>
          </div>

          {/* Buttons */}
          <AddCancelButton
            onClose={handleCancel}
            loading={loading}
            cancelBtnText="Cancel"
            saveBtnText={isEdit ? "Update Product" : "Add Product"}
            onSubmit={submit}
          />
        </div>
      </div>
    </div>
  );
}
