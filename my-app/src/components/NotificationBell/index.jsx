import { useState, useEffect } from "react";
import { Badge, Dropdown, Button, List, Empty, Spin, Tag } from "antd";
import { BellOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@services/client/NotificationService";
import { initSocket } from "@helpers/socket";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      const socket = initSocket(user._id);

      socket.on("notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      fetchUnreadCount();
      fetchNotifications();

      return () => {
        socket.off("notification");
      };
    }
  }, [user?._id]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications({ limit: 10 });
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      if (response.success) {
        setUnreadCount(response.count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await handleMarkAsRead(notification._id);
    }
    setOpen(false);

    if (notification.job?._id) {
      navigate(`/jobs/${notification.job._id}`);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      application_status: "📋",
      job_posted: "💼",
      application_received: "📨",
      other: "🔔",
    };
    return icons[type] || icons.other;
  };

  const dropdownContent = (
    <div
      style={{
        width: 420,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#fafafa",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: "#262626",
          }}
        >
          Thông báo
        </h3>
      </div>

      <div style={{ maxHeight: 380, overflowY: "auto" }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : notifications.length === 0 ? (
          <div
            style={{
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                margin: "0 auto 20px",
                background: "#f5f5f5",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  transform: "rotate(-15deg)",
                }}
              >
                📋
              </div>
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#262626",
                marginBottom: 8,
              }}
            >
              Tìm việc thụ động
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#8c8c8c",
                marginBottom: 24,
                lineHeight: "22px",
              }}
            >
              Nhận lời mời công việc trên ITviec khi chỉ cần
              <br />
              tải CV lên
            </p>
            <Button
              type="primary"
              danger
              size="large"
              style={{
                borderRadius: 4,
                fontWeight: 500,
                height: 40,
                paddingLeft: 24,
                paddingRight: 24,
              }}
              onClick={() => {
                setOpen(false);
                navigate("/templates");
              }}
            >
              Tìm hiểu thêm
            </Button>
          </div>
        ) : (
          <>
            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    backgroundColor: item.read ? "white" : "#f6f9ff",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fafafa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = item.read
                      ? "white"
                      : "#f6f9ff";
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          backgroundColor: "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                        }}
                      >
                        {getTypeIcon(item.type)}
                      </div>
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 8,
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: item.read ? 500 : 700,
                            fontSize: 15,
                            color: "#262626",
                            lineHeight: "22px",
                          }}
                        >
                          {item.title}
                        </span>
                        {!item.read && (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#ff4d4f",
                              flexShrink: 0,
                              marginTop: 7,
                            }}
                          />
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#595959",
                            lineHeight: "20px",
                            marginBottom: 8,
                          }}
                        >
                          {item.message}
                        </div>
                        {item.job?.title && (
                          <div
                            style={{
                              fontSize: 13,
                              color: "#1890ff",
                              marginBottom: 6,
                              fontWeight: 500,
                            }}
                          >
                            💼 {item.job.title}
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: 13,
                            color: "#8c8c8c",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <ClockCircleOutlined style={{ fontSize: 12 }} />
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            {unreadCount > 0 && (
              <div
                style={{
                  padding: "12px 20px",
                  borderTop: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                }}
              >
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAllAsRead();
                  }}
                  style={{
                    padding: 0,
                    height: "auto",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Đánh dấu tất cả đã đọc
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {notifications.length > 0 && (
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #f0f0f0",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Button
            type="link"
            onClick={() => {
              setOpen(false);
              navigate("/dashboard/notifications");
            }}
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#1890ff",
            }}
          >
            Xem tất cả thông báo
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-[#69C3B3] rounded-full relative">
        <Dropdown
          dropdownRender={() => dropdownContent}
          trigger={["hover"]}
          open={open}
          onOpenChange={setOpen}
          placement="bottomRight"
        >
          <Badge
            count={unreadCount}
            offset={[-4, 4]}
            size="small"
            style={{
              backgroundColor: "#ff4d4f",
              boxShadow: "0 0 0 2px #fff",
              position: "absolute",
              top: 2,
              right: 3,
            }}
          >
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: 22 }} />}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: "50%",
                transition: "all 0.3s ease",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            />
          </Badge>
        </Dropdown>
      </div>
    </>
  );
};

export default NotificationBell;
