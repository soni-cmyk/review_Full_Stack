import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AdminTable from "../../components/admin/AdminTable";
import { confirmDelete } from "../../utils/confirmDelete";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { Pencil, Trash2 } from "lucide-react";
import AdminMainHeader from "../../components/admin/AdminMainHeader";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = await confirmDelete({
      text: "This product will be permanently deleted!",
    });

    if (!confirmed) return;

    await axios.delete(`/products/${id}`);
    Swal.fire("Deleted!", "Product deleted successfully", "success");
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <AdminTopbar title={"Products"} />
      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Manage your Product Inventory" />
        <Link
          to="/admin/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
          <AdminTable
            loading={loading}
            data={products}
            emptyText="No products found"
            columns={[
              "Image",
              "Name",
              "SKU",
              "Supplier",
              "Description",
              "Rating",
              "Actions",
            ]}
            renderRow={(p) => (
              <tr
                key={p._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={`${p.image.url}`}
                    className="h-12 w-12 object-contain"
                  />
                </td>
                <td className="px-6 py-4 font-medium">
                  {p.name > 20 ? p.name.substring(0, 10) + "..." : p.name}
                </td>
                <td className="px-6 py-4">{p.sku}</td>
                <td className="px-6 py-4">{p.supplierId}</td>
                <td className="px-6 py-4 truncate max-w-xs">
                  {p.desc ? p.desc.substring(0, 10) + "..." : "-"}
                </td>
                <td className="px-6 py-4">{p.averageRating}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link to={`/admin/add-product/${p._id}`}>
                      <Pencil size={18} />
                    </Link>
                    <button onClick={() => deleteProduct(p._id)}>
                      <Trash2 size={18} color="red" />
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
