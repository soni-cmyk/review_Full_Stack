import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import { MoveLeft } from "lucide-react";

export default function ViewTemplate() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/templates/${slug}`);
      setPage(response.data);
      if (!response.data) {
        navigate("/404", { replace: true });
      }
    } catch (err) {
      // redirect to 404 if page not found
      if (err.response?.status === 404) {
        navigate("/404", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center text-gray-500">
        Loading page...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{page?.title}</h1>

      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: page?.content || "" }}
      />
      <Link to="/admin/template" className="text-blue-600 hover:underline mt-6 flex items-center">
        <MoveLeft size={18} /><span className="ml-2">Back to Pages</span>
      </Link>
    </div>
  );
}
