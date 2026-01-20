import { useEffect, useState } from "react";
import AddCancelButton from "../../../../components/admin/buttons/AddCancelButton";

export default function AddEditSubCategoriesModal({
  isOpen,
  onClose,
  onSave,
  subCategory,
  allCategories,
  loading = false,
}) {
  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setName(subCategory?.name || "");
    }
  }, [subCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      categoryId: parentCategoryId,
      name: name.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          {subCategory?._id ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Parent Category
            </label>
            <select
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              required
              autoFocus
              placeholder="Enter category name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="" style={{ display: "none" }}>
                Select a parent category
              </option>
              {allCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sub Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              placeholder="Enter category name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <AddCancelButton
            onClose={onClose}
            loading={loading}
            cancelBtnText="Cancel"
            saveBtnText="Save"
          />
        </form>
      </div>
    </div>
  );
}
