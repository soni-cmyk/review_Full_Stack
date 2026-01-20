import React, { useEffect } from "react";
import AdminTable from "../../../../components/admin/AdminTable";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "../../../../api/axios";
import { Folder } from "lucide-react";
import Swal from "sweetalert2";

export default function Categories({ categories, onEditCategories, refresh }) {
  const [loading, setLoading] = useState(false);

  const deleteProduct = (productId) => {
    // Implement product deletion logic here
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/categories/${productId}`).then(() => {
            refresh();
            Swal.fire("Deleted!", "Category has been deleted.", "success");
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (categoryId) => {
    onEditCategories(categoryId);
    setOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <AdminTable
        loading={loading}
        data={categories}
        emptyText="No categories found"
        columns={["Name", "Subcategories", "Actions"]}
        renderRow={(p) => (
          <tr
            key={p._id}
            className="border-b border-gray-200 hover:bg-gray-50 rounded-lg"
          >
            <td className="px-3 py-3 font-medium">
              <div className="flex items-center gap-2">
                <Folder size={18} />
                {p.name > 20 ? p.name.substring(0, 10) + "..." : p.name}
              </div>
            </td>
            <td className="px-3 py-3">
              <button className="border border-gray-300 px-3 py-1 rounded-full  text-xs">
                {p.subCategories?.length || 0}
              </button>
            </td>
            <td className="px-3 py-3">
              <div className="flex gap-4">
                <Pencil size={18} onClick={() => handleEdit(p)} className="cursor-pointer" />
                <button onClick={() => deleteProduct(p._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
