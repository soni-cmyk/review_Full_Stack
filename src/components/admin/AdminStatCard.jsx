const AdminStatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100 text-blue-600">
        {icon}
      </div>
    </div>
  );
};

export default AdminStatCard;