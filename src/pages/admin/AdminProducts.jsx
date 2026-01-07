import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AdminTable from "../../components/AdminTable";
import { confirmDelete } from "../../utils/confirmDelete";

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
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Product Management</h2>
          <Link
            to="/admin/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Add Product
          </Link>
        </div>

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
                  src={`http://localhost:5000${p.image.url}`}
                  className="h-12 w-12 object-contain"
                />
              </td>
              <td className="px-6 py-4 font-medium">{p.name}</td>
              <td className="px-6 py-4">{p.sku}</td>
              <td className="px-6 py-4">{p.supplierId}</td>
              <td className="px-6 py-4 truncate max-w-xs">{p.desc}</td>
              <td className="px-6 py-4">{p.averageRating}</td>
              <td className="px-6 py-4 flex gap-2">
                <Link to={`/admin/add-product/${p._id}`}>
                  <button className="bg-yellow-500  text-white px-3 py-1.5 rounded text-xs">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
}

