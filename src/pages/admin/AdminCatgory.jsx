// pages/admin/Categories.jsx
const categories = [
  { name: "Electronics", count: 5 },
  { name: "Clothing", count: 8 },
  { name: "Home & Garden", count: 6 },
  { name: "Sports", count: 4 },
  { name: "Fun & Enjoy", count: 0 },
];

const Categories = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h2 className="font-semibold">Categories & Subcategories</h2>
          <p className="text-sm text-gray-500">
            Organize your products with categories
          </p>
        </div>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-md">
            + New Category
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            + New Subcategory
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-4 pt-4">
        <button className="border rounded-md px-3 py-1 bg-white">
          Categories
        </button>
        <button className="border rounded-md px-3 py-1 text-gray-500">
          Subcategories
        </button>
      </div>

      {/* Table */}
      <table className="w-full mt-4">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th className="p-4">CATEGORY NAME</th>
            <th>SUBCATEGORIES</th>
            <th className="text-right pr-6">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.name} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{cat.name}</td>
              <td>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {cat.count}
                </span>
              </td>
              <td className="text-right pr-6 space-x-3">
                ✏️ 🗑️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
