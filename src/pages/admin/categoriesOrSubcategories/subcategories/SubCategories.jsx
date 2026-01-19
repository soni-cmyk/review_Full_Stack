import React, { useEffect } from "react";
import AdminTable from "../../../../components/admin/AdminTable";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "../../../../api/axios";
import { FolderOpen } from "lucide-react";
import Swal from "sweetalert2";

export default function SubCategories({
  subcategories,
  onEditSubCategories,
  refreshSubCategories,
}) {
  const [loading, setLoading] = useState(false);

  const deleteProduct = ({ categoryId, subcategoryId }) => {
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
          axios
            .delete(`/categories/${categoryId}/subcategory/${subcategoryId}`)
            .then(() => {
              refreshSubCategories();
              Swal.fire("Deleted!", "Subcategory has been deleted.", "success");
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AdminTable
        loading={loading}
        data={subcategories}
        emptyText="No subcategories found"
        columns={["Name", "Subcategories", "Actions"]}
        renderRow={(p) => (
          <tr key={p._id} className="border-b border-gray-200 bg-white hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">
              <div className="flex items-center gap-2">
                <FolderOpen />
                {p.name > 20 ? p.name.substring(0, 10) + "..." : p.name}
              </div>
            </td>
            <td className="px-6 py-4">
              <button className="border border-gray-300 px-3 py-1 rounded-full text-sm">
                {p.parentCategory?.name || "-"}
              </button>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-4">
                <Pencil size={18} onClick={() => onEditSubCategories(p)} />
                <button
                  onClick={() =>
                    deleteProduct({
                      categoryId: p?.parentCategory?._id,
                      subcategoryId: p._id,
                    })
                  }
                >
                  <Trash2 size={18} color="red" />
                </button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
