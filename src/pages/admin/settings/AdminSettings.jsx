import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import Swal from "sweetalert2";
import { AdminTopBar } from "../../../components/admin/AdminTopbar";
import AdminMainHeader from "../../../components/admin/AdminMainHeader";
import AdminUploadFile from "../../../components/admin/AdminUploadFile";
import { useNavigate } from "react-router-dom";
import AddCancelButton from "../../../components/admin/buttons/AddCancelButton";

const AdminSettings = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [activeLogo, setActiveLogo] = useState(null);

  const [logoWidth, setLogoWidth] = useState("");
  const [logoHeight, setLogoHeight] = useState("");
  const navigate = useNavigate();

  // Load logos and select active
  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    const res = await axios.get("/logos");
    const active = res.data.find((l) => l.isActive === true);
    setActiveLogo(active || null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!logoFile) return Swal.fire("Error", "Logo is required", "error");
    const formData = new FormData();
    formData.append("image", logoFile); // must match backend
    formData.append("logoWidth", logoWidth);
    formData.append("logoHeight", logoHeight);
    await axios.post("/logos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire("Success", "Logo uploaded successfully", "success");
    setLogoFile(null);
    setPreview("");
    setLogoWidth("");
    setLogoHeight("");
    loadLogo();
  };

  const handleCancel = () => {
    setLogoFile(null);
    setPreview("");
    setLogoWidth("");
    setLogoHeight("");
    navigate("/admin/dashboard")
  }
  return (
    <div>
      <AdminTopBar title="Admin Settings" />
      <div className="flex justify-between items-center p-6">
        <AdminMainHeader title="Manage your admin settings with ease" />
      </div>
      <div className="mx-6 mb-6 p-6 bg-white space-y-3 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Current Active Logo</h2>
        {/* Active logo */}
        <div className="border border-gray-200 rounded-lg p-6">
          {activeLogo ? (
            <img
              src={activeLogo.logoUrl}
              alt="logo"
              style={{
                width: activeLogo.logoWidth || "auto",
                height: activeLogo.logoHeight || "auto",
              }}
              className="object-contain max-h-20"
            />
          ) : (
            <p className="text-gray-500 text-center">No active logo set</p>
          )}
        </div>

        {/* Upload */}
        <div className="border border-gray-200 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-semibold mb-2">Upload New Logo</h2>
          <AdminUploadFile
            file={logoFile}
            handleFileChange={handleFileChange}
            preview={preview}
          />

          {/* Width & Height */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Max Logo Width (px)"
              value={logoWidth}
              onChange={(e) => setLogoWidth(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <input
              type="number"
              placeholder="Max Logo Height (px)"
              value={logoHeight}
              onChange={(e) => setLogoHeight(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <AddCancelButton
            onClose={handleCancel}
            cancelBtnText="Cancel"
            saveBtnText={"Save"}
            onSubmit={handleUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
