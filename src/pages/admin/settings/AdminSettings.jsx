import React, { useState, useEffect } from "react";
import axios, { BASE_URL } from "../../../api/axios";

const AdminSettings = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [activeLogo, setActiveLogo] = useState(null);

  // Load logos and select active
  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    const res = await axios.get("/logos");
    const active = res.data.find(l => l.isActive === true);
    setActiveLogo(active || null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!logoFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", logoFile);   // <-- MUST MATCH BACKEND

    await axios.post("/logos", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Logo uploaded");
    setLogoFile(null);
    setPreview("");
    loadLogo();
  };

  return (
    <div className="max-w-3xl mx-auto my-8  p-6 space-y-8 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold">Admin Settings – Logo</h3>

      {/* Active logo */}
      <div className="border border-gray-200 rounded-lg p-6 ">
        <h2 className="text-lg font-semibold mb-4">Current Active Logo</h2>

        {activeLogo ? (
          <img
            src={BASE_URL + activeLogo.logoUrl}
            alt="logo"
            className="h-20 object-contain mx-auto"
          />
        ) : (
          <p className="text-gray-500 text-center">No active logo set</p>
        )}
      </div>

      {/* Upload */}
      <div className="border border-gray-200 rounded-lg p-6  space-y-4">
        <h2 className="text-lg font-semibold">Upload New Logo</h2>

        {preview && (
          <img
            src={preview}
            className="h-20 object-contain mx-auto"
            alt="preview"
          />
        )}

        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2 w-full"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Save Logo
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
