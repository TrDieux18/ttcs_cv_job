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
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button, message, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "@services/common/AuthService";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const user = useSelector((state) => state.user.user);
  // console.log("user in layout:", user);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 👉 Menu bên trái
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
  ];

  const profileMenu = {
    items: [
      {
        key: "profile",
        label: "Hồ sơ cá nhân",
        icon: <UserOutlined />,
      },
      { type: "divider" },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
        danger: true,
      },
    ],
    onClick: async ({ key }) => {
      if (key === "logout") {
        const response = await logout();
        if (response.success) {
          localStorage.removeItem("user");
          messageApi.success("Đăng xuất thành công");
          setTimeout(() => navigate("/admin/auth/login"), 800);
        } else {
          messageApi.error("Đăng xuất thất bại");
        }
      } else if (key === "profile") {
        navigate("/admin/profile");
      }
    },
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical text-white text-center py-4 text-lg font-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/dashboard")}
        >
          {collapsed ? "A" : "Admin Panel"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin/dashboard"]}
          items={sidebarItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
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
          <Dropdown
            menu={profileMenu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-gray-700 font-medium">Admin</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />
              <DownOutlined className="text-gray-500 text-xs" />
            </div>
          </Dropdown>
        </Header>

        {/* Nội dung */}
        <Content
          style={{
            margin: "16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
