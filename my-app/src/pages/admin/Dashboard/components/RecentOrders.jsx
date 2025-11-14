const orders = [
  { id: "ORD001", customer: "John Doe", total: "$250", status: "Paid" },
  { id: "ORD002", customer: "Jane Smith", total: "$120", status: "Pending" },
  { id: "ORD003", customer: "Mike Johnson", total: "$560", status: "Paid" },
  { id: "ORD004", customer: "Emily Brown", total: "$90", status: "Cancelled" },
];

const RecentOrders = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.total}</td>
              <td
                className={`p-2 font-medium ${
                  order.status === "Paid"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
