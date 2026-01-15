const RecentlyAdded = () => {
  const products = [
    {
      name: "Bluetooth Speaker Mini",
      sku: "BSM-506",
      category: "Electronics",
      date: "Jan 14, 2026",
    },
    {
      name: "Yoga Mat Premium",
      sku: "YMP-607",
      category: "Fitness",
      date: "Jan 13, 2026",
    },
    {
      name: "Stainless Water Bottle",
      sku: "SWB-708",
      category: "Accessories",
      date: "Jan 12, 2026",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <h3 className="p-4 font-semibold border-b border-gray-200">Recently Added</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b border-gray-200">
          <tr>
            <th className="p-4 text-left">PRODUCT NAME</th>
            <th>SKU</th>
            <th>CATEGORY</th>
            <th>ADDED DATE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.sku} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 font-medium">{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {p.date}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyAdded;