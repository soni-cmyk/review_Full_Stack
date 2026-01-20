import { useEffect, useState } from "react";
import AdminMainHeader from "../../components/admin/AdminMainHeader";
import { AdminTopBar } from "../../components/admin/AdminTopbar";
import CategoriesOrSubcategories from "./categoriesOrSubcategories/CategoriesOrSubcategories";
import AddEditCategoriesModal from "./categoriesOrSubcategories/categories/AddEditCategoriesModal";
import AddEditSubCategoriesModal from "./categoriesOrSubcategories/subcategories/AddEditSubCategories";
import Swal from "sweetalert2";
import axios from "../../api/axios";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch categories
  const fetchCategories = async () => {
    const res = await axios.get("/categories");
    setCategories(res.data);
  };

  //  fetch subcategories
  const fetchSubCategories = async () => {
    const res = await axios.get("/subcategories/all");
    setSubcategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // =======================
  // CATEGORY SAVE
  // =======================
  const handleSaveCategory = async (category) => {
    try {
      setLoading(true);

      if (category._id) {
        await axios.put(`/categories/${category._id}`, category);
        Swal.fire("Updated!", "Category updated successfully", "success");
      } else {
        await axios.post("/categories", category);
        Swal.fire("Created!", "Category created successfully", "success");
      }

      await fetchCategories();
      setActiveModal(null);
      setSelectedCategory(null);
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // SUBCATEGORY SAVE
  // =======================
  const handleSaveSubCategory = async (payload) => {
    console.log(selectedSubCategory?._id, "===== subcategory id");

    try {
      setLoading(true);

      if (selectedSubCategory?._id) {
        //  UPDATE subcategory
        await axios.put(
          `/categories/${selectedSubCategory.parentCategory?._id}/subcategory/${selectedSubCategory._id}`,
          payload,
        );

        Swal.fire("Updated!", "Subcategory updated successfully", "success");
      } else {
        //  CREATE subcategory
        await axios.post(
          `/categories/${payload.categoryId}/subcategory`,
          payload,
        );

        Swal.fire("Created!", "Subcategory created successfully", "success");
      }

      await fetchSubCategories();
      setActiveModal(null);
      setSelectedSubCategory(null);
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };
  // =======================
  // OPEN MODALS
  // =======================
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setActiveModal("category");
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setActiveModal("category");
  };

  const handleAddSubCategory = () => {
    setSelectedSubCategory(null);
    setActiveModal("subcategory");
  };

  const handleEditSubCategory = (sub) => {
    setSelectedSubCategory(sub);
    setActiveModal("subcategory");
  };

  return (
    <div>
      <AdminTopBar title="Categories & Subcategories" />

      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Organize your products with categories" />
        <div className="flex gap-2">
          <button
            onClick={handleAddCategory}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            + New Category
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleAddSubCategory}
          >
            + New Subcategory
          </button>
        </div>
      </div>

      <CategoriesOrSubcategories
        categories={categories}
        subcategories={subcategories}
        onEditCategories={handleEditCategory}
        onEditSubCategories={handleEditSubCategory}
        refresh={fetchCategories}
        refreshSubCategories={fetchSubCategories}
      />

      {/* CATEGORY MODAL */}
      <AddEditCategoriesModal
        isOpen={activeModal === "category"}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveCategory}
        category={selectedCategory}
        loading={loading}
      />

      {/* SUBCATEGORY MODAL */}
      <AddEditSubCategoriesModal
        isOpen={activeModal === "subcategory"}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveSubCategory}
        subCategory={selectedSubCategory}
        allCategories={categories}
        loading={loading}
      />
    </div>
  );
};

export default AdminCategory;
