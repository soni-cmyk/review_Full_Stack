import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import axios, {BASE_URL} from "../../api/axios"
import Swal from "sweetalert2";

const PageEditor = () => {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState({});

  // auto-slug from title
  const handleTitleChange = (value) => {
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };

  // get editor html
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleSave = async () => {
    const payload = { title, slug, content };
    console.log("Saving page:", payload);
    if(!title){
      setError({title:"Title is required"})
      return
    }
    try {
      const response = await axios.post(`/templates`, payload);
      console.log("Page saved successfully:", response.data);
      Swal.fire({
        icon: "success",
        title: "Page Saved",
        text: "The page has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving page:", error);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "There was an error saving the page.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-4 p-6 ">
      <div className="mx-4 max-w-4xl  bg-white rounded-lg shadow-md p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Page</h1>
      
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">Page Title</label>
        <input
          className="w-full border border-gray-200 rounded-lg p-2 outline-none"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="About Us / Terms & Conditions / Privacy Policy"
        />
         {error.title && <span className="text-red-500 text-sm">{error.title}</span>}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-semibold mb-1">Slug</label>
        <input
          className="w-full border border-gray-200 rounded-lg p-2 outline-none bg-gray-50"
          value={slug}
          readOnly
        />
        <p className="text-xs text-gray-500 mt-1">
          Page URL will be: /template/{slug}
        </p>
      </div>

      {/* Editor */}
      <div>
        <label className="block text-sm font-semibold mb-1">Page Content</label>
        <div className="border border-gray-200 rounded-lg">
          <div ref={quillRef} />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        Save Page
      </button>
    </div></div>
  );
};

export default PageEditor;
