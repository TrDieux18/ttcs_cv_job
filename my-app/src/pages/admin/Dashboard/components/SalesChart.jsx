import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SalesChart = ({ data = [] }) => {
  const defaultData = [
    { month: "T1", jobs: 0, applications: 0, cvs: 0 },
    { month: "T2", jobs: 0, applications: 0, cvs: 0 },
    { month: "T3", jobs: 0, applications: 0, cvs: 0 },
    { month: "T4", jobs: 0, applications: 0, cvs: 0 },
    { month: "T5", jobs: 0, applications: 0, cvs: 0 },
    { month: "T6", jobs: 0, applications: 0, cvs: 0 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Thống kê hoạt động 6 tháng gần đây
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="jobs"
            name="Tin tuyển dụng"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6" }}
          />
          <Line
            type="monotone"
            dataKey="applications"
            name="Ứng tuyển"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981" }}
          />
          <Line
            type="monotone"
            dataKey="cvs"
            name="CV mới"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: "#f59e0b" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
