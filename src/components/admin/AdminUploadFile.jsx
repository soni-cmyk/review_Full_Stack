import { Upload } from "lucide-react";
import React from "react";

export default function AdminUploadFile({ file, handleFileChange, preview }) {
  return (
    <>
      {preview && (
        <img
          src={preview}
          className="h-30 w-full object-contain rounded-lg border border-gray-300 mb-3"
          alt="preview"
        />
      )}
      <div className="flex items-center gap-4 mb-3 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 px-4 py-2">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          name="image"
        />
        <label
          htmlFor="imageUpload"
          className="cursor-pointer px-4 py-2 text-sm text-gray-500 font-medium w-full"
        >
          <div className="flex flex-col  items-center justify-center">
            <Upload className="mr-2" /> Upload Image
            {file && <span className="text-sm text-gray-600">{file.name}</span>}
          </div>
        </label>
      </div>
    </>
  );
}
