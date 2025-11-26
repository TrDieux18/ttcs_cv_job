import { useState, useEffect } from "react";
import { Tabs, Table, Tag, Typography, Button, message, Space } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "@services/client/NotificationService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Notification = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCounts, setTotalCounts] = useState({
    all: 0,
    unseen: 0,
    seen: 0,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [activeTab, pagination.current]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
      };

      if (activeTab === "unseen") {
        params.unreadOnly = "true";
      }

      const response = await getNotifications(params);
      if (response.success) {
        let data = response.data;
        const allData = response.data;

        if (activeTab === "seen") {
          data = data.filter((n) => n.read);
        } else if (activeTab === "unseen") {
          data = data.filter((n) => !n.read);
        }

        setNotifications(data);

        // Cập nhật số lượng cho tất cả các tabs
        setTotalCounts({
          all: allData.length,
          unseen: allData.filter((n) => !n.read).length,
          seen: allData.filter((n) => n.read).length,
        });

        setPagination({
          ...pagination,
          total: response.pagination.total,
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      message.error("Không thể tải thông báo");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      message.success("Đã đánh dấu là đã đọc");
      fetchNotifications();
    } catch (error) {
      console.error("Error marking as read:", error);
      message.error("Không thể đánh dấu đã đọc");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      message.success("Đã đánh dấu tất cả là đã đọc");
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
      message.error("Không thể đánh dấu tất cả");
    }
  };

  const handleNotificationClick = async (record) => {
    if (!record.read) {
      await handleMarkAsRead(record._id);
    }

    if (record.job?._id) {
      navigate(`/jobs/${record.job._id}`);
    }
  };

  const allNotifications = notifications;
  const unseenNotifications = notifications.filter((n) => !n.read);
  const seenNotifications = notifications.filter((n) => n.read);

  const tabs = [
    {
      key: "all",
      label: (
        <span className="flex items-center gap-2">
          <span className="font-semibold text-base">Tất cả</span>
          <Tag color="blue">{totalCounts.all}</Tag>
        </span>
      ),
    },
    {
      key: "unseen",
      label: (
        <span className="flex items-center gap-2">
          <span className="font-semibold text-base">Chưa đọc</span>
          <Tag color="red">{totalCounts.unseen}</Tag>
        </span>
      ),
    },
    {
      key: "seen",
      label: (
        <span className="flex items-center gap-2">
          <span className="font-semibold text-base">Đã đọc</span>
          <Tag color="green">{totalCounts.seen}</Tag>
        </span>
      ),
    },
  ];

  const getTypeIcon = (type) => {
    const icons = {
      application_status: "📋",
      job_posted: "💼",
      application_received: "📨",
      other: "🔔",
    };
    return icons[type] || icons.other;
  };

  const columns = [
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 60,
      render: (type) => (
        <span style={{ fontSize: 24 }}>{getTypeIcon(type)}</span>
      ),
    },
    {
      title: "Thông báo",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <Text
            strong={!record.read}
            style={{
              fontSize: 15,
              color: record.read ? "#595959" : "#262626",
            }}
          >
            {text}
          </Text>
          <div
            style={{
              fontSize: 13,
              color: "#8c8c8c",
              marginTop: 4,
            }}
          >
            {record.message}
          </div>
          {record.job?.title && (
            <Tag
              color="blue"
              style={{
                marginTop: 6,
                fontSize: 12,
              }}
            >
              💼 {record.job.title}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "read",
      key: "read",
      width: 120,
      render: (read) =>
        read ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã đọc
          </Tag>
        ) : (
          <Tag icon={<ClockCircleOutlined />} color="error">
            Chưa đọc
          </Tag>
        ),
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {formatDistanceToNow(new Date(date), {
            addSuffix: true,
            locale: vi,
          })}
        </Text>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-white px-6 pt-6 shadow-sm rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Thông báo của tôi</h2>
          {unseenNotifications.length > 0 && (
            <Button
              type="primary"
              onClick={handleMarkAllAsRead}
              icon={<CheckCircleOutlined />}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            setPagination({ ...pagination, current: 1 });
          }}
          items={tabs}
          className="custom-tabs"
          size="large"
        />
      </div>

      <div className="mt-5 bg-white shadow-sm rounded-lg p-6">
        <Table
          dataSource={
            activeTab === "all"
              ? allNotifications
              : activeTab === "unseen"
              ? unseenNotifications
              : seenNotifications
          }
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page) => {
              setPagination({ ...pagination, current: page });
            },
            showSizeChanger: false,
            showTotal: (total) => `Tổng ${total} thông báo`,
          }}
          locale={{ emptyText: "Bạn chưa có thông báo nào" }}
          onRow={(record) => ({
            onClick: () => handleNotificationClick(record),
            style: {
              cursor: "pointer",
              backgroundColor: record.read ? "white" : "#f6f9ff",
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = record.read
                ? "#fafafa"
                : "#eef4ff";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = record.read
                ? "white"
                : "#f6f9ff";
            },
          })}
        />
      </div>
    </div>
  );
};

export default Notification;
