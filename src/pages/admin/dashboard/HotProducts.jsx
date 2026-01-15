const HotProducts = () => {
  const products = [
    {
      name: "Wireless Headphones Pro",
      sku: "WHP-001",
      category: "Electronics",
      rating: 4.8,
    },
    {
      name: "Organic Coffee Blend",
      sku: "OCB-102",
      category: "Food & Beverage",
      rating: 4.9,
    },
    {
      name: "Smart Fitness Watch",
      sku: "SFW-203",
      category: "Wearables",
      rating: 4.7,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <h3 className="p-4 font-semibold border-b border-gray-200">Hot Products</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b border-gray-200">
          <tr>
            <th className="p-4 text-left">PRODUCT NAME</th>
            <th>SKU</th>
            <th>CATEGORY</th>
            <th>RATING</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.sku} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 font-medium">{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td className="flex items-center gap-1">
                ⭐ {p.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotProducts;