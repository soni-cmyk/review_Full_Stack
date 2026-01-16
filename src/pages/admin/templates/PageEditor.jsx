import react, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../../api/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import AdminTopbar from "../../../components/admin/AdminTopbar";

/* ===============================
   QUILL CONFIG
================================ */
const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
];

const PageEditor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({ title: "", content: "" });
  const { templateId } = useParams();

  /* ===============================
     AUTO SLUG FROM TITLE
  ================================ */
  const handleTitleChange = (value) => {
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
    setError({});
  };

  /* ===============================
     SAVE PAGE
  ================================ */
  const handleSave = async () => {
    if (!title) {
      setError({ title: "Title is required" });
      return;
    }

    if (!content || content === "<p><br></p>") {
      setError({ content: "Content is required" });
      return;
    }

    try {
      const payload = { title, slug, content };
      await axios.post("/templates", payload);

      Swal.fire({
        icon: "success",
        title: "Page Saved",
        text: "The page has been saved successfully.",
      }).then(() => {
        navigate("/admin/template");
      });

      setTitle("");
      setSlug("");
      setContent("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  // Edit mode: fetch existing template data
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/templates/${templateId}`);
        const { title, slug, content } = res.data;
        setTitle(title);
        setSlug(slug);
        setContent(content);
      } catch (err) {
        console.error("Failed to fetch template data", err);
      }
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  const handleEditSave = async () => {
    if (!title) {
      setError({ title: "Title is required" });
      return;
    }
    if (!content || content === "<p><br></p>") {
      setError({ content: "Content is required" });
      return;
    }

    try {
      const payload = { title, slug, content };
      await axios.put(`/templates/${templateId}`, payload);

      Swal.fire({
        icon: "success",
        title: "Page Updated",
        text: "The page has been updated successfully.",
      }).then(() => {
        navigate("/admin/template");
      });

      setTitle("");
      setSlug("");
      setContent("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div>
      <AdminTopbar title={"Create New Page"} />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h1 className="text-2xl font-bold">Create New Page</h1>
          <div className="flex gap-2 mb-4">
            {/* TITLE */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Page Title
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg p-2"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="About Us / Terms & Conditions / Privacy Policy"
              />
              {error.title && (
                <p className="text-red-500 text-sm mt-1">{error.title}</p>
              )}
            </div>
            {/* SLUG */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Slug</label>
              <input
                className="w-full border border-gray-200 rounded-lg p-2 bg-gray-100"
                value={slug}
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Page URL: /template/{slug}
              </p>
            </div>
          </div>

          {/* EDITOR */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Page Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="bg-white"
              placeholder="Write your page content here..."
            />
            {error.content && (
              <p className="text-red-500 text-sm mt-1">{error.content}</p>
            )}
          </div>

          {/* SAVE BUTTON */}
          <div className="text-right">
            <button
              onClick={() => navigate("/admin/template")}
              className="px-4 py-2 rounded-md mr-2 border border-gray-300 bg-red-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
