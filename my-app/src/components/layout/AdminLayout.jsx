import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  PartitionOutlined,
  BankOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, message, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "@services/common/AuthService";
import { useSelector } from "react-redux";
import { LuFileUser } from "react-icons/lu";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = useSelector((state) => state.user.user);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      localStorage.removeItem("user");
      messageApi.success("Đăng xuất thành công");
      setTimeout(() => navigate("/admin/auth/login"), 800);
    } else {
      messageApi.error("Đăng xuất thất bại");
    }
  };

  const sidebarItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Tổng quan",
    },
    {
      key: "/admin/users",
      icon: <TeamOutlined />,
      label: "Người dùng",
    },
    {
      key: "/admin/roles",
      icon: <SettingOutlined />,
      label: "Vai trò",
    },
    {
      key: "/admin/roles-permission",
      icon: <PartitionOutlined />,
      label: "Phân quyền",
    },
    {
      key: "/admin/companies",
      icon: <BankOutlined />,
      label: "Công ty",
    },
    {
      key: "/admin/jobs",
      icon: <CarryOutOutlined />,
      label: "Việc làm",
    },
    {
      key: "/admin/cvs",
      icon: <LuFileUser />,
      label: "Hồ sơ ứng viên",
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        collapsedWidth={80}
        style={{
          backgroundColor: "#F5F7F9",
          borderRight: "2px solid #eee",
        }}
      >
        <div
          className="demo-logo-vertical text-center py-2 text-lg font-bold flex items-center justify-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/company/my-jobs")}
        >
          {collapsed ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg w-[78%] justify-center">
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg w-[78%] justify-center">
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border object-cover"
              />
              <span className="text-gray-700 font-medium text-[15px]">
                {user?.fullName || user?.companyName || "Công ty"}
              </span>
            </div>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/admin/dashboard"]}
          items={sidebarItems}
          onClick={handleMenuClick}
          style={{
            fontSize: 15,
            backgroundColor: "#F5F7F9",
            borderRight: "none",
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 48,
              height: 48,
            }}
          />
        </Header>

        <Content
          style={{
            padding: 0,
            background: "#f5f5f5",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
