import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import AdminTopbar from "../../../components/admin/AdminTopbar";
import AdminTable from "../../../components/admin/AdminTable";
import { confirmDelete } from "../../../utils/confirmDelete";
import { NotepadText } from "lucide-react";
import AdminMainHeader from "../../../components/admin/AdminMainHeader";

export default function TemplateList() {
  const [template, settemplate] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchtemplate = async () => {
    try {
      const res = await axios.get("/templates");
      settemplate(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = await confirmDelete({
      text: "This product will be permanently deleted!",
    });

    if (!confirmed) return;

    await axios.delete(`/templates/${id}`);
    Swal.fire("Deleted!", "Product deleted successfully", "success");
    fetchtemplate();
  };

  useEffect(() => {
    fetchtemplate();
  }, []);

  return (
    <div>
      <AdminTopbar title={"Pages"} />
      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Manage your website pages content" />
        <Link
          to="/admin/add-template"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Page
        </Link>
      </div>
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
          <AdminTable
            loading={loading}
            data={template}
            emptyText="No template found"
            columns={["Page Name", "Last Updated", "Actions"]}
            renderRow={(p) => (
              <tr
                key={p._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/template/${p.slug}`}>
                      <NotepadText size={18} />
                    </Link>
                    {p.title > 20 ? p.title.substring(0, 10) + "..." : p.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {p.updatedAt ? p.updatedAt?.slice(0, 10) : "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link to={`/admin/add-template/${p.slug}`}>
                      <Pencil size={18} />
                    </Link>
                    <button onClick={() => deleteProduct(p.slug)}>
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
