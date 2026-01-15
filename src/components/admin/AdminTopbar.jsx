// components/admin/AdminTopbar.jsx
const AdminTopbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Categories & Subcategories</h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
          AD
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
