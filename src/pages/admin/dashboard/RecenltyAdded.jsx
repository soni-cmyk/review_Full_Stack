const RecentlyAdded = ({ products }) => {
  const recentlyAdded = [...products]?.sort((a, b) => b.date - a.date);

  return (
    <div className="bg-white rounded-lg shadow">
      <h3 className="p-4 font-semibold border-b border-gray-200">
        Recently Added
      </h3>
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b border-gray-200">
          <tr>
            <th className="p-3 text-left">PRODUCT NAME</th>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">ADDED DATE</th>
          </tr>
        </thead>
        <tbody>
          {recentlyAdded?.map((p) => (
            <tr
              key={p.sku}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3 text-left">{p.sku}</td>
              <td className="p-3 text-left">{p?.updatedAt.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyAdded;
