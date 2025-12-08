import { Tag } from "antd";

const RecentOrders = ({ activities = [] }) => {
  // Fallback data if no activities provided
  const defaultActivities = [
    {
      id: 1,
      type: "job",
      title: "Chưa có hoạt động",
      company: "Hệ thống",
      time: "Vừa xong",
      status: "active",
    },
  ];

  const displayActivities =
    activities.length > 0 ? activities : defaultActivities;

  const getStatusTag = (status) => {
    const statusMap = {
      active: { color: "green", text: "Hoạt động" },
      pending: { color: "orange", text: "Chờ duyệt" },
      completed: { color: "blue", text: "Hoàn thành" },
    };
    const config = statusMap[status] || { color: "default", text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getTypeIcon = (type) => {
    const icons = {
      job: "📋",
      application: "✉️",
      cv: "📄",
      user: "👤",
      company: "🏢",
    };
    return icons[type] || "📌";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Hoạt động gần đây
      </h2>
      <div className="space-y-3">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getTypeIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activity.company}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  {getStatusTag(activity.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
