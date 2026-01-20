import React from "react";

export default function AddCancelButton({
  onClose,
  loading = false,
  cancelBtnText = "Cancel",
  saveBtnText = "Save",
  onSubmit,
}) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      >
        {cancelBtnText}
      </button>

      <button
        type="submit"
        disabled={loading}
        onClick={onSubmit}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : saveBtnText}
      </button>
    </div>
  );
}
