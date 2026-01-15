export default function AdminTable({
  columns,
  data,
  loading,
  emptyText = "No data found",
  renderRow,
}) {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 ">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}
