import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function TemplateViewer() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  async function fetchPage() {
    const response = await axios.get(`/templates/${slug}`);
    setPage(response.data);
  }

  useEffect(() => {
    fetchPage();
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{page?.title}</h1>
      <div
        className="text-gray-700 "
        dangerouslySetInnerHTML={{ __html: page?.content }}
      />
    </div>
  );
}
